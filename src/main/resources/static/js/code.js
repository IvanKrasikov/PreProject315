async function usersTable() {
    const tbody = document.querySelector('#tbodyTableUsers')
    let html = ""
    await fetch('api/users').then(res => res.json())
        .then(users => {
            users.forEach(user => {
                html += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.rolesToString}</td>

                    <td>
                        <button type="button" onclick="editForm(${user.id})" class="btn btn-info text-white"
                        data-bs-toggle="modal" data-bs-target="#editModal">Edit
                        </button>
                    </td>
                    <td>
                        <button type="button" onclick="deleteForm(${user.id})" class="btn btn-danger"
                        data-bs-toggle="modal" data-bs-target="#deleteModal">Delete
                        </button>
                    </td>
                </tr>
                `
            })
            tbody.innerHTML = html
        })
}
usersTable()

async function editForm(id) {
    const body = document.querySelector('#editModalBody')
    let html = ""

    await fetch(`api/users/${id}`).then(res => res.json())
        .then(user => {
            html += `
                <form>
                    <div class="w-50 mx-auto text-center">

                        <b><label for="edit-id">ID</label></b>
                        <input class="form-control" type="text"  value="${user.id}"
                               id="edit-id"
                               disabled>

                        <b><label for="edit-name">First name </label></b>
                        <p><input class="form-control" type="text"
                                  value="${user.firstName}"
                                  id="edit-firstName">
                        </p>

                        <b><label for="edit-lastName">LastName: </label></b>
                        <p><input class="form-control" type="text"
                                  value="${user.lastName}"
                                  id="edit-lastName">
                        </p>

                        <b><label for="edit-age">Age</label></b>
                        <p><input class="form-control" type="number" value="${user.age}"
                                  id="edit-age"></p>

                        <b><label for="edit-email">Email: </label></b>
                        <p><input class="form-control" type="text"
                                  value="${user.email}" id="edit-email"></p>

                        <b><label for="edit-password">Password: </label></b>
                        <p><input class="form-control" type="password"
                                  value="${user.password}"
                                  id="edit-password"></p>

                        <b><label for="edit-roles">Role</label></b>
                        <select class="form-control" size="2" id="edit-roles">
                            <option value="ROLE_USER">USER</option>
                            <option value="ROLE_ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div class="modal-footer text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary" onclick="editUser()" data-bs-dismiss="modal">
                            Edit
                        </button>
                    </div>
                </form>
                `
            body.innerHTML = html
        })
}

async function editUser() {
    let user = {
        id: document.querySelector('#edit-id').value,
        firstName: document.querySelector('#edit-firstName').value,
        lastName: document.querySelector('#edit-lastName').value,
        age: document.querySelector('#edit-age').value,
        email: document.querySelector('#edit-email').value,
        password: document.querySelector('#edit-password').value,
        roles: [{
            id: 1,
            role: document.querySelector('#edit-roles').value
        }]
    }
    await fetch('api/users', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Referer': null
        },
        body: JSON.stringify(user)
    })
    await usersTable()
}

async function deleteForm(id) {
    const body = document.querySelector('#deleteModalBody')
    let html = ""

    await fetch(`api/users/${id}`).then(res => res.json())
        .then(user => {
            html += `
                <form>
                    <div class="w-50 mx-auto text-center">

                        <b><label for="edit-id">ID</label></b>
                        <input class="form-control" type="text"  value="${user.id}"
                               id="edit-id"
                               disabled>

                        <b><label for="edit-name">First name </label></b>
                        <p><input class="form-control" type="text"
                                  value="${user.firstName}"
                                  id="edit-firstName"
                                  disabled>
                        </p>

                        <b><label for="edit-lastName">LastName: </label></b>
                        <p><input class="form-control" type="text"
                                  value="${user.lastName}"
                                  id="edit-lastName"
                                  disabled>
                        </p>

                        <b><label for="edit-age">Age</label></b>
                        <p><input class="form-control" type="number" value="${user.age}"
                                  id="edit-age"
                                  disabled></p>

                        <b><label for="edit-email">Email: </label></b>
                        <p><input class="form-control" type="text"
                                  value="${user.email}" id="edit-email"
                                  disabled></p>

                        <b><label for="edit-password">Password: </label></b>
                        <p><input class="form-control" type="password"
                                  value="${user.password}"
                                  id="edit-password"
                                  disabled></p>

                        <b><label for="edit-roles">Role</label></b>
                        <select class="form-control" size="2" id="edit-roles" disabled>
                            <option>${user.rolesToString} </option>
                        </select>
                    </div>
                    <div class="modal-footer text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary" onclick="deleteUser(${id})" data-bs-dismiss="modal">
                            Delete
                        </button>
                    </div>
                </form>
                `
            body.innerHTML = html
        })
}
async function deleteUser(id) {
    await fetch(`api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Referer': null
        }
    })
    await usersTable()
}