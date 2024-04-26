import { ReactNode, createContext, useEffect, useReducer, useState } from "react"
import {Cycle, CyclesReducer } from "../reducers/cycles/reducer"
import {AddNewCycleAction, InterruptCycleAction, MarkCurrentCycleAsFinishedAction } from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns"

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    amountSecondsPassed: number
    markCycleAsFinished : () => void
    cycles: Cycle[]
    secondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCycle: () => void
}

interface CyclesContextProviderProps {
    children: ReactNode
}
  
export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({children} : CyclesContextProviderProps) {
    const [cycleState, dispatch] = useReducer(CyclesReducer,
      {
        cycles: [],
        activeCycleId: null
      },
      (initialState) => {
        const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if(storageStateAsJSON) {
          return JSON.parse(storageStateAsJSON)
        }

        return initialState
      }
  )

  const {cycles, activeCycleId} = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', JSON.stringify(cycleState))
  }, [cycleState])

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if(activeCycle) {
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      }

      return 0
    })
    
    
      function secondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
      }
      
      function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
        const newCycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date()
        }

        dispatch(AddNewCycleAction(newCycle))
    
        setAmountSecondsPassed(0)
      }
    
      function interruptCycle() {
        dispatch(InterruptCycleAction())
      }

      function markCycleAsFinished() {
        dispatch(MarkCurrentCycleAsFinishedAction())
      }

    return (
        <CyclesContext.Provider value={{
            createNewCycle, 
            interruptCycle, 
            secondsPassed, 
            markCycleAsFinished, 
            activeCycle, 
            amountSecondsPassed,
            cycles}}>
                {children}
        </CyclesContext.Provider>
    )
}