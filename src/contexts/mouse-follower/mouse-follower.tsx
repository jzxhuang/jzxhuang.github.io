import isMobileUA from "is-mobile"
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useRafLoop } from "react-use"

import { Particles } from "../../components/particles/particles"
import { initializeSwarm, updateSwarm } from "../../libs/pso/pso"
import type { DomainT, SwarmT } from "../../libs/pso/types"
import { createContextStub } from "../context-stub"

const NUM_PARTICLES = 750
const LAST_UPDATE_THRESHOLD_MS = 100

type Position = { x: number; y: number }

interface IMouseFollowerContext<Dimension extends number> {
  swarm: SwarmT<Dimension> | null
  setSwarm: React.Dispatch<React.SetStateAction<SwarmT<Dimension> | null>>
}

const initialState: IMouseFollowerContext<2> = {
  swarm: null,
  setSwarm: createContextStub("MouseFollowerProvider"),
}

const MouseFollowerContext = createContext(initialState)

export const MouseFollowerProvider = ({ children }: { children?: React.ReactNode }) => {
  const mousePosRef = useRef<Position | null>(null)

  const setLastUpdateTimeRef = useRef<number | null>(null)
  const [swarm, setSwarm] = useState<SwarmT<2> | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hideOnMobile, setHideOnMobile] = useState(false)

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const domain: DomainT<2> = [
      [0, width],
      [0, height],
    ]
    const newSwarm = initializeSwarm<2>(NUM_PARTICLES, {
      domain,
      objectiveFunction: ([x, y]) => {
        return Math.hypot(x - 0, y - 0)
      },
    })
    setSwarm(newSwarm)

    const update = ({ x, y }: Position) => {
      mousePosRef.current = { x, y }
      setLastUpdateTimeRef.current = Date.now()
      setIsInitialized(true)

      setSwarm((prev) => {
        if (!prev) return null

        setHideOnMobile(false)
        return {
          ...prev,
          bestFitness: Math.hypot(prev.bestPosition[0] - x, prev.bestPosition[1] - y),
          objectiveFunction: ([xPos, yPos]) => Math.hypot(xPos - x, yPos - y),
        }
      })
    }

    const mouseMoveHandler = (event: MouseEvent) => {
      update({ x: event.pageX, y: event.pageY })
    }

    const touchHandler = (event: TouchEvent) => {
      if (event.touches[0]) {
        update({ x: event.touches[0].clientX, y: event.touches[0].clientY })
      }
    }

    if (isMobileUA()) {
      setIsMobile(true)
      document.addEventListener("touchmove", touchHandler)
      document.addEventListener("touchstart", touchHandler)
      return () => {
        document.removeEventListener("touchmove", touchHandler)
        document.removeEventListener("touchstart", touchHandler)
      }
    }

    document.addEventListener("mousemove", mouseMoveHandler)
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler)
    }
  }, [])

  useRafLoop(() => {
    if (!mousePosRef.current) return

    setSwarm((prev) => {
      if (!prev) return null
      const currTime = Date.now()
      if (setLastUpdateTimeRef.current) {
        if (currTime - setLastUpdateTimeRef.current > 1000) {
          setHideOnMobile(true)
        }
      }

      const nextSwarm = updateSwarm(prev, {
        recentUpdate: setLastUpdateTimeRef.current
          ? currTime - setLastUpdateTimeRef.current < LAST_UPDATE_THRESHOLD_MS
          : false,
      })
      return nextSwarm
    })
  })

  const isVisible = useMemo(() => {
    if (!isInitialized) return false
    return isMobile ? !hideOnMobile : true
  }, [hideOnMobile, isInitialized, isMobile])

  return (
    <MouseFollowerContext.Provider value={{ swarm, setSwarm }}>
      {swarm && <Particles isVisible={isVisible} swarm={swarm} />}
      {children}
    </MouseFollowerContext.Provider>
  )
}

export const useMouseFollower = () => useContext(MouseFollowerContext)
