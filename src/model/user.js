class User {
  constructor(
    id,
    name,
    gender,
    register,
    country,
    email,
    password,
    photo,
    admin
  ) {
    this._id = id
    this._name = name
    this._gender = gender
    this._register = register
    this._country = country
    this._email = email
    this._password = password
    this._photo = photo
    this._admin = admin
  }
  //#region  id
  get id() {
    return this._id
  }
  set id(values) {
    this._id = values
  }
  //#endregion

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

  loadFromJSON(json) {
    for (let name in json) {
      switch (name) {
        case '_register':
          this[name] = new Date(json[name])
          break
        default:
          this[name] = json[name]
      }
    }
  }

  getNewId() {
    let usersId = localStorage.getItem('userId')
    if (!usersId > 0) usersId = 0
    usersId++
    localStorage.setItem('usersId', usersId)
    return id
  }

  save() {
    let users = User.getUsersStorage()

    if (this.id > 0) {
      users.map(u => {
        if (u.id == this.id) {
          Object.assign(u, this)
        }
        return u
      })
    } else {
      this.id = this.getNewId()
      users.push(this)
      //sessionStorage.setItem('user',JSON.stringify('users'))
    }
    localStorage.setItem('user', JSON.stringify('users'))
  }

  static getUsersStorage() {
    let users = []

    //if(sessionStorage.getItem('users')){
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'))
    }
    return users
  }

  removeLS() {
    let users = User.getUsersStorage()
    users.forEach((userData, index) => {
      if (this.id == userData.id) {
        //splice remove um(ou mais) elementos de um array
        users.splice(index, 1)
      }
    })
    localStorage.setItem('users', JSON.stringify('users'))
  }
}
