const getOrdinalNum = (number) => {
  let selector

  if (number <= 0) {
    selector = 4
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0
  } else {
    selector = number % 10
  }

  return number + ["th", "st", "nd", "rd", ""][selector]
}

// Convert the String Date to a readable format
export const getDate = (dateOrg) => {
  const d = new Date(dateOrg)
  const dayName = new Intl.DateTimeFormat("en", { weekday: "long" }).format(d)
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d)
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(d)
  const year = d.getFullYear()

  return {
    dayName: dayName.replace(/\w/, (c) => c.toUpperCase()),
    day: getOrdinalNum(+day),
    year: year,
    month: month.replace(/\w/, (c) => c.toUpperCase()),
  }
}

export const priceSeparator = (numb) => {
  let str = numb.toString().split(".")
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return str.join(".")
}

// Get first letter of each word in a sentence

export const getAvatarLetter = (name) => {
  return name.match(/(?<!\p{L}\p{M}*|[\p{N}\p{Pc}])\p{L}/gu).join("")
}

export const extractTimeFromDate = (dateString) => {
  return new Date(dateString).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  })
}
