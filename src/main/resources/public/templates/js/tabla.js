require(['dojo/_base/lang', 'dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom', "dojo/Deferred", "dojo/request", 'dojo/domReady!'],
    function(lang, DataGrid, ItemFileWriteStore, dom, Deferred, request) {
        const url = "https://pokeapi.co/api/v2/pokemon/";
        /*set up data store*/
        var data = {
            identifier: "id",
            items: []
        };
        var rows = 60;

        var deferred = new Deferred();
        let pokenombres = [];
        request.get(`https://pokeapi.co/api/v2/pokemon/?limit=-1`, {
                handleAs: "json"
            })
            .then(
                function(response) {

                    listaPokemon = response.results;

                    //listaPokemon = response.results;
                    let cont = 1;
                    const nombres = listaPokemon.map((pokemon) => pokemon.name).forEach(element => {
                        request.get(url + element, {
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
                                    items.push(pokeObjeto);
                                });
                    })
                })

        var store = new ItemFileWriteStore({ data: data });

        /*set up layout*/
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
        /*create a new grid*/
        var grid = new DataGrid({
            id: 'grid',
            store: store,
            structure: layout,
            rowSelector: '20px'
        });

        /*append the new grid to the div*/
        grid.placeAt("gridDiv");

        /*Call startup() to render the grid*/
        grid.startup();
    })