import { useListener } from '../hooks/useListener'

export const SpeechRecognition = ({ language = 'en-US' }: { language?: string }) => {
  const { result, status, start, stop } = useListener(language)

  return (
    <>
      <button className={status} onClick={() => (status !== 'recording' ? start() : stop())}>
        Record
      </button>

      <fieldset>
        <legend>Prompt</legend>
        <p className="prompt">{result}</p>
      </fieldset>
    </>
  )
}
