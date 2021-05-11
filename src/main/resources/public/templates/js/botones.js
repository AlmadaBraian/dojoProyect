function botonLogin(nodo) {
    require(["dijit/form/Button"], function(Button) {
        var login = new Button({
            label: "Iniciar sesion",
            onClick: function() {
                window.location.href = "login.html";
            }
        }, nodo);
    })
}

function registrarse(nodo) {
    require(["dijit/form/Button"], function(Button) {
        var registro = new Button({
            label: "Registrate",
            onClick: function() {
                // Do something:
                singIn.show();
            }
        }, nodo);

    })
}


function cerrarSesion(nodo) {
    require(["dijit/form/Button"], function(Button) {
        var cerrar = new Button({
            label: "Cerrar sesion",
            onClick: function() {
                localStorage.clear();
                location.reload();
            }
        }, nodo);
    })

}