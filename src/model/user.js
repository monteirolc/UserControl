class User {
  constructor(name, gender, register, country, email, password, photo, admin) {
    this._name = name
    this._gender = gender
    this._register = register
    this._country = country
    this._email = email
    this._password = password
    this._photo = photo
    this._admin = admin
  }

  //#region  Name
  get name() {
    return this._name
  }
  set name(value) {
    this._name = value
  }
  //#endregion

  //#region gender
  get gender() {
    return this._gender
  }
  set gender(value) {
    this._gender = value
  }
  //#endregion

  //#region  date
  get register() {
    return this._register
  }
  set register(value) {
    this._register = value
  }
  //#endregion

  //#region  conutry
  get country() {
    return this._country
  }
  set country(value) {
    this._country = value
  }
  //#endregion

  //#region  email
  get email() {
    return this._email
  }
  set email(value) {
    this._email = value
  }
  //#endregion

  //#region  password
  get password() {
    return this._password
  }
  set password(value) {
    this._password = value
  }
  //#endregion

  //#region  photo
  get photo() {
    return this._photo
  }
  set photo(value) {
    this._photo = value
  }
  //#endregion

  //#region  admin
  get admin() {
    return this._admin
  }
  set admin(value) {
    this._admin = value
  }
  //#endregion
}
