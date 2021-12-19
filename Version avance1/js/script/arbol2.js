/**
 * Titulo: Proyecto, algoritmo "Códigos Huffman"
 * Descripción: implementacion del algoritmo de Huffman en web
 * Fecha: 21-dec-2021
 * Versión: 3
*/

/********Paleta de colores********* */
const STRATOS = "#001B48";
const REGAL_BLUE = "#02457A";
const BONDI_BLUE = "#018ABE";
const MORNING_GLORY = "#97CADB";
const BOTTICELLI = "#D6E8EE";
/************************************* */

/*************Estructuras************************ */
//clase Nodo
class Nodo {
    constructor(count, symb, [a, b], digit) {
        this.digit = digit; //digito 1 o 0
        this.count = count; //frecuencia del caracter
        this.symb = symb; //simbolo
        this.children = [a, b]; //hijos
    }
}
/************************************************ */
/********Variables globales**************** */

var cy1; //arbol 1
var cy2;//arbol 2
var cy;//arbol 3
var arbol; //arbol
var msg; //mensaje
var nodos = []; //arreglo de nodos
var links = []; //arreglo de uniones de los nodos
var hojas = []; //arreglo de hojas
var codigos = []; //codigos obtenidos
var config; //configuracion de los arboles
var count; //tamaño
var contadorDeco = 0; //contador global para la decodificaciones
var msgCodi = ""; //mensaje codificado
/************************************************ */
/************************funciones*************** */
/**
 * Función: buildCount(1)
 * Descripcion: obtiene las frecuencias de un mensajes y crea un arreglo de objetos
 * Recibe: 
 *  - mensaje
 * Regresa:
 *  - arreglo de objetos: caracter y su frecuencia
 * Errores: ninguno
*/
buildCount = (msg) => {
    const obj = {}; //arreglo de objetos
    //para cada caracter, separarlo y lo obtenido, sacar el caracter y aumentar por cada aparicion
    msg.split('').forEach(e => {
        if (!obj[e]) obj[e] = 0;
        obj[e] += 1; //aumenta uno
    });
    return obj;
}
/**
 * Función: animationbuildTree(1)
 * Descripcion: construye el arbol de manera animada
 * Recibe: 
 *  - frecuencias
 * Regresa:
 *  - arbol construido
 * Errores: ninguno
*/
animationbuildTree = count => {
    //vacia la tabla
    $("#cabeceraTabla").empty();
    //crea la cabecera de la tabla con animaciones
    $("#cabeceraTabla").append(`<tr>
        <th class="animate__animated animate__fadeIn" scope="col">Caracter</th>
        <th class="animate__animated animate__fadeIn" scope="col">Frecuencia</th>
    </tr>`);
    //vacia el cuerpo de la tabla
    $("#cuerpoTabla").empty();
    //crea una cola de prioridad, de menor a mayor frecunecia
    const pq = new PriorityQueue({
        comparator: function (a, b) {
            return a.count - b.count;
        }
    });
    //para cada objeto dentro de las frencuencias, obtener ambos elementos
    Object.entries(count).forEach(([k, v]) => {
        //insertar en la cola un nuevo nodo, con las frecuencias obtenidas, el simbolo convertido en ascii, dos hijos nulos y si es 1 o 0
        pq.queue(new Nodo(v, k.charCodeAt(0), [null, null], null));
        //se agrega al arbol, el nodo con el caracter
        cy1.add([{
            group: "nodes",
            "data": {
                "id": k.charCodeAt(0), //su id, será su ascii
                "name": k//el nombre con el que aparecerá será su simbolo
            }
        }]);
        //mantiene la propiedad de arbol binario
        cy1.layout({
            name: 'dagre'
        }).run();
        //se agrega a la tabla su frecuenica y su caracter
        $("#cuerpoTabla").append(`<tr>
        <td class="animate__animated animate__fadeIn">${k}</td>
        <td class="animate__animated animate__pulse">${v}</td>
        </tr>`);
    });
    //se borra el nodo auxiliar, ya que con este, permite la creacion del arbol
    cy1.remove(cy1.$('#01'));
    var id = 0;
    //algoritmo de huffman
    var loop = () => {
        //extrae el minimo de la cola de prioridad
        const a = pq.dequeue();
        //si su tamaño es 0, retorna el minimo obtenido
        if (pq.length == 0)
            return a;
        //extrae el segundo minimo
        const b = pq.dequeue();
        //le asigna sus digitos a cada uno, 0 si es izquierda, 1 si es derecha
        a.digit = 0;
        b.digit = 1;
        //obtiene la suma de sus frecuencias
        var value = a.count + b.count;
        //inserta un nuevo nodo a la cola, con la suma de las frecuencias, un simbolo a+"contador" (que será su id en el arbol), cada caracter obtienido será sus hijos y el nuevo nodo no tiene digito
        pq.queue(new Nodo(value, 'a' + id, [a, b], null)); 
        //agrega este nodo creado y crea sus conexiones
        cy1.add([{
                group: "nodes",
                "data": {
                    "id": 'a' + id,
                    "name": value
                }
            },
            {
                group: "edges",
                data: {
                    "source": 'a' + id,
                    "target": a.symb
                }
            },
            {
                group: "edges",
                data: {
                    "source": 'a' + id,
                    "target": b.symb
                }
            }
        ]);
        //mantiene la propiedad de arbol binario
        cy1.layout({
            name: 'dagre'
        }).run();
        //redimensiona y acomoda el arbol
        cy1.resize();
        cy1.fit();
        id++;
        //vuelve a ejecutar el loop, con un delay
        setTimeout(loop, 1000);
    }
    //primer delay
    setTimeout(loop, 3050);

}
/**
 * Función: buildTree(1)
 * Descripcion: construye el arbol sin animacion, ahora con los digitos en cada union
 * Recibe: 
 *  - frecuencias
 * Regresa:
 *  - arbol construido
 * Errores: ninguno
*/
buildTree = count => {
    //crea una cola de prioridad, de menor a mayor frecunecia
    const pq = new PriorityQueue({
        comparator: function (a, b) {
            return a.count - b.count;
        }
    });
    //insertar en la cola un nuevo nodo, con las frecuencias obtenidas, el simbolo convertido en ascii, dos hijos nulos y si es 1 o 0
    Object.entries(count).forEach(([k, v]) => {
        pq.queue(new Nodo(v, k.charCodeAt(0), [null, null], null))
    });

    //algoritmo de huffman
    var id = 0;
    while (pq.length) {
        //extrae el minimo de la cola de prioridad
        const a = pq.dequeue();
        //si su tamaño es 0, retorna el minimo obtenido
        if (pq.length == 0)
            return a;
        //extrae el segundo minimo
        const b = pq.dequeue();
        //le asigna sus digitos a cada uno, 0 si es izquierda, 1 si es derecha
        a.digit = 0;
        b.digit = 1;
        //obtiene la suma de sus frecuencias
        var value = a.count + b.count;
        //inserta un nuevo nodo a la cola, con la suma de las frecuencias, un simbolo a+"contador" (que será su id en el arbol), cada caracter obtienido será sus hijos y el nuevo nodo no tiene digito
        pq.queue(new Nodo(value, 'r' + id, [a, b], null));
        id++;//aumenta el nuevo id
    }
}

