import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext"; 

export function NewCycleForm () {

  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            disabled={!!activeCycle}
            type="text"
            placeholder="Dê um nome para o seu projeto"
            id="task"
            list="task-suggestion"
            {...register('task')}
          />
          <datalist id="task-suggestion">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesInput
            disabled={!!activeCycle}
            type="number"
            placeholder="00"
            id="minutesAmount"
            step={5}
            min={5}
            // max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
    )
}