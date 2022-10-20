const config = useRuntimeConfig()

export default async () => {
  const data = await $fetch('https://pixe.la/v1/users/mura32033/graphs/myworktime/stopwatch', {
    method: 'POST',
    headers: {
      "X-USER-TOKEN": config.apiKey,
      "Content-Length": "0"
    }
  })
  return data
}