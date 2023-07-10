import { useContext, useRef, useState } from 'react'
import { PromptCompletionContext } from '../contexts/PromptCompletionContext'
/*

Not sure how this works with hooks yet but....
There are three modes: 
monitor mode: repeatedly listens for "hey Spud" and then switchs to prompt mode

prompt mode: listens for a prompt using our timeout based results capture and then switches back to monitor mode.



I want to repeatedly kick off recognizer.current.start() whenever we get an end event

*/
export const useListener = (lang = 'en-US', timeout = 2000) => {
  const recognizer = useRef(new webkitSpeechRecognition())
  const [result, setResult] = useState('')
  const { data, setData } = useContext(PromptCompletionContext)

  const [status, setStatus] = useState('stopped')
  const timeoutID = useRef(0)

  const start = () => {
    recognizer.current.lang = lang
    recognizer.current.continuous = true
    recognizer.current.interimResults = true
    recognizer.current.start()
  }
  const parseResult = (event: SpeechRecognitionEvent) => {
    return [...event.results].reduce((memo, result) => memo + result[0].transcript, '')
  }

  const stop = () => {
    recognizer.current.stop()
  }

  recognizer.current.addEventListener('result', (event: SpeechRecognitionEvent) => {
    window.clearTimeout(timeoutID.current)

    timeoutID.current = window.setTimeout(() => {
      window.clearTimeout(timeoutID.current)
      stop()
    }, timeout)

    setResult(parseResult(event))
  })

  recognizer.current.addEventListener('speechstart', () => {
    setStatus('recording')
  })

  recognizer.current.addEventListener('speechend', () => {
    setStatus('stopped')
  })

  recognizer.current.addEventListener('end', () => {
    result && setData({ ...data, prompt: result })
    setStatus('ended')
  })

  return { result, prompt, status, start, stop }
}
