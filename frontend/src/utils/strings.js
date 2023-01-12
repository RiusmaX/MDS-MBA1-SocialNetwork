const getExtract = (text) => {
  return text.length > 160 ? `${text.substring(0, 160)}...` : text
}

export {
  getExtract
}
