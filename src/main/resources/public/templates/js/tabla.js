require(['dojo/_base/lang', 'dojox/grid/EnhancedGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom', "dojo/Deferred", "dojo/request", "dojox/grid/enhanced/plugins/Pagination", 'dojo/domReady!'],
    function(lang, EnhancedGrid, ItemFileWriteStore, dom, Deferred, request, Pagination) {
        const url = "https://pokeapi.co/api/v2/pokemon/";
        /*set up data store*/
        var data = {
            identifier: "id",
            items: []
        };
        let index = 0;
        let pokenombres = [];
        /*set up layout*/
        let layout = [
            [{
                'name': 'Id',
                'field': 'id'
            }, {
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
        var store = new ItemFileWriteStore({ data: data });

        /*create a new grid*/
        var grid = new EnhancedGrid({
            id: 'grid2',
            store: store,
            plugins: {
                pagination: {
                    position: "bottom",
                    sizeSwitch: false,
                    gotoButton: true,
                    defaultPageSize: 10,
                },
            },
            autoWidth: true,
            autoHeight: true,
            structure: layout,
            rowSelector: '50px'
        });

        /*append the new grid to the div*/
        grid.placeAt("gridDiv");

        /*Call startup() to render the grid*/
        grid.startup();

        let pokeArray = [];
        let maxPokemon = 60;
        request.get(`https://pokeapi.co/api/v2/pokemon/?limit=-1`, {
                handleAs: "json"
            })
            .then(
                function(response) {

                    listaPokemon = response.results;

                    //listaPokemon = response.results;
                    let cont = 1;
                    const nombres = listaPokemon.map((pokemon) => pokemon.name).forEach(element => {
                        pokenombres.push({
                            id: cont,
                            name: element,
                            value: element
                        });
                        cont++

                    })
                    pokenombres.sort((a, b) => (a.id > b.id) ? 1 : -1)

                    for (let i = 0; i < 10; i++) {
                        agregarPokemons(index + 6)

                    }



                })

        function agregarPokemons(fin) {
            for (index; index < fin; index++) {
                const element = pokenombres[index];
                request.get(url + element.name, {
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
                        })

            };
        }









    })