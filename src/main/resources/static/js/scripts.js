function searchByLogin() {
    let login = document.getElementById("search_field").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let user = JSON.parse(this.responseText);
            let html = '<tr>\n' +
                '        <th>User id</th>\n' +
                '        <th>User name</th>\n' +
                '        <th>User login</th>\n' +
                '        <th>User email</th>\n' +
                '        <th>Delete</th>\n' +
                '    </tr>';
            html = html + '<tr><td>' + user.id + '</td>\n' +
                '        <td>' + user.name + '</td>\n' +
                '        <td>' + user.login + '</td>\n' +
                '        <td>' + user.email + '</td>' +
                '        <td><button onclick="deleteUser(' + user.id + ')">Delete</button></td></tr>';
            document.getElementById("usersList").innerHTML = html;
        }
    };
    xhttp.open("GET", "http://localhost:8080/users/findByLogin?login=" + login, true);
    xhttp.send();
}
function deleteUser(userId) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/users/delete/" + userId, true);
    xhttp.send();
}
function createUser() {
    let userName = document.getElementById("user_name").value;
    let userLogin = document.getElementById("user_login").value;
    let userEmail = document.getElementById("user_email").value;
    let xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:8080/users/save");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({ name: userName, login: userLogin, email: userEmail }));
    loadUsers();
}
function loadUsers() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let users = JSON.parse(this.responseText);
            let html = '<tr>\n' +
                '        <th>User id</th>\n' +
                '        <th>User name</th>\n' +
                '        <th>User login</th>\n' +
                '        <th>User email</th>\n' +
                '        <th>Delete</th>\n' +
                '    </tr>';
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                console.log(user);
                html = html + '<tr><td>' + user.id + '</td>\n' +
                    '        <td>' + user.name + '</td>\n' +
                    '        <td>' + user.login + '</td>\n' +
                    '        <td>' + user.email + '</td>' +
                    '        <td><button onclick="deleteUser(' + user.id + ')">Delete</button></td></tr>';
            }
            document.getElementById("usersList").innerHTML = html;
        }
    };
    xhttp.open("GET", "http://localhost:8080/users/findAll", true);
    xhttp.send();
}
loadUsers();
