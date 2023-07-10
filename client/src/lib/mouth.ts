const languages: string[] = ['en-GB', 'en-US', 'ja-JP']
const voices: { [key: string]: SpeechSynthesisVoice | null } = {}

window.speechSynthesis.onvoiceschanged = () => {
  const allVoices = speechSynthesis.getVoices()
  languages.forEach((language: string) => {
    const voice: SpeechSynthesisVoice | null =
      allVoices.find((v) => v.lang === language && v.name.match(/Google/)) || null

    voices[language] = voice || allVoices.find((v) => v.lang === language) || null
  })
}

const makeUtterance = (text: string, voice: SpeechSynthesisVoice | null, language: string) => {
  const line = new SpeechSynthesisUtterance(text)
  line.text = text
  line.lang = language
  line.voice = voice

  return line
}

const extractLines = (text: string, language: string): SpeechSynthesisUtterance[] => {
  const voice = voices[language]
  const sentences = text.match(/([^:.!?。]+[:.!?。]+)/g) || []

  if (!sentences.length) {
    return [makeUtterance(text, voice, language)]
  }

  return sentences.map((sentence) => makeUtterance(sentence, voice, language))
}

const next = (lines: SpeechSynthesisUtterance[]) => {
  if (lines.length <= 0) {
    return
  }
  const line = lines.shift() as SpeechSynthesisUtterance
  line.addEventListener('end', () => next(lines))

  speechSynthesis.speak(line)
}

export const say = (text: string, language = 'en-US') => {
  const lines = extractLines(text, language)
  next(lines)
}
