import { useContext, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getCompletionFor } from '../lib/openai'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import {
  PromptCompletionContext,
  PromptCompletionContextDataType,
} from '../contexts/PromptCompletionContext'

export const GPTCompletion = () => {
  const { data, setData } = useContext(PromptCompletionContext)
  const [completion, setCompletion] = useState('')
  const { prompt = '' } = data as PromptCompletionContextDataType

  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!prompt) {
      return
    }

    const complete = async () => {
      const {
        message: { content: completion },
      } = await getCompletionFor(prompt)

      const transcript = completion.replace(/```([^`]*)```/g, '')
      setData({ transcript })
      setCompletion(completion)
    }

    complete()
  })

  return (
    <fieldset>
      <legend>Completion</legend>
      <div className="completion" ref={messageRef}>
        <ReactMarkdown
          children={completion}
          components={{
            code({ inline = false, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={twilight}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        />
      </div>
    </fieldset>
  )
}
