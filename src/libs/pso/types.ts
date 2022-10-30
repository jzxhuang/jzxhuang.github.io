/**
 * Tuple of length N (n-ary). Only supports tuples where all entries in the tuple are be the same type `T`
 * https://stackoverflow.com/questions/52489261/typescript-can-i-define-an-n-length-tuple-type
 */
export type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>

export type ParametersT = {
  /** Multiplied every frame with the previous velocity. A number between 0 to 1 */
  inertiaWeight: number
  /** The influence of the particle's local best solution. A number between 0 and 1 */
  personalCoefficient: number
  /** The influence of the global best solution. A number between 0 and 1 */
  socialCoefficient: number
  /**
   * Bias in selecting the best performing particle in the swarm. A number between 0 and 1.
   * 0 meaning that the best is chosen randomly and 1 that the actual best is computed at every iteration
   */
  pressure: number
}

/**
 * The domain of the problem space. Represented as an array of 2-tuples.
 * Each 2-tuple is an interval, where the first value is the lower bound and the second value is the upper bound
 */
export type DomainT<Dimension extends number> = Tuple<Tuple<number, 2>, Dimension>

/**
 * A single particle in the swarm
 */
export type ParticleT<Dimension extends number> = {
  position: Tuple<number, Dimension>
  velocity: Tuple<number, Dimension>
  /** Lower is better */
  fitness: number
  bestPosition: Tuple<number, Dimension>
  bestFitness: number
  /** Allows overriding parameters on a per-particle basis */
  parameters: ParametersT
}

export type ObjectiveFunctionT<Dimension extends number> = (pos: Tuple<number, Dimension>) => number

export type SwarmT<Dimension extends number> = {
  bestPosition: Tuple<number, Dimension>
  bestFitness: number
  domain: DomainT<Dimension>
  parameters: ParametersT
  particles: ParticleT<Dimension>[]
  /** Calculates the fitness of a solution. Lower is better */
  objectiveFunction: ObjectiveFunctionT<Dimension>
}
