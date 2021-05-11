let hoy = new Date();
let mayorEdad = new Date();
mayorEdad.setFullYear(mayorEdad.getFullYear() - 18);
let nombre = "";
let dni = "";
let phone = "";
let calle = "";
let num = "";
let cp = "";
let email = "";
let cc = "";
let cbu = '';
if (sessionStorage.getItem('name') != null) {
    nombre = sessionStorage.getItem('name');
    nacimiento = sessionStorage.getItem('bday');
    dni = sessionStorage.getItem('dni');
    phone = sessionStorage.getItem('phone');
    calle = sessionStorage.getItem('calle');
    num = sessionStorage.getItem('numero');
    cp = sessionStorage.getItem('cp');
    email = sessionStorage.getItem('email');
    if (sessionStorage.getItem('metodoPago').localeCompare("CBU") == 0) {
        cbu = sessionStorage.getItem('CBU')
    } else if (sessionStorage.getItem('metodoPago').localeCompare("Tarjeta de credito") == 0) {
        cc = sessionStorage.getItem('cc')
    }


}

function guardarDatos() {
    sessionStorage.setItem('name', document.getElementById("name").value);
    sessionStorage.setItem('bday', document.getElementById("bday").value);
    sessionStorage.setItem('dni', document.getElementById("dni").value);
    sessionStorage.setItem('phone', document.getElementById("phone").value);
    sessionStorage.setItem('calle', document.getElementById("calle").value);
    sessionStorage.setItem('numero', document.getElementById("numero").value);
    sessionStorage.setItem('provincia',
        document.getElementById("provincia").value);
    sessionStorage.setItem('cp', document.getElementById("cp").value);
    sessionStorage.setItem('email', document.getElementById("email").value);
    if (document.getElementById('pago').value.localeCompare("Tarjeta de credito") == 0) {
        sessionStorage.setItem('metodoPago', 'Tarjeta de credito')
        sessionStorage.setItem('cc', document.getElementById("cc").value);
        sessionStorage.setItem('cvv', document.getElementById("cvv").value);
        sessionStorage.setItem('vencimiento', document.getElementById("monthNyear").value);
    } else if (document.getElementById('pago').value.localeCompare("CBU") == 0) {
        sessionStorage.setItem('metodoPago', 'CBU')
        sessionStorage.setItem('CBU', document.getElementById("cbu").value)
    }

    window.location.href = "confirmar.html";
}