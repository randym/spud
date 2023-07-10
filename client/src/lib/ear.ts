import { Delegate } from './delegate'
const EVENTS: { [key: string]: string } = {
  audiostart: 'onAudioStart',
  audioend: 'onAudioEnd',
  end: 'onEnd',
  error: 'onError',
  nomatch: 'onNoMatch',
  result: 'onResult',
  soundstart: 'onSoundStart',
  soundend: 'onSoundEnd',
  speechstart: 'onSpeechStart',
  speechend: 'onSpeechEnd',
  start: 'onStart',
}

export class Ear extends Delegate {
  static delegate: DelegateDeclaration = { sr: ['abort', 'start', 'stop'] }

  sr: SpeechRecognition
  result: string
  events: { [key: string]: RecognitionEventObserver[] }
  constructor(lang = 'en-US') {
    super()

    this.sr = new webkitSpeechRecognition()
    this.sr.lang = lang
    this.sr.continuous = true
    this.sr.interimResults = true
    this.result = ''
    this.events = {}
    Object.values(EVENTS).forEach((value) => {
      const name = value as SpeechRecognitionEventHandler<Ear>
      this[name] = this[name].bind(this)
    })

    this.bind()
  }

  observe(observer: (event: RecognitionEvent) => void, name: string) {
    this.events[name] ||= []
    this.events[name].push(observer)
  }

  broadcast(name: string, event: RecognitionEvent) {
    const events = this.events[name] || []
    events.forEach((observer) => observer(event))
  }

  destructor() {
    this.bind('off')
    this.events = {}
  }

  bind(direction: 'on' | 'off' = 'on') {
    const { sr } = this
    const action = direction === 'on' ? 'addEventListener' : 'removeEventListener'
    const events = EVENTS as { [key: string]: SpeechRecognitionEventHandler<Ear> }

    Object.entries(events).forEach(([key, value]) => sr[action](key, this[value]))
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  start() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stop() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  abort() {}

  [EVENTS.audiostart](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.audiostart, event)
  }

  [EVENTS.audioend](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.audioend, event)
  }

  [EVENTS.end](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.end, event)
  }

  [EVENTS.error](event: SpeechRecognitionErrorEvent) {
    this.broadcast(EVENTS.error, event)
  }

  [EVENTS.nomatch](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.nomatch, event)
  }

  [EVENTS.result](event: SpeechRecognitionEvent) {
    this.result = event.results[0][0].transcript
    this.broadcast(EVENTS.result, event)
  }

  [EVENTS.soundstart](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.soundstart, event)
  }

  [EVENTS.soundend](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.soundend, event)
  }

  [EVENTS.speechstart](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.speechstart, event)
  }

  [EVENTS.speechend](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.speechend, event)
  }

  [EVENTS.start](event: SpeechRecognitionEvent) {
    this.broadcast(EVENTS.start, event)
  }
}

export const ear = new Ear()
