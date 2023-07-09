import { useContext, useRef } from 'react'
import {
  PromptCompletionContext,
  PromptCompletionContextDataType,
} from '../contexts/PromptCompletionContext'
import { say } from '../lib/mouth'

export const ScreenReader = () => {
  const { data } = useContext(PromptCompletionContext)
  const { transcript = '' } = data as PromptCompletionContextDataType
  const cache = useRef({ transcript: '' })

  if (transcript && cache.current.transcript !== transcript) {
    cache.current.transcript = transcript
    say(transcript)
  }

  return (
    <>
      <button>stuff that can pause/restart/stop</button>
    </>
  )
}