function dataSet(root, elements, edges, leafs) {
    if (root.children[0] == null) {
        elements.push({
            "data": {
                "id": root.symb,
                "name": String.fromCharCode(root.symb)
            }
        });
    } else
        elements.push({
            "data": {
                "id": root.symb,
                "name": root.count
            }
        });
    if (root.children[0] != null) {
        edges.push({
            "data": {
                "source": root.symb,
                "target": root.children[0].symb,
                "label": root.children[0].digit
            }
        });
        dataSet(root.children[0], elements, edges, leafs);
    }

    if (root.children[1] != null) {
        edges.push({
            "data": {
                "source": root.symb,
                "target": root.children[1].symb,
                "label": root.children[1].digit
            }
        });
        dataSet(root.children[1], elements, edges, leafs);
    }

    if (root.children[0] == null && root.children[1] == null) {
        leafs.push(root.symb);
    }
}

colorear = (simbolo) => {
    var aStar = cy2.elements().aStar({
        root: arbol.symb,
        goal: "#" + simbolo
    });

    aStar.path.select();
    console.log(aStar.distance);
    

    console.log(aStar.path.length);
    var i = 0;
    var codigo = '';
    for (i = 0; i < aStar.path.length; i++) {
        if (aStar.path[i]._private.data.label != undefined)
            codigo = codigo + aStar.path[i]._private.data.label;
        aStar.path[i].addClass('highlighted');
    }

    $("#cuerpoTabla2").append(`<tr>
    <td class="animate__animated animate__fadeIn">${String.fromCharCode(simbolo)}</td>
    <td class="animate__animated animate__pulse">${simbolo}</td>
    <td class="animate__animated animate__pulse">${codigo}</td>
    </tr>`);

    console.log(codigo);

    codigos[String.fromCharCode(simbolo)] = codigo;

    setTimeout(() => {
        for (i = 0; i < aStar.path.length; i++)
            aStar.path[i].removeClass('highlighted');
    }, 600);
};


