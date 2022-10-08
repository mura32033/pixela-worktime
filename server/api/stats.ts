export default async () => {
  const data = await $fetch('https://pixe.la/v1/users/mura32033/graphs/myworktime/stats', {
    method: 'GET'
  })
  return data
}