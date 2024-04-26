import { ActionTypes } from "./actions"
import { produce } from "immer"

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[],
  activeCycleId: string | null
}

export function CyclesReducer(state: CyclesState, action: any) {
    switch(action.type) {
        case ActionTypes.ADD_NEW_CYCLE: 
         return produce(state, (draft) => {
            draft.cycles.push(action.payload.newCycle),
            draft.activeCycleId = action.payload.newCycle.id
          })
          
        case ActionTypes.INTERRUPT_CYCLE: {

          const currentIndex = state.cycles.findIndex((cycle) => {
             return cycle.id === state.activeCycleId
          })

          if(currentIndex < 0) {
            return state
          }

          return produce(state, (draft) => {
            draft.activeCycleId = null
            draft.cycles[currentIndex].interruptDate = new Date()
          })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
          const currentIndex = state.cycles.findIndex((cycle) => {
            return cycle.id === state.activeCycleId
         })

         if(currentIndex < 0) {
           return state
         }

         return produce(state, (draft) => {
           draft.activeCycleId = null
           draft.cycles[currentIndex].finishedDate = new Date()
         })
        }
          default:
            return state
        }
}