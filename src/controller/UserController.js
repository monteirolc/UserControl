class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId)
    this.tableEl = document.getElementById(tableId)
    this.onSubmit()
  }

  onSubmit() {
    this.formEl.addEventListener('submit', e => {
      e.preventDefault()

      let button = this.formEl.querySelector('[type=submit]')
      button.disabled = true

      let value = this.getValues()
      if (!value) {
        return false
      }
      this.getPhoto().then(
        content => {
          value.photo = content
          this.addLine(value)
          this.formEl.reset()
          button.disabled = false
        },
        e => {
          console.error(e)
        }
      )
    })
  }

  getPhoto() {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()
      let elements = [...this.formEl.elements].filter(item => {
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

  getValues() {
    let user = {}
    let isValid = true
    ;[...this.formEl.elements].forEach(function (field, index) {
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
      //this.onSubmit()
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

  addLine(dataUser) {
    let tr = document.createElement('tr')

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

    tr.querySelector('.btn-edit').addEventListener('click', e => {
      JSON.parse(tr.dataset.user)
      document.querySelector('#box-user-create').style.display = 'none'
      document.querySelector('#box-user-update').style.display = 'block'
    })

    this.tableEl.appendChild(tr)
    this.updateCount()
  }
  updateCount() {
    let numberUsers = 0
    let numberAdmin = 0
    ;[...this.tableEl.children].forEach(tr => {
      let user = JSON.parse(tr.dataset.user)
      numberUsers++
      if (user._admin) numberAdmin++
    })
    document.querySelector('#number-users').innerHTML = numberUsers
    document.querySelector('#number-users-asmin').innerHTML = numberAdmin
  }
}
