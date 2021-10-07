class User {
  constructor(name, gender, date, country, email, password, photo, admin) {
    this._name = name
    this._gender = gender
    this._date = date
    this._country = country
    this._email = email
    this._password = password
    this._photo = photo
    this._admin = admin
  }

  //#region  Name
  get name() {
    return this_name
  }
  set name(value) {
    this_name.value
  }
  //#endregion

  //#region gender
  getgender() {
    return this._gender
  }
  setgender(value) {
    this._gender.value
  }
  //#endregion

  //#region  date
  get date() {
    return this_date
  }
  set date(value) {
    this_date.value
  }
  //#endregion

  //#region  conutry
  get country() {
    return this_country
  }
  set country(value) {
    this_country.value
  }
  //#endregion

  //#region  email
  get email() {
    return this_email
  }
  set email(value) {
    this_email.value
  }
  //#endregion

  //#region  password
  get password() {
    return this_password
  }
  set password(value) {
    this_password.value
  }
  //#endregion

  //#region  photo
  get photo() {
    return this_photo
  }
  set photo(value) {
    this_photo.value
  }
  //#endregion

  //#region  admin
  get admin() {
    return this_admin
  }
  set admin(value) {
    this_admin.value
  }
  //#endregion
}
