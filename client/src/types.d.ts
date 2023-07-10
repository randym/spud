type RecognitionEvent = SpeechRecognitionEvent | SpeechRecognitionErrorEvent
type RecognitionEventObserver = (event: RecognitionEvent) => void

type SpeechRecognitionEventHandler<T> = {
  [K in keyof T]: T[K] extends (event: RecognitionEvent) => void ? K : never
}[keyof T]

type DelegateDeclaration = { [key: string]: string[] }

type AnyFunction = (...args: unknown[]) => unknown

type User = {
  displayName: string
  photos: Array<{ value: string }>
}
