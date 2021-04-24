require(['dojo/_base/lang', 'dojox/grid/EnhancedGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom', "dojo/on", "dojo/request", "dojo/dom-construct", "dojo/store/DataStore", "dojox/grid/enhanced/plugins/Pagination", "dojo/store/Memory", "dojo/data/ObjectStore", "dojo/dom-attr", "dojo/mouse", "dojo/domReady!"],
    function(lang, EnhancedGrid, ItemFileWriteStore, dom, on, request, domConstruct, DataStore, Pagination, Memory, ObjectStore, domAttr, mouse) {
        const url = "https://pokeapi.co/api/v2/pokemon/";
        let idgrid = "grid";
        let pokeArray = [];
        let botonRefresh = dom.byId("botonRefresh");
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

                    return `<img alt="" src="${Frente}" height='100px'/>`;
                }
            }, ]
        ];
        var data = {
            identifier: 'id',
            items: pokeArray
        };
        let store = new ItemFileWriteStore({ data: data });
        /*create a new grid:*/
        var grid = new EnhancedGrid({
            id: 'grid',
            store: store,
            plugins: {
                pagination: {
                    position: "bottom",
                    sizeSwitch: false,
                    gotoButton: true,
                    defaultPageSize: 5,
                },
            },
            autoWidth: true,
            autoHeight: true,
            structure: layout,
            rowSelector: '20px'
        });

        /*append the new grid to the div*/
        grid.placeAt("tabla");

        /*Call startup() to render the grid*/
        grid.startup();

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
                            id: pokeArray.length,
                            Nombre: res.name,
                            Tipo: res.types[0].type.name,
                            Altura: Math.round(res.height * 10),
                            Peso: Math.round(res.weight / 10),
                            Batallas: res.game_indices.length,
                            Frente: res.sprites.front_default,
                            Espalda: res.sprites.back_default,
                        };
                        pokeArray.push(pokeObjeto);
                        refreshGrid(pokeArray)


                        //let tabla = dom.byId("grid");
                        //let node = domConstruct.create("tr", {
                        //  innerHTML: `<th scope="row">${pokeObjeto.Nombre}</th> <td>${pokeObjeto.Altura}</td> <td>${pokeObjeto.Peso}</td> <td>${pokeObjeto.Tipo}</td>  <td>${pokeObjeto.Batallas}</td>  <td><img alt="" src="${pokeObjeto.Frente}"/></td>`,
                        //});
                        //domConstruct.place(node, tabla);
                    })

        }

        function refreshGrid(pokeArray) {
            var data = {
                identifier: 'id',
                items: pokeArray
            };
            let store = new ItemFileWriteStore({ data: data });
            grid.store = store;
            grid.render();
        }

        function saveDone() {
            console.log("Done saving.");
        }

        function saveFailed() {
            console.log("Save failed.");
        }



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