export const getCompletionFor = async (query: string) => {
  const result = await window.fetch('/api/v1/openai/completion', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: query,
      max_tokens: 150,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ['\n', ' Human:', ' AI:'],
    }),
  })
  const completion = await result.json()
  return completion
}