function task(i) {
    setTimeout(function () {
        colorear(hojas[i]);
        if (i == hojas.length - 1)
            $("#CodiM").show();
    }, 3000 * i);
    return true;
}

function colorearTodas() {
    var i = 0;
    $("#cabeceraTabla2").empty();
    $("#cabeceraTabla2").append(`<tr>
        <th class="animate__animated animate__fadeIn" scope="col">Caracter</th>
        <th class="animate__animated animate__fadeIn" scope="col"># ASCII</th>
        <th class="animate__animated animate__fadeIn" scope="col">Código</th>
    </tr>`);
    $("#cuerpoTabla2").empty();
    hojas.forEach((c) => {

        let miPrimeraPromise = new Promise((resolve, reject) => {
            if (task(i) == true)
                resolve(true);
            else
                reject(error);
        });

        miPrimeraPromise.then(function (value) {
            if (value == true) cy2 = cytoscape(config);
        }, function (error) {
            console.log("No puelo");
        });

        i++;
    });

}

colorearDeco = (simbolo) => {
    var aStar = cy.elements().aStar({
        root: arbol.symb,
        goal: "#" + simbolo
    });

    aStar.path.select();
    console.log(aStar.distance);

    console.log(aStar.path.length);

    var i;
    var codigo = '';
    for (i = 0; i < aStar.path.length; i++) {
        if (aStar.path[i]._private.data.label != undefined)
            codigo = codigo + aStar.path[i]._private.data.label;
        aStar.path[i].addClass('highlighted');
    }
    var heading = document.getElementById("c" + contadorDeco);
    var animateHeading = KUTE.to(
        heading, {
            text: String.fromCharCode(simbolo)
        }, {
            duration: 1600
        }
    );
    animateHeading.start();
    contadorDeco++;

    setTimeout(() => {
        for (i = 0; i < aStar.path.length; i++)
            aStar.path[i].removeClass('highlighted');
    }, 600);
};


function taskDeco(i) {
    setTimeout(function () {
        colorearDeco(msg[i].charCodeAt(0));
    }, 3000 * i);
    return true;
}

function colorearTodasDeco() {
    for (var i = 0; i < msg.length; i++) {

        let miPrimeraPromise = new Promise((resolve, reject) => {
            if (taskDeco(i) == true)
                resolve(true);
            else
                reject(error);
        });

        miPrimeraPromise.then(function (value) {
            if (value == true) cy = cytoscape(config);
        }, function (error) {
            console.log("No puelo");
        });
    }
}

