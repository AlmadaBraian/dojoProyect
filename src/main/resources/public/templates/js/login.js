require(['dojo/_base/lang', 'dojo/dom', "dojo/Deferred", "dojo/request", "dojo/on", "dijit/form/Button", "dojo/dom-style", "dijit/Dialog", 'dojo/domReady!'], function(lang, dom, Deferred, request, on, Button, domStyle, Dialog) {
    const url = 'https://60898d938c8043001757f0db.mockapi.io/api/usuarios/';
    let us = sessionStorage.getItem("userName")
    if (us === null) {

    } else {
        let userName = dom.byId("user").value = us;
        let password = dom.byId("password").value = "";
    }
    var myButton = new Button({
        label: "Login",
        onClick: function() {
            // Do something:
            searchUser();
        }
    }, "search");

    function validateUser(largo) {

        if (largo < 1) {
            return false;

        }
        return true
    }

    alertaLogin = new Dialog({
        title: "My Dialog",
        content: `
    <p>Usuario o contraseña incorrectos</p>

    <div class="dijitDialogPaneActionBar">
        <button data-dojo-type="dijit/form/Button" type="button" data-dojo-props="onClick:function(){alertaLogin.hide();}">Ok</button>
    </div>
`,
        style: "width: 300px"
    });

    function searchUser() {

        request.get(url + "/users?search=" + dom.byId("user").value, {
                handleAs: "json"
            })
            .then(
                function(response) {
                    if (validateUser(response.length)) {
                        let us = response[0];
                        var result = us.password.localeCompare(dom.byId("password").value);
                        if (result == 0) {
                            localStorage.setItem('userName', us.user_name);
                            localStorage.setItem('email', us.email);
                            localStorage.setItem('name', us.name);
                            localStorage.setItem('avatar', us.avatar);
                            window.location.href = "ejemplo-request.html";
                        }
                    } else {
                        alertaLogin.show();
                    }



                    //dom.byId("resultado").innerHTML += `<p>Hola, ${response[0].user_name}</p>`;
                    //listaUsuarios = response.results;
                })
    }

})