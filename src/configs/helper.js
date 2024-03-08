const ISO_DATE_FORMAT = { year: 'numeric', month: 'long', day: 'numeric' }
const ISO_TIME_FORMAT = { hour: '2-digit', minute: '2-digit' }

export function getUser() {
  const userDataJSON = localStorage.getItem('userData')
  const user = userDataJSON ? JSON.parse(userDataJSON) : null

  return user
}

export function setPermissions(permissions) {
  localStorage.setItem('userPermissions', permissions)

  return
}

export function getPermissions() {
  const userPermissions = localStorage.getItem('userPermissions')
  const permissions = userPermissions ? JSON.parse(userPermissions) : null

  return permissions
}

export function getFirstName(fullName) {
  const nameArray = fullName.split(' ')
  const firstName = nameArray[0]

  return firstName
}

export function formatName(inputText) {
  // Split the input text into words
  const words = inputText.split(' ')

  // Take the first two words
  const truncatedWords = words.slice(0, 2)

  // Join the truncated words into a single string
  const result = truncatedWords.join(' ')

  return result
}

export function createDate(dateTimeString) {
  return new Date(dateTimeString)
}

export function formatDateTimeToISO(date) {
  if (isNaN(date)) {
    throw new Error('Invalid input: Not a valid date')
  }

  return date.toISOString()
}

export function formatDateISO(dateString, formatOptions = ISO_DATE_FORMAT) {
  const date = createDate(dateString)
  if (isNaN(date)) {
    throw new Error('Invalid input: Not a valid date')
  }

  return date.toLocaleDateString('en-US', formatOptions)
}

export function formatTime(decimalHours) {
  // Convert decimal hours to hours and minutes
  var hours = Math.floor(decimalHours)
  var decimalMinutes = (decimalHours - hours) * 60
  var minutes = Math.round(decimalMinutes)

  // Format the time
  var formattedTime = hours + 'h ' + minutes + 'm'

  return formattedTime
}

export function formatToDateTime(dateString) {
  const date = new Date(dateString)

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  }

  return date.toLocaleDateString('en-US', options)
}

export function formatTimeISO(isoDateString) {
  const date = createDate(isoDateString)
  if (isNaN(date)) {
    throw new Error('Invalid input: Not a valid date')
  }

  return date.toLocaleTimeString('en-US', ISO_TIME_FORMAT)
}

export function formatTimeFromDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hours12 = hours > 12 ? hours - 12 : hours
  const formattedHours = hours12.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes} ${ampm}`
}

export function extractDateFromDateTime(dateTimeString) {
  const date = createDate(dateTimeString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function convertTimeFormat(timeString) {
  const [hours, minutes] = timeString.split(':')

  return `${hours}:${minutes}`
}

export function getCurrentDateFormatted() {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const day = String(new Date().getDate()).padStart(2, '0')

  return `${year}/${month}/${day}`
}

export function formatDate(inputDate) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const formattedDate = createDate(inputDate).toLocaleDateString(undefined, options)

  return formattedDate
}

export function debounce(func, wait) {
  let timeout

  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export function createArrayOfDaysInMonth(year, month) {
  const daysInMonth = createDate(`${year}-${month + 1}-01`).getDate()
  const arrayOfDays = []

  for (let i = 1; i <= daysInMonth; i++) {
    const day = i.toString().padStart(2, '0')
    arrayOfDays.push(day)
  }

  return arrayOfDays
}

export function getDaysInMonth(year, month) {
  if (month < 1 || month > 12) {
    return 'Invalid month'
  }

  // Create a date for the first day of the next month
  const nextMonthDate = new Date(year, month, 1)

  // Subtract one day to get the last day of the current month
  const lastDayOfMonth = new Date(nextMonthDate - 1)

  return lastDayOfMonth.getDate()
}

export function getMonthAndYear(dateString) {
  const date = createDate(dateString)
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return [month, year]
}

export function textCapitalize(text) {
  if (typeof text !== 'string') {
    return text
  }

  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function getCurrentDate() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const currentDate = new Date()
  const dayOfWeek = daysOfWeek[currentDate.getDay()]
  const dayOfMonth = currentDate.getDate()
  const month = months[currentDate.getMonth()]
  const year = currentDate.getFullYear()

  return `It's ${dayOfWeek}, ${dayOfMonth} ${month}`
}

export function getGreeting() {
  const currentHour = new Date().getHours()
  let greeting = ''

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }

  return greeting
}

export function getDayOfWeek(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Create a Date object from the input string
  const date = new Date(dateString)

  // Get the day of the week (0-indexed)
  const dayIndex = date.getDay()

  // Get the day name from the array
  const dayName = daysOfWeek[dayIndex]

  return dayName
}

export function formatDateQuery(inputDate) {
  const date = new Date(inputDate)

  if (isNaN(date)) {
    throw new Error('Invalid date format')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function removeObjNullValues(obj) {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    }
  }

  return obj
}
