import { useEffect, useRef } from 'react'
import { say } from '../lib/mouth'

export const useSpeaker = (completion = '', language = 'en-US') => {
  const cache = useRef('')
  useEffect(() => {
    if (cache.current === completion) {
      return
    }

    cache.current = completion
    say(completion, language)
  }, [completion, language])
}
