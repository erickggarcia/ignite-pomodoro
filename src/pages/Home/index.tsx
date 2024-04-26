import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style'

import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/Countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Home() {
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Digite um nome para a tarefa'),
    minutesAmount: zod.number()
      .min(5, 'O tempo do cyclo deve ser de no mínimo 5 minutos')
      .max(60, 'O tempo do cyclo deve ser de no máximo 60 minutos')
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const {handleSubmit, watch, reset } = newCycleForm
  
  const task = watch('task')
  const isSubmitDisabled = !task

  const {createNewCycle, 
    interruptCycle, 
    activeCycle } = useContext(CyclesContext)

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm/>
          </FormProvider>
          <CountDown/>
        {
          activeCycle ? (<StopCountdownButton type='button'
            onClick={interruptCycle}
          >
            <HandPalm size={24} />
            Parar
          </StopCountdownButton>) :
          (<StartCountdownButton type="submit"
          disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>)
        }
      </form>
    </HomeContainer>
  )
}