/********************************************************** */
$("#Iniciar").click(function () {
    msg = $('#cadena').val();

    if (msg.length > 1) {
        $("#Iniciar").remove();
        var typew = document.getElementById('typew');

        var typewriter = new Typewriter(typew, {
            loop: false,
            delay: 500
        });

        typewriter.typeString(msg).start();

        cy1 = cytoscape({
            container: document.getElementById('cy'),

            boxSelectionEnabled: false,
            autounselectify: true,


            style: cytoscape.stylesheet()
                .selector('node')
                .style({
                    'content': 'data(name)',
                    'background-color': BONDI_BLUE
                })
                .selector('edge')
                .style({
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    'width': 4,
                    'line-color': BOTTICELLI,
                    'target-arrow-color': BOTTICELLI
                })
                .selector('.highlighted')
                .style({
                    'background-color': REGAL_BLUE,
                    'line-color': REGAL_BLUE,
                    'target-arrow-color': REGAL_BLUE,
                    'transition-property': 'background-color, line-color, target-arrow-color',
                    'transition-duration': '0.5s'
                }),

            elements: {
                nodes: [{
                    data: {
                        id: '01',
                        name: 'inicio'
                    }
                }],

                edges: [{
                    data: {
                        source: '01',
                        target: '01'
                    }
                }]
            },

            layout: {
                name: 'dagre'
            }
        });



        count = buildCount(msg);

        arbol = animationbuildTree(count);
        console.log(buildCount(msg));
        console.log(count);
        $('#Codi').show();
    }
});


$('#Codi').click(() => {
    //eliminar boton
    $("#Codi").remove();
    $("#cy2").empty();
    config = {
        container: document.getElementById('cy2'),

        boxSelectionEnabled: false,
        autounselectify: true,


        style: cytoscape.stylesheet()
            .selector('node')
            .style({
                'content': 'data(name)',
                'background-color': BONDI_BLUE,
            })
            .selector('edge')
            .style({
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'width': 4,
                'line-color': BOTTICELLI,
                'target-arrow-color': BOTTICELLI,
                'label': 'data(label)'
            })
            .selector('.highlighted')
            .style({
                'background-color': REGAL_BLUE,
                'line-color': REGAL_BLUE,
                'target-arrow-color': REGAL_BLUE,
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            }),

        elements: {
            nodes: nodos,

            edges: links
        },

        layout: {
            name: 'dagre'
        }
    };
    arbol = buildTree(count);
    dataSet(arbol, nodos, links, hojas);
    cy2 = cytoscape(config);
    cy2.layout({
        name: 'dagre'
    }).run();
    colorearTodas();

    if (codigos.length == count.length)
        Object.entries(codigos).forEach(([k, v]) =>
            console.log('Char: ' + k + '- Codigo: ' + v)
        );
});

