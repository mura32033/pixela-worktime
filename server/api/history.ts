const config = useRuntimeConfig()

export default async () => {
  const data = await $fetch('https://pixe.la/v1/users/mura32033/graphs/myworktime/pixels?withBody=true', {
    method: 'GET',
    headers: {
      "X-USER-TOKEN": config.apiKey
    }
  })
  return data
}