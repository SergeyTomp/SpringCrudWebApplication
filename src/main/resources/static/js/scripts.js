function searchByLogin() {
    var login = document.getElementById("search_field").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var user = JSON.parse(this.responseText);
            var html = '<tr>\n' +
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
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/users/delete/" + userId, true);
    xhttp.send();
}

function createUser() {
    var userName = document.getElementById("user_name").value;
    var userLogin = document.getElementById("user_login").value;
    var userEmail = document.getElementById("user_email").value;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:8080/users/save");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({name: userName, login: userLogin, email: userEmail}));

    loadUsers();
}

function loadUsers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(this.responseText);
            var html = '<tr>\n' +
                '        <th>User id</th>\n' +
                '        <th>User name</th>\n' +
                '        <th>User login</th>\n' +
                '        <th>User email</th>\n' +
                '        <th>Delete</th>\n' +
                '    </tr>';
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
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