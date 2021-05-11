require(['dojo/_base/lang', 'dojo/dom', "dojo/Deferred", "dojo/request", "dojo/on", "dijit/form/Button", "dojo/dom-style", "dijit/Dialog", 'dojo/domReady!'], function(lang, dom, Deferred, request, on, Button, domStyle, Dialog) {
    const url = 'https://60898d938c8043001757f0db.mockapi.io/api/usuarios/';
    let us = sessionStorage.getItem("userName")
    if (us === null) {

    } else {
        let userName = dom.byId("userName").value = us;
        let password = dom.byId("password").value = "";
    }
    var myButton = new Button({
        label: "Login",
        onClick: function() {
            // Do something:
            searchUser();
        }
    }, "search");

    registrarse("Registrate");

    function validateUser(largo) {

        if (largo < 1) {
            return false;

        }
        return true
    }

    function searchUser() {

        request.get(url + "/users?search=" + dom.byId("userName").value, {
                handleAs: "json"
            })
            .then(
                function(response) {
                    let arrayNames = ["userName", "password"]
                    if (isValido(arrayNames)) {
                        let us = response[0];
                        var result = us.password.localeCompare(dom.byId("password").value);
                        if (result == 0) {
                            localStorage.setItem('userName', us.user_name);
                            localStorage.setItem('email', us.email);
                            localStorage.setItem('name', us.name);
                            localStorage.setItem('avatar', us.avatar);
                            localStorage.setItem('admin', us.admin)
                            window.location.href = "ejemplo-request.html";
                        }
                    } else {
                        alertaCamposInvalidos(crearMensajeInvalidos(arrayNames))
                    }



                    //dom.byId("resultado").innerHTML += `<p>Hola, ${response[0].user_name}</p>`;
                    //listaUsuarios = response.results;
                })
    }

})