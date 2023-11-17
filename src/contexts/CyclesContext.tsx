import { ReactNode, createContext, useState } from "react"

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minuteAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedData: new Date() }
                } else {
                    return cycle
                }
            })
        )
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minuteAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        markCurrentCycleAsFinished()
        setActiveCycleId(null)
    }

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
                cycles
            }}>
            {children}
        </CyclesContext.Provider>
    )
}
