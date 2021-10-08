class Utils {
  static dateFormat(date) {
    let currentDate = new Date()
    return (
      currentDate.getDate() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getFullYear() +
      ' ' +
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes()
    )
  }
}
