function alertaCamposInvalidos(mensaje) {
    require(["dijit/Dialog"], function(Dialog) {
        alertaCampo = new Dialog({
            title: "Usuario error",
            content: `<div>
            ${mensaje}
        </div>
            <div class="dijitDialogPaneActionBar">
            <button data-dojo-type="dijit/form/Button" type="button" data-dojo-props="onClick:function(){alertaCampo.hide()
                    
                ;}">Aceptar</button>
            </div>
        `,
            style: "width: 300px"
        });
        alertaCampo.show();
    })


}

function alertaCampoInvalido(mensaje) {
    require(["dijit/Dialog", "dojo/dom-construct", 'dojo/domReady!'], function(Dialog) {
        alertaUsuario = new Dialog({
            title: "Usuario error",
            content: `
            <p>${mensaje}</p>
        
            <div class="dijitDialogPaneActionBar">
            <button data-dojo-type="dijit/form/Button" type="button" data-dojo-props="onClick:function(){alertaUsuario.hide()
                    
                ;}">Aceptar</button>
            </div>
        `,
            style: "width: 300px"
        });
        alertaUsuario.show()
    })


}