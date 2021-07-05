const capitalize = str => {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.substr(1)
}

export { capitalize }
