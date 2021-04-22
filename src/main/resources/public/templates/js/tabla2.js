require(['dojo/_base/lang', 'dojox/grid/EnhancedGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom', "dojo/on", "dojo/request", "dojo/dom-construct", "dojo/store/DataStore", "dojox/grid/enhanced/plugins/Pagination", "dojo/store/Memory", "dojo/data/ObjectStore", "dojo/dom-attr", "dojo/domReady!"],
    function(lang, EnhancedGrid, ItemFileWriteStore, dom, on, request, domConstruct, DataStore, Pagination, Memory, ObjectStore, domAttr) {
        const url = "https://pokeapi.co/api/v2/pokemon/";
        let idgrid = "grid";
        let pokeArray = [];
        var rows = 60;
        let h = 150;
        let layout = [
            [{
                'name': 'Nombre',
                'field': 'Nombre'
            }, {
                'name': 'Altura',
                'field': 'Altura'
            }, {
                'name': 'Peso',
                'field': 'Peso'
            }, {
                'name': 'Tipo',
                'field': 'Tipo'
            }, {
                'name': 'Batallas',
                'field': 'Batallas',

            }, {
                name: "Sprite",
                field: "Frente",
                formatter: (Frente) => {

                    return `<img alt="" src="${Frente}"/>`;
                }
            }, ]
        ];
        var data = {
            identifier: 'id',
            items: pokeArray
        };
        let store = new ItemFileWriteStore({ data: data });

        /*set up data store*/
        function searchPokemon() {
            var pokemonId = dom.byId("pokeStore").value;
            var abilidades = dom.byId("abilidades");
            request.get(url + pokemonId, {
                    handleAs: "json"
                })
                .then(
                    function(res) {
                        //console.log(res.abilities[0].ability.name)
                        const pokeObjeto = {
                            id: res.id,
                            Nombre: res.name,
                            Tipo: res.types[0].type.name,
                            Altura: Math.round(res.height * 10),
                            Peso: Math.round(res.weight / 10),
                            Batallas: res.game_indices.length,
                            Frente: res.sprites.front_default,
                            Espalda: res.sprites.back_default,
                        };
                        pokeArray.push(pokeObjeto);

                        var data = {
                            identifier: 'id',
                            items: pokeArray
                        };
                        let store = new ItemFileWriteStore({ data: data });
                        grid.store = store;
                        grid.render();

                        //let tabla = dom.byId("grid");
                        //let node = domConstruct.create("tr", {
                        //  innerHTML: `<th scope="row">${pokeObjeto.Nombre}</th> <td>${pokeObjeto.Altura}</td> <td>${pokeObjeto.Peso}</td> <td>${pokeObjeto.Tipo}</td>  <td>${pokeObjeto.Batallas}</td>  <td><img alt="" src="${pokeObjeto.Frente}"/></td>`,
                        //});
                        //domConstruct.place(node, tabla);
                    })

        }

        function saveDone() {
            console.log("Done saving.");
        }

        function saveFailed() {
            console.log("Save failed.");
        }

        /*create a new grid:*/
        let grid = new EnhancedGrid({
            id: idgrid,
            store: store,
            plugins: {
                pagination: {
                    position: "bottom",
                    sizeSwitch: false,
                    gotoButton: true,
                    defaultPageSize: 3,
                },
            },
            autoWidth: true,
            autoHeight: true,
            rows: "250px",
            editable: true,
            structure: layout,
            rowSelector: "20px",
        });

        /*append the new grid to the div*/
        grid.placeAt("tabla");

        /*Call startup() to render the grid*/
        grid.startup();

        on(botonRefresh, "mousedown", function(event) {
            if (mouse.isLeft(event)) {
                searchPokemon();

            }
        });
        on(document, "keyup", function(event) {
            if (event.keyCode == 13) {
                var pokemonId = dom.byId("pokeStore").value;
                if (pokemonId != "") {
                    searchPokemon();
                }

            }
        });

    });