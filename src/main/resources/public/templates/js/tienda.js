let carrito = [];
let total = 0;
define(['dojo/dom', 'dojo/dom-construct', "dojo/on", "dojo/mouse", "dojo/query", "dojo/store/Memory", "dijit/Dialog", "dojo/domReady!"], function(dom, domConstruct, on, query, Memory, Dialog) {
    var node = domConstruct.toDom(`<div class="row">
    <div class="col-7" data-dojo-type="dijit/layout/TabContainer" data-dojo-props="region:'center'" style=" width: 100%;">
        <div class="container" data-dojo-type="dijit/layout/ContentPane" title="Remeras">
            <div class="row"><br/>
                <br/>
            </div>
            <div class="row">
                <div class="col-1">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div id="izquierda" class="triangulo izquierda" style="position: absolute;  ">
                        <div>

                        </div>
                    </div>

                </div>
                <div class="col-10">
                    <main id="items" class="col-sm-12 row"></main>

                </div>
                <div class="col-auto">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div id="derecha" class="triangulo derecha" style="position: absolute; left: 100%;">
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div data-dojo-type="dijit/layout/ContentPane" title="tab #2">tab pane #2</div>
        <div data-dojo-type="dijit/layout/ContentPane" title="tab #3">tab pane #3</div>
    </div>

    <div class="col-5">
        <!-- Carrito -->
        <aside class="col-sm-9">
            <h2 style="text-align: center; background-color: rgba(247, 247, 247, 0.432);">Carrito</h2>
            <!-- Elementos del carrito -->
            <ul id="carrito" class="list-group"></ul>
            <hr>
            <!-- Precio total -->
            <p class="text-left" style="background-color: aliceblue;">Total: <span id="total"></span>&dollar;</p>
            <button id="boton-vaciar" class="btn btn-danger">Vaciar</button>
            <button data-dojo-type="dijit/form/Button" type="button" onclick="myDialog.show();">Comprar carrito</button>
            </button>
        </aside>
    </div>
</div>`);
    domConstruct.place(node, "tiendaContainer");

    const baseDeDatos = [{
            id: 1,
            nombre: 'Remera pokebola',
            precio: 400,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbUKn1NyuAazRENDXEI5_BAJq4VoiLHPK_ls-RGlwvUAhUDRYWWJRYXxTZQ8jOiQONoxOyhg&usqp=CAc'
        },
        {
            id: 2,
            nombre: 'Remera pikachu',
            precio: 530,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_8T6q8_1SJACHkjFVCk7U4h4sRsSWJz8XR4nyVJAOx3rkv9oJTq2619_46K0yUu2UTF11CE&usqp=CAc'
        },
        {
            id: 3,
            nombre: 'Ash & pikachu',
            precio: 210,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeA-uGJicISLdSDrLKFZDmoPh0B_03ZkB43VC1sDjUXTCG51N_3v2uy7IEtYiGH77nel1ojkE&usqp=CAc'
        },
        {
            id: 4,
            nombre: 'Black & red',
            precio: 550,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXwevZcaRWUkhttyQJkOMlPdh70FvzD2kKUzdtJ9xggYpSEvTreDyr7-BN_cFQvoegT0v4QDSm&usqp=CAc'
        },

        {
            id: 5,
            nombre: 'Remera charmander',
            precio: 320,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpTqIrXzaOk-owfCq0pt-zx1kBOV9XU5bHTJa2vQJg5eB51IwkYCDNCTrBeREXjzGkOVG8V4&usqp=CAc'
        },

        {
            id: 6,
            nombre: 'Pokemox X-men',
            precio: 120,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwu1lE3FmLQTRsmZ0_rslCCT-vuu7bG5-2gYybDcOdF0ZyGenBLZmPnrUBNr_qijAuZZFlNDe5&usqp=CAc'
        }

    ];

    const DOMitems = dom.byId("items");
    const DOMcarrito = dom.byId('carrito');
    const DOMtotal = dom.byId('total');
    const DOMbotonVaciar = dom.byId('boton-vaciar');
    const DOMbotonPagar = dom.byId('boton-pagar');

    /**
     * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
     */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = domConstruct.create('div');
            miNodo.classList.add('card', 'col-sm-6');
            // Body
            const miNodoCardBody = domConstruct.create('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = domConstruct.create('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = domConstruct.create('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = domConstruct.create('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info.precio + '$';
            // Boton 
            const miNodoBoton = domConstruct.create('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
     * Evento para añadir un producto al carrito de la compra
     */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
            // Calculo el total
        calcularTotal();
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    /**
     * Dibuja todos los productos guardados en el carrito
     */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-left', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-2');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            on(miBoton, "mousedown", function(event) {
                    borrarItemCarrito(event);
                })
                // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
    }

    /**
     * Evento para borrar un elemento del carrito
     */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();

        calcularTotal();
    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        carrito.forEach((item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });

        DOMtotal.textContent = total.toFixed(2);
    }

    /**
     * Vacia el carrito y vuelve a dibujarlo
     */
    function vaciarCarrito() {

        carrito = [];
        renderizarCarrito();
        calcularTotal();
    }

    function pagarCarrito() {
        console.log(carrito)

        vaciarCarrito();
    }
    on(DOMbotonVaciar, "mousedown", function(event) {
        vaciarCarrito();
    })

    renderizarProductos();

})