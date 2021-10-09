class UserController {
  constructor(formIdCreate, formIdUpdate, tableId) {
    this.formEl = document.getElementById(formIdCreate)
    this.formIdUpdateEl = document.getElementById(formIdUpdate)
    this.tableEl = document.getElementById(tableId)
    this.onSubmit()
    this.onEdit()
    this.selectAll()
  }

  onEdit() {
    document
      .querySelector('#box-user-update .btn-cancel')
      .addEventListener('click', e => {
        this.showPanelCreate()
      })
    this.formIdUpdateEl.addEventListener('submit', e => {
      e.preventDefault()
      let button = this.formIdUpdateEl.querySelector('[type=submit]')
      button.disabled = true
      let values = this.getValues(this.formIdUpdateEl)
      let index = this.formIdUpdateEl.dataset.trIndex
      let tr = this.tableEl.rows[index]

      let userOld = JSON.parse(tr.dataset.user)
      let result = Object.assign({}, userOld, values)

      this.getPhoto(this.formEl).then(
        content => {
          if (!values.photo) result._photo = userOld._photo
          else result._photo = content
          let user = new User()
          user.loadFromJSON(result)
          user.save()
          this.getTr(user, tr)
          this.formEl.reset()
          button.disabled = false
          this.updateCount()
          this.formIdUpdateEl.reset
          this.showPanelCreate()
        },
        e => {
          console.error(e)
        }
      )
    })
  }

  //#region finalizados
  onSubmit() {
    this.formEl.addEventListener('submit', e => {
      e.preventDefault()

      let button = this.formEl.querySelector('[type=submit]')
      button.disabled = true

      let values = this.getValues(this.formEl)
      if (!values) return false

      this.getPhoto(this.formEl).then(
        content => {
          values.photo = content
          //this.getValues.save()
          values.save()
          this.addLine(values)
          this.formEl.reset()
          button.disabled = false
        },
        e => {
          console.error(e)
        }
      )
    })
  }

  getPhoto(formEl) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()
      let elements = [...formEl.elements].filter(item => {
        if (item.name === 'photo') {
          return item
        }
      })
      let file = elements[0].files[0]
      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = e => {
        reject(e)
      }
      if (file) fileReader.readAsDataURL(file)
      else resolve('../dist/img/boxed-bg.jpg')
    })
  }

  getValues(formEl) {
    let user = {}
    let isValid = true
    ;[...formEl.elements].forEach(function (field, index) {
      if (
        ['name', 'email', 'password'].indexOf(field.name) > -1 &&
        !field.value
      ) {
        field.parentElement.classlist.add('has-error')
        isValid = False
      }

      if (field.name == 'gender') {
        user[field.name] = field.value
      } else if (field.name == 'admin') {
        user[field.name] = field.checked
      } else {
        user[field.name] = field.value
      }
    })
    if (isValid) {
      return new User(
        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin
      )
    } else {
      return false
    }
  }

  //#endregion

  selectAll() {
    let users = User.getUsersStorage()
    users.forEach(dataUser => {
      let user = new User()
      user.loadFromJSON(dataUser)
      this.addLine(user)
    })
  }

  addLine(dataUser) {
    let tr = this.getTr(dataUser)
    //add new tr and update count
    this.tableEl.appendChild(tr)
    this.updateCount()
  }

  getTr(dataUser, tr = null) {
    if (tr === null) tr = document.createElement('tr')

    tr.dataset.user = JSON.stringify(dataUser)
    tr.innerHTML = `
    <td><img src="${
      dataUser.photo
    }" alt="User Image" class="img-circle img-sm"/>
    </td>
    <td>${dataUser.name}</td>
    <td>${dataUser.email}</td>
    <td>${dataUser.admin ? 'Sim' : 'Não'}</td>
    <td>${Utils.dateFormat(dataUser.register)}</td>
    <td>
      <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
      <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
    </td>`
    this.addEventsTr(tr)
    return tr
  }

  addEventsTr(tr) {
    tr.querySelector('.btn-delete').addEventListener('clcik', e => {
      if (confirm('Deseja realemnte excluir')) {
        let user = new User()
        user.loadFromJSON(JSON.parse(tr.dataset.user))
        user.removeLS()
        tr.remove()
        this.updateCount()
      }
    })

    tr.querySelector('.btn-edit').addEventListener('click', e => {
      let json = JSON.parse(tr.dataset.user)
      this.formIdUpdateEl.dataset.trIndex = tr.sectionRowIndex
      for (let name in json) {
        let field = this.formIdUpdateEl.querySelector(
          '[name=' + name.replace('_', '') + ']'
        )

        if (field) {
          if (field.type == 'file')
            switch (field.type) {
              case 'file':
                continue
                break
              case 'radio':
                field = this.formIdUpdateEl.querySelector(
                  '[name=' +
                    name.replace('_', '') +
                    '][value=' +
                    json[name] +
                    ']'
                )
                field.checked = true
                break
              case 'checkbox':
                field.checked = json[name]
                break
              default:
                field.value = json[name]
                break
            }
          field.value = json[name]
        }
      }
      this.formIdUpdateEl.querySelector('.photo').src = json._photo
      this.showPanelUpdate()
    })
  }

  showPanelCreate() {
    document.querySelector('#box-user-create').style.display = 'block'
    document.querySelector('#box-user-update').style.display = 'none'
  }

  showPanelUpdate() {
    document.querySelector('#box-user-create').style.display = 'none'
    document.querySelector('#box-user-update').style.display = 'block'
  }

  //#region finalizado
  updateCount() {
    let numberUsers = 0
    let numberAdmin = 0
    ;[...this.tableEl.children].forEach(tr => {
      let user = JSON.parse(tr.dataset.user)
      numberUsers++
      if (user._admin) numberAdmin++
    })
    document.querySelector('#number-users').innerHTML = numberUsers
    document.querySelector('#number-users-admin').innerHTML = numberAdmin
  }

  //#endregion
}
