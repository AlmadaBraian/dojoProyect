require(['dojo/_base/lang', 'dojo/dom', "dojo/request", "dojo/on", "dijit/form/Button", "dojo/dom-style", "dijit/Dialog", "dojo/dom-form", "dojox/validate/web", "dijit/registry", "dojo/dom-construct", "dijit/form/ValidationTextBox", "dijit/form/NumberTextBox", "dojo/parser", "dojox/form/PasswordValidator", 'dojo/domReady!'], function(lang, dom, request, on, Button, domStyle, Dialog, domForm, validate, registry, domConstruct) {
    const url = 'https://60898d938c8043001757f0db.mockapi.io/api/usuarios/users';
    //console.log(new Date().getFullYear().toString().substr(-2));
    singIn = new Dialog({
        title: "Sing in",
        content: `
    <form id="formNode" style="text-align: center;">
    
        <label for="name&lastName">Nombre y Apellido: <input data-dojo-type="dijit/form/ValidationTextBox" required="true" name="name" id="namecomp"></label>
       
<label for="User">Usuario:<input data-dojo-type="dijit/form/ValidationTextBox" required="true" name="userN" id="userN"></label>
    
<label for="email">Email: <input id="emailreg" name="email" data-dojo-type="dijit/form/ValidationTextBox" required="true" data-dojo-props="validator:dojox.validate.isEmailAddress,
invalidMessage:'This is not a valid email!'"></label>
   

<div data-dojo-type="dojox.form.PasswordValidator" name="password" id="passValid">
    <label>Password: <input type="password" pwType="new" id="passwordS" /></label><br>
    <label>Validate: <input type="password" pwType="verify" id="passwordV"/></label><br>
</div>

    
    <div class="dijitDialogPaneActionBar">
    <button  type="button" id="enviar2">OK</button>
        <button data-dojo-type="dijit/form/Button" type="button" data-dojo-props="onClick:function(){singIn.hide();}">Cancelar</button>
    </div>
    </form>
`,
        style: "width: 450px"
    });
    var boton = new Button({
        label: "Registrate",
        onClick: function() {
            // Do something:
            enviar();
        }
    }, "enviar2");

    function registro(usuario, nombre, email, password) {
        request.get(url + "?search=" + email, {
                handleAs: "json"
            })
            .then(
                function(response) {
                    if (response.length < 1) {
                        request.post(url, {
                            handleAs: "json",
                            data: {
                                "user_name": usuario,
                                "name": nombre,
                                "email": email,
                                "password": password,
                                "avatar": "https://www.w3schools.com/w3images/avatar2.png",
                                "admin": true
                            }
                        }).then(function(text) {
                            singIn.hide()
                            domConstruct.destroy(singIn);
                        });
                    } else {
                        alertaCampoInvalido("Ya te has registrado con el Email " + email);
                    }
                })

    }

    function enviar() {
        // prevent the page from navigating after submit

        let nombre = dom.byId("namecomp").value;
        let usuario = dom.byId("userN").value;
        let email = dom.byId("emailreg").value;
        let password = dom.byId("passwordS").value;
        let passwordValidate = dom.byId("passwordV").value;

        const arrayId = ["namecomp", "userN", "emailreg", "passValid"]


        //validarVacio(array);
        let invalidos = guardarInvalidos(arrayId)

        if (invalidos.length < 1) {
            request.get(url + "?search=" + usuario, {
                    handleAs: "json"
                })
                .then(
                    function(response) {
                        if (response.length < 1) {
                            registro(usuario, nombre, email, password)
                        } else {
                            alertaCampoInvalido("Ya te has registrado con el usuario " + usuario);
                        }
                    })
        } else {
            arrayNames = []
                //const arrayId = ["name", "userN", "email", "passValid"]
            if (invalidos.includes('namecomp')) {
                arrayNames.push("Nombre")
            }
            if (invalidos.includes('userN')) {
                arrayNames.push("Usuario")
            }
            if (invalidos.includes('emailreg')) {
                arrayNames.push("Email")
            }
            if (invalidos.includes('passValid')) {
                arrayNames.push("Password")
            }
            alertaCamposInvalidos(crearMensajeInvalidos(arrayNames))
        }


    }


})