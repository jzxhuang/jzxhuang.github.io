import clsx from "clsx"
import { memo } from "react"

import type { SwarmT } from "../../libs/pso/types"

export const Particles = memo(function Particles({ swarm, isVisible }: { swarm: SwarmT<2>; isVisible: boolean }) {
  return (
    <>
      {swarm.particles.map((particle, idx) => (
        <Particle key={idx} isVisible={isVisible} x={particle.position[0]} y={particle.position[1]} />
      ))}
    </>
  )
})

export const Particle = memo(function Particle({ x, y, isVisible }: { x: number; y: number; isVisible: boolean }) {
  return (
    <div
      className={clsx(
        "fixed transition-opacity bg-slate-800 dark:bg-dracula-pink-200 pointer-events-none",
        isVisible ? "opacity-100 dark:opacity-50 " : "opacity-0"
      )}
      style={{ width: 1.5, height: 1.5, left: x, top: y }}
    ></div>
  )
})

export const ParticleLarge = memo(function Particle({ x, y }: { x: number; y: number }) {
  return (
    <div className="fixed bg-blue-600 w-3 h-3" style={{ left: x, top: y }}>
      {x}, {y}
    </div>
  )
})
