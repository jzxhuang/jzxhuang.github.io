import type { DomainT, ParametersT, ParticleT, SwarmT, Tuple } from "./types"

const defaultParameters: ParametersT = {
  inertiaWeight: 0.45,
  personalCoefficient: 0.35,
  socialCoefficient: 0.5,
  pressure: 0.5,
} as const

/**
 * Creates a new particle. The initial state of the particle can be passed, otherwise, all fields are
 * generated randomly.
 */
export function createParticle<Dimension extends number>(
  domain: DomainT<Dimension>,
  initialParticle?: Partial<ParticleT<Dimension>>
): ParticleT<Dimension> {
  // const foo: Tuple<number, Dimension> = domain.map(([lower]) => lower)

  // Type-casting required because TypeScript is not smart enough.
  const initialPosition =
    initialParticle?.position ||
    (domain.map(([lower, upper]) => Math.random() * (upper - lower) + lower) as Tuple<number, Dimension>)
  const initialVelocity =
    initialParticle?.velocity ||
    (domain.map(() => {
      const sign = Math.random() > 0.5 ? 1 : -1
      return Math.random() * sign
    }) as Tuple<number, Dimension>)

  // (domain.map(([lower, upper]) => Math.random() * (upper - lower) * INITIAL_VELOCITY_FACTOR) as Tuple<
  //   number,
  //   Dimension
  // >)

  return {
    position: initialPosition,
    velocity: initialVelocity,
    fitness: initialParticle?.fitness || Infinity,
    bestPosition: initialParticle?.bestPosition || initialPosition,
    bestFitness: initialParticle?.bestFitness || Infinity,
    /** Allows overriding parameters on a per-particle basis */
    parameters: initialParticle?.parameters || defaultParameters,
  }
}

/**
 * Gets the new position of a particle, using its velocity. Clamps it to the problem space defined by the domain
 */
function updatePosition<Dimension extends number>(particle: ParticleT<Dimension>): Tuple<number, Dimension> {
  return particle.position.map((value, idx) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newVal = value + particle.velocity[idx]!
    return newVal
  }) as Tuple<number, Dimension>
}

type UpdateVelocityArgs = {
  recentUpdate?: boolean
}

/** Calculates the new velocity of a particle */
function updateVelocity<Dimension extends number>(
  particle: ParticleT<Dimension>,
  globalBestPosition: Tuple<number, Dimension>,
  domain: DomainT<Dimension>,
  args?: UpdateVelocityArgs
): Tuple<number, Dimension> {
  const { inertiaWeight, personalCoefficient, socialCoefficient } = particle.parameters

  const [randVelocityThreshold, randVelocityFactor] = args?.recentUpdate ? [0.4, 20] : [0.7, 5]
  if (Math.random() > randVelocityThreshold) {
    // Generate a random velocity
    return domain.map(() => {
      const sign = Math.random() > 0.5 ? 1 : -1
      return Math.random() * sign * randVelocityFactor
    }) as Tuple<number, Dimension>
  }

  const newVelocity = particle.position.map((value, idx) => {
    // Use the same random value for both personal and social parts
    const rand = Math.random()

    // Assert each of the following array accesses as defined, TS is not smart enough to understand the Tuple type
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const inertia = particle.velocity[idx]! * inertiaWeight
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const personalPart = (particle.bestPosition[idx]! - value) * rand * personalCoefficient
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const socialPart = (globalBestPosition[idx]! - value) * rand * socialCoefficient

    return inertia + personalPart + socialPart
  })

  // Necessary type cast
  return newVelocity as Tuple<number, Dimension>
}

type CreateSwarmArgs<Dimension extends number> = Pick<SwarmT<Dimension>, "domain" | "objectiveFunction"> &
  Partial<SwarmT<Dimension>>

/**
 * Initializes a swarm
 * @param numParticles The number of particles in the swarm
 */
export function initializeSwarm<Dimension extends number>(
  numParticles: number,
  args: CreateSwarmArgs<Dimension>
): SwarmT<Dimension> {
  const { domain, objectiveFunction } = args

  // Type-casting required because TypeScript is not smart enough.
  const initialBestPosition =
    args.bestPosition ||
    (domain.map(([lower, upper]) => Math.random() * (upper - lower) + lower) as Tuple<number, Dimension>)

  const particles = args.particles || new Array(numParticles).fill(undefined).map(() => createParticle(domain, {}))

  return {
    bestFitness: args.bestFitness || Infinity,
    bestPosition: initialBestPosition,
    domain,
    objectiveFunction,
    parameters: args.parameters || defaultParameters,
    particles: particles as unknown as ParticleT<Dimension>[],
  }
}

/**
 * Runs a single iteration of the PSO algorithm on the swarm.
 *
 * The global best is only updated at the end of the cycle.
 */
export function updateSwarm<Dimension extends number>(
  swarm: SwarmT<Dimension>,
  args?: UpdateVelocityArgs
): SwarmT<Dimension> {
  const { bestFitness, bestPosition, domain, objectiveFunction } = swarm

  const newParticles = swarm.particles.map((particle) => {
    const newParticle = { ...particle }
    newParticle.position = updatePosition(particle)
    newParticle.fitness = objectiveFunction(newParticle.position)
    newParticle.velocity = updateVelocity(particle, bestPosition, domain, args)

    if (newParticle.fitness < particle.fitness) {
      newParticle.bestFitness = newParticle.fitness
      newParticle.bestPosition = newParticle.position
    }

    return newParticle
  })

  const newBests = newParticles.reduce(
    (prev, currParticle) => {
      if (currParticle.fitness < prev.bestFitness) {
        return { bestFitness: currParticle.fitness, bestPosition: currParticle.position }
      }
      return prev
    },
    { bestFitness, bestPosition }
  )

  return { ...swarm, bestFitness: newBests.bestFitness, bestPosition: newBests.bestPosition, particles: newParticles }
}