$('#CodiM').click(() => {
    ///  1011011010101001
    //eliminar boton
    $("#CodiM").remove();
    var typew = document.getElementById('typecode');

    for (var i = 0; i < msg.length; i++) {
        //    10101    '10101'
        msgCodi = msgCodi + codigos[msg[i]];
    }

    console.log("Longitud cod bytes: " + (msgCodi.length) / 8);
    console.log("Longitud msg bytes: " + (msg.length) * 8);

    var typewriter = new Typewriter(typew, {
        loop: false,
        delay: 200
    });

    for (var i = 0; i < msg.length; i++) {
        typewriter.pauseFor(1000).typeString(msg[i]).pauseFor(1000).deleteChars(1).typeString('<strong>' + codigos[msg[i]] + '</strong>').start();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mensaje original', 'Codificación'],
            datasets: [{
                label: '# de Bytes',
                data: [(msg.length), (msgCodi.length) / 8],
                backgroundColor: [
                    BONDI_BLUE, //REGAL_BLUE
                    BOTTICELLI //MORNING_GLORY
                ],
                borderColor: [
                    REGAL_BLUE, //STRATOS
                    MORNING_GLORY //BONDI_BLUE
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var porcentaje = 100 - ((msgCodi.length / 8) * 100) / (msg.length);
    document.getElementById("porcentaje").innerHTML = "Porcentaje de compresión: " + porcentaje.toFixed(3) + "%";
    $('#DecoM').show();

});

$('#DecoM').click(() => {
    //eliminar boton
    $("#DecoM").remove();
    $("#cy3").empty();

    //document.getElementById("msgCod").innerHTML = msgCodi;
    config = {
        container: document.getElementById('cy3'),

        boxSelectionEnabled: false,
        autounselectify: true,


        style: cytoscape.stylesheet()
            .selector('node')
            .style({
                'content': 'data(name)',
                'background-color': BONDI_BLUE,
            })
            .selector('edge')
            .style({
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'width': 4,
                'line-color': BOTTICELLI,
                'target-arrow-color': BOTTICELLI,
                'label': 'data(label)'
            })
            .selector('.highlighted')
            .style({
                'background-color': REGAL_BLUE,
                'line-color': REGAL_BLUE,
                'target-arrow-color': REGAL_BLUE,
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            }),

        elements: {
            nodes: nodos,

            edges: links
        },

        layout: {
            name: 'dagre'
        }
    };

    cy = cytoscape(config);
    cy.layout({
        name: 'dagre'
    }).run();


    // imprime toda la cadena del mensaje codificado
    for (var i = 0; i < msg.length; i++) $('#typeDeco').append('<span id=c' + i + '>' + codigos[msg[i]] + '</span>');

    colorearTodasDeco();

    if (codigos.length == count.length)
        Object.entries(codigos).forEach(([k, v]) =>
            console.log('Char: ' + k + '- Codigo: ' + v)
        );
});

window.addEventListener('resize', function () {
    cy1.resize();
    cy1.fit();
    cy2.resize();
    cy2.fit();
    cy.resize();
    cy.fit();
});

/*
$('#DecoM').click(() => {
    //eliminar boton
    $("#DecoM").remove();
    $("#cy3").empty();

    //document.getElementById("msgCod").innerHTML = msgCodi;
    config = {
        container: document.getElementById('cy3'),

        boxSelectionEnabled: false,
        autounselectify: true,


        style: cytoscape.stylesheet()
            .selector('node')
            .style({
                'content': 'data(name)',
                'background-color': BONDI_BLUE,
            })
            .selector('edge')
            .style({
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'width': 4,
                'line-color': BOTTICELLI,
                'target-arrow-color': BOTTICELLI,
                'label': 'data(label)'
            })
            .selector('.highlighted')
            .style({
                'background-color': REGAL_BLUE,
                'line-color': REGAL_BLUE,
                'target-arrow-color': REGAL_BLUE,
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            }),

        elements: {
            nodes: nodos,

            edges: links
        },

        layout: {
            name: 'dagre'
        }
    };

    cy = cytoscape(config);
    cy.layout({
        name: 'dagre'
    }).run();

    var typew = document.getElementById('typeDeco');
    var typewriter = new Typewriter(typew, {
        loop: false,
        delay: 200
    });

    for (var i = 0; i < msg.length; i++) {
        typewriter.pauseFor(500).typeString(codigos[msg[i]]).pauseFor(500).deleteChars(codigos[msg[i]].length).typeString('<strong>' + msg[i] + '</strong>').start();
    }
    colorearTodasDeco();

    if (codigos.length == count.length)
        Object.entries(codigos).forEach(([k, v]) =>
            console.log('Char: ' + k + '- Codigo: ' + v)
        );
});

*/