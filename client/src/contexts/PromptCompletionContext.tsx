import React, { ReactNode, useState } from 'react'
export type PromptCompletionContextDataType = {
  prompt?: string
  completion?: string
  transcript?: string
}

const defaultValue: {
  data: object
  setData: React.Dispatch<React.SetStateAction<PromptCompletionContextDataType>>
} = {
  data: {},
  setData: (value = {}) => {
    defaultValue.data = { ...defaultValue.data, ...value }
  },
}

export const PromptCompletionContext = React.createContext(defaultValue)

export const PromptCompletionProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({})
  return (
    <PromptCompletionContext.Provider value={{ data, setData }}>
      {children}
    </PromptCompletionContext.Provider>
  )
}
