        // Para hacer la solicitud a la API importar la funcion "dojo/request"
        require(["dojo/dom", "dojo/on", "dojo/mouse", "dojo/request", "dijit/layout/BorderContainer", "dijit/layout/TabContainer",
            "dijit/layout/ContentPane", "dojo/store/Memory", "dojo/json",
            "dojo/when", "dojo/Deferred", "dijit/form/FilteringSelect", "dojo/dom-construct", "dojo/html", 'dojo/fx', "dojo/dom-style", "js/tienda", "dojo/_base/fx", "dijit/form/Button", "dojo/domReady!"
        ], function(dom, on, mouse, request, BorderContainer, TabContainer, ContentPane, Memory, json, when, Deferred, FilteringSelect, domConstruct, html, coreFx, domStyle, tienda, fx, Button) {


            let botonTienda = dom.byId('tienda');
            let botonBuscador = dom.byId("busc")
            let contenedor = dom.byId('buscador');
            let musica = dom.byId("musica");
            let contenedorTienda = dom.byId('tiendaContainer');
            let botonTest = dom.byId("botonTest");
            let tabla = dom.byId("tabla");
            let test = dom.byId("test");
            let pokeArray = [];
            const urlus = 'https://60898d938c8043001757f0db.mockapi.io/api/usuarios/';
            let us = {
                userName: localStorage.getItem('userName'),
                email: localStorage.getItem('email'),
                name: localStorage.getItem('name'),
                avatar: localStorage.getItem('avatar'),
                admin: localStorage.getItem('admin')

            };

            if (us.name === null) {
                botonLogin("logout");
                registrarse("registro");

            } else {
                domStyle.set("usuario", "display", "inline");
                let bienvenida = dom.byId("usuario");
                let avatar = dom.byId("avatar");
                bienvenida.innerHTML = `<p>Bienvenido ${us.userName}</p>`;
                avatar.innerHTML = `<img alt="" src="${us.avatar}" width='55%'/>`
                cerrarSesion("logout")
            }



            //let test2 = "<option>" + url + "</option>";
            //options.innerHTML = test2;
            function setOptions() {
                var deferred = new Deferred();
                let pokenombres = [];
                return request.get(`https://pokeapi.co/api/v2/pokemon/?limit=-1`, {
                        handleAs: "json"
                    })
                    .then(
                        function(response) {

                            listaPokemon = response.results;

                            //listaPokemon = response.results;
                            let cont = 1;
                            const nombres = listaPokemon.map((pokemon) => pokemon.name).forEach(element => {
                                pokenombres.push({

                                    name: element,
                                    value: element
                                });
                                cont++;
                            });
                            return pokenombres
                        })
                return pokenombres
            }

            when(setOptions(), function obtenerPokemones(pokenombres) {
                var pokeStore = new Memory({
                    data: pokenombres
                });
                var filteringSelect = new FilteringSelect({
                    id: "pokeStore",
                    name: "pokemons",
                    value: "",
                    store: pokeStore,
                    searchAttr: "name"
                }, "pokemonName");
            })

            //options.innerHTML = "<option>pokemon</option>"
            // let opcion = "<option>" + element + "</option>";
            //poke.innerHTML = opcion;})

            //dojo.destroy("dijit_form_FilteringSelect_0");


            //obtenerPokemones()
            // Funcion de evento click izquierda
            // params (target, event, function)

        });