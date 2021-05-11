//recibe un array con los id de los input a validar y devuelve los id de los invalidos
function guardarInvalidos(array) {
    let invalidos = [];
    array.forEach(element => {
        if (dijit.byId(element).validate() == false) {
            invalidos.push(element)
        }
    });
    return invalidos;
}

function isValido(array) {
    let boolean = false
    array.every(element => {
        if (dijit.byId(element).validate() == false) {
            boolean = false;
            return false
        }
        boolean = true;
        return true
    });
    return boolean;
}

function areValids(array) {
    let boolean = false;
    let invalidos = [];

    array.every(element => {
        if (isValido(element) == false) {
            boolean = false;
            return false
        }
        boolean = true;
        return true
    });
    if (boolean == false) {
        array.forEach(element => {
            element.forEach(element => {
                if (dijit.byId(element).validate() == false) {
                    invalidos.push(element)
                }
            });
        });

    }
    let respuesta = {
        valido: boolean,
        camposInv: invalidos
    }
    return respuesta
}

function validar(todo, colorVal, colorInv) {
    let array = []
        //const todo = ['email', 'cp', 'numero', 'calle', 'phone', 'dni', 'bday', 'name', 'cc', 'cvv', "monthNyear"]
    todo.forEach(element => {
        array.push(element.form)
    });
    let validacion = areValids(array)
    if (validacion.valido) {
        guardarDatos()
    } else {
        let inv = guardarInvalidos(validacion.camposInv)
        alertaCamposInvalidos(crearMensajeInvalidos(inv))
    }
    cambiarColores(todo, colorVal, colorInv)

}

function crearMensajeInvalidos(array) {
    let html = "<h4>Los siguientes campos son invalidos</h4><br/>";
    array.forEach(element => {
        html += `<p>${element}</p>`
    });
    return html;
}

function cambiarColor(color, id) {
    require(["dojo/dom-style"], function(domStyle) {
        //domStyle.set("form1_wrapper", "background-color", "#1b8524");
        domStyle.set(id, "background-color", color);
    })
}

function cambiarColores(array, color1, color2) {
    array.forEach(element => {
        if (isValido(element.form) == true) {
            cambiarColor(color1, element.id)

        } else {
            cambiarColor(color2, element.id)
        }
    });
}