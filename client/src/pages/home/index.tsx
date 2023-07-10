import { useContext } from 'react'
import { GPTCompletion } from '../../components/GPTCompletion'
import { ScreenReader } from '../../components/ScreenReader'
import { SpeechRecognition } from '../../components/SpeechRecognition'
import {
  PromptCompletionContext,
  PromptCompletionContextDataType,
  PromptCompletionProvider,
} from '../../contexts/PromptCompletionContext'
import { useSpeaker } from '../../hooks/useSpeaker'

const locale = 'en-US'

export const Home = () => {
  const { data } = useContext(PromptCompletionContext)
  const { transcript } = data as PromptCompletionContextDataType
  useSpeaker(transcript, locale)

  return (
    <div className="home">
      <div className="content">
        <PromptCompletionProvider>
          <SpeechRecognition />
          <ScreenReader />
          <GPTCompletion />
        </PromptCompletionProvider>
      </div>
    </div>
  )
}
