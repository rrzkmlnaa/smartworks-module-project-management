export function getCurrentDate(type) {
  let formattedDate = ''

  switch (type) {
    case '':
      break

    case 'two_layer':
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const currentDate = new Date()
      const month = months[currentDate.getMonth()]
      const day = currentDate.getDate()
      const year = currentDate.getFullYear().toString().slice(-2)
      formattedDate = `${month} ${day}, ${year}`
      break

    case 'greeting':
      break

    default:
      const date = new Date()
      formattedDate = date.toLocaleDateString()
      break
  }

  return formattedDate
}

export function getDayOfDate(date) {
  const currentDate = new Date(date)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return days[currentDate.getDay()]
}
