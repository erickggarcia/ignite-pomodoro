import { FormContainer, MinutsAmountMinute, TaskInput } from "./styles"
import { useFormContext } from 'react-hook-form'
import { useContext } from "react"
import { CyclesContext } from "../../../../contexts/CyclesContext"

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()
    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                disabled={!!activeCycle}
                list="task-suggestions"
                placeholder="Dê um nome para o seu projeto"
                type="text"
                id="task"
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1" />
                <option value="Projeto 2" />
                <option value="Projeto 3" />
                <option value="Bananinha" />
            </datalist>

            <label htmlFor="minutesAmount">Durante</label>
            <MinutsAmountMinute
                disabled={!!activeCycle}
                placeholder='00'
                type="number"
                id="minutesAmount"
                step={5}
                min={1}
                max={60}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}

