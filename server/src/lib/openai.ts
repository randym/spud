import { env } from '../config'
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
const { OPENAI_ORG: organization, OPENAI_API_KEY: apiKey } = env

const configuration = new Configuration({ organization, apiKey })
const openai = new OpenAIApi(configuration)

export const OpenAI = {
  async complete(content: string, role: ChatCompletionRequestMessageRoleEnum = 'user') {
    const {
      data: { choices },
    } = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role, content }],
    })

    return choices[0]
  },
}
