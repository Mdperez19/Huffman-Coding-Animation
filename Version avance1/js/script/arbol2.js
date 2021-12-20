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
/**
 * Función: dataSet(4)
 * Descripcion: crea los elementos que contendrá el arbol de huffman
 * Recibe: 
 *  - raiz
 *  - elementos
 *  - uniones entre nodos
 *  - hojas
 * Regresa:
 *  - void
 * Errores: ninguno
*/
function dataSet(root, elements, edges, leafs) {
    //si es hoja
    if (root.children[0] == null) {
        elements.push({
            "data": {
                "id": root.symb, //su id, será su simbolo en ascii
                "name": String.fromCharCode(root.symb) //se mostrará en el nodo el simbolo como caracter
            }
        });
    } else
        elements.push({
            "data": {
                "id": root.symb,//su id, será su simbolo en ascii
                "name": root.count//se mostrará en el nodo, la frecuencia
            }
        });
    if (root.children[0] != null) {
        edges.push({
            "data": {
                "source": root.symb, //estará conectado del simbolo en el que esta
                "target": root.children[0].symb, //con su hijo
                "label": root.children[0].digit //como etiqueta en cada union, será el digito 0 1
            }
        });
        //recursividad cambiando con el hijo de la raiz actual
        dataSet(root.children[0], elements, edges, leafs);
    }
    //hijo derehco
    if (root.children[1] != null) {
        edges.push({
            "data": {
                "source": root.symb,//estará conectado del simbolo en el que esta
                "target": root.children[1].symb,//con su hijo
                "label": root.children[1].digit//como etiqueta en cada union, será el digito 0 1
            }
        });
        //recursividad cambiando con el hijo de la raiz actual
        dataSet(root.children[1], elements, edges, leafs);
    }
    // si ambos hijos del nodo actual son nulos, significa que son hojas
    if (root.children[0] == null && root.children[1] == null) {
        leafs.push(root.symb);//agregar al arreglo de hojas
    }
}
/**
 * Función: colorear(1)
 * Descripcion: ilumina los caminos recorridos
 * Recibe: 
 *  - simbolo
 * Regresa:
 *  - void
 * Errores: ninguno
*/
colorear = (simbolo) => {
    //utiliza el algoritmo A* para iluminar cada camino, desde la raiz, hasta la hoja donde se encuentra ese simbolo
    var aStar = cy2.elements().aStar({
        root: arbol.symb, //raiz
        goal: "#" + simbolo //nodo hoja
    });

    //se selecciona el path establecido
    aStar.path.select();
    //imprimimos la distancia
    console.log(aStar.distance);
    //imprimimos la longitud
    console.log(aStar.path.length);
    var i = 0;
    var codigo = '';
    //visita cada nodo dentro del camino de aStar
    for (i = 0; i < aStar.path.length; i++) {
        //si la etiqueta es diferente a vacia, es decir, tiene 0 o 1
        if (aStar.path[i]._private.data.label != undefined)
            codigo = codigo + aStar.path[i]._private.data.label;//concatenar al string codigo
        aStar.path[i].addClass('highlighted');//cambia el css de cada nodo o union visitado
    }

    //agrega a la tabla el nodo encontrado, su simbolo, su ascii y su codigo generado
    $("#cuerpoTabla2").append(`<tr>
    <td class="animate__animated animate__fadeIn">${String.fromCharCode(simbolo)}</td>
    <td class="animate__animated animate__pulse">${simbolo}</td>
    <td class="animate__animated animate__pulse">${codigo}</td>
    </tr>`);
    //impirme el codigo
    console.log(codigo);

    //guada en el arreglo de codigos, el codigo, donde su posicion, es su caracter
    codigos[String.fromCharCode(simbolo)] = codigo;

    //borra lo iluminado, para pasar al siguiente caracter
    setTimeout(() => {
        for (i = 0; i < aStar.path.length; i++)
            aStar.path[i].removeClass('highlighted');//remueve la clase que coloreaba
    }, 600);
};

/**
 * Función: cicloColorear(1)
 * Descripcion: funcion que iniciar el ciclo con delay
 * Recibe: 
 *  - posicion
 * Regresa:
 *  - verdadero al finalizar la funcion
 * Errores: ninguno
*/
function cicloColorear(i) {
    //cada 3 segundo, por la posicion
    setTimeout(function () {
        colorear(hojas[i]);//colorea hasta las hojas
        if (i == hojas.length - 1)
            $("#CodiM").show();//si llegó a todas las hojas, entonces aparece el boton de la siguiente seccion
    }, 3000 * i);
    return true;
}
/**
 * Función: colorearTodas(0)
 * Descripcion: colorea cada camino de la raiz hasta las hojas y agrega lo obtenido a la tabla
 * Recibe: 
 *  - void
 * Regresa:
 *  - void
 * Errores: ninguno
*/
function colorearTodas() {
    var i = 0;
    //vacia la tabla
    $("#cabeceraTabla2").empty();
    //agrega a la cabeecera, los titulos de caracter, ascii y su codigo
    $("#cabeceraTabla2").append(`<tr>
        <th class="animate__animated animate__fadeIn" scope="col">Caracter</th>
        <th class="animate__animated animate__fadeIn" scope="col"># ASCII</th>
        <th class="animate__animated animate__fadeIn" scope="col">Código</th>
    </tr>`);
    //vacia el cuerpo de la tabla
    $("#cuerpoTabla2").empty();
    //para cada hoja, hacer lo siguiente
    hojas.forEach((c) => {
        //crea una promesa, para agregar funcion asincrona
        let miPrimeraPromise = new Promise((resolve, reject) => {
            if (cicloColorear(i) == true)//si es verdadera, se cumplio la promesa
                resolve(true);
            else
                reject(error);//cancelar en caso de error
        });

        //despues de que se cumpla la promesa
        miPrimeraPromise.then(function (value) {
            if (value == true) cy2 = cytoscape(config);//si el valor obtenido es verdadero, reiniciar el arbol con la configuración
        }, function (error) {
            //en caso de error, impirmir ese mensaje
            console.log("No puelo");
        });

        i++;//aumentar el caracter a colorear
    });

}
/**
 * Función: colorearDeco(1)
 * Descripcion: ilumina los caminos recorridos y muestra la decodificacion del mensaje
 * Recibe: 
 *  - simbolo
 * Regresa:
 *  - void
 * Errores: ninguno
*/
colorearDeco = (simbolo) => {
     //utiliza el algoritmo A* para iluminar cada camino, desde la raiz, hasta la hoja donde se encuentra ese simbolo
    var aStar = cy.elements().aStar({
        root: arbol.symb,//raiz
        goal: "#" + simbolo//nodo hoja
    });
    //se selecciona el path establecido
    aStar.path.select();
    //imprimimos la distancia
    console.log(aStar.distance);
    //imprimimos la longitud
    console.log(aStar.path.length);

    var i;
    var codigo = '';
    //visita cada nodo dentro del camino de aStar
    for (i = 0; i < aStar.path.length; i++) {
         //si la etiqueta es diferente a vacia, es decir, tiene 0 o 1
        if (aStar.path[i]._private.data.label != undefined)
            codigo = codigo + aStar.path[i]._private.data.label;//concatenar al string codigo
        aStar.path[i].addClass('highlighted');//cambia el css de cada nodo o union visitado
    }
    var msgDecodificado = document.getElementById("c" + contadorDeco);//obtiene el id por el contador y un c concatenado
    //se crea la animacion del mensaje siendo decodificado
    var animarMsgDecodificado = KUTE.to(
        msgDecodificado, {
            text: String.fromCharCode(simbolo)//se cambia el texto, por el caracter de dicho codigo
        }, {
            duration: 1600//una udarcion de 1.6s
        }
    );
    //se inicia la animacion
    animarMsgDecodificado.start();
    //aumenta para el siguiente caracter del mensaje original
    contadorDeco++;
    //borra lo iluminado, para pasar al siguiente caracter    
    setTimeout(() => {
        for (i = 0; i < aStar.path.length; i++)
            aStar.path[i].removeClass('highlighted');//remueve la clase que coloreaba
    }, 600);
};

/**
 * Función: cicloColorearDeco(1)
 * Descripcion: funcion que iniciar el ciclo con delay
 * Recibe: 
 *  - posicion
 * Regresa:
 *  - verdadero al finalizar la funcion
 * Errores: ninguno
*/
function cicloColorearDeco(i) {
    //cada 3 segundo, por la posicion
    setTimeout(function () {
        colorearDeco(msg[i].charCodeAt(0));//colorea cada caracter del mensaje
    }, 3000 * i);
    return true;
}
/**
 * Función: colorearTodas(0)
 * Descripcion: colorea cada camino de la raiz hasta las hojas y agrega lo obtenido a la tabla
 * Recibe: 
 *  - void
 * Regresa:
 *  - void
 * Errores: ninguno
*/
function colorearTodasDeco() {
    //para todos los caracteres del mensaje original
    for (var i = 0; i < msg.length; i++) {
        //crea una promesa, para agregar funcion asincrona
        let miPrimeraPromise = new Promise((resolve, reject) => {
            if (cicloColorearDeco(i) == true)
                resolve(true);//si es verdadera, se cumplio la promesa
            else
                reject(error);//cancelar en caso de error
        });
        //despues de que se cumpla la promesa
        miPrimeraPromise.then(function (value) {
            if (value == true) cy = cytoscape(config);//si el valor obtenido es verdadero, reiniciar el arbol con la configuración
        }, function (error) {
            //en caso de error, impirmir ese mensaje
            console.log("No puelo");
        });
    }
}

/********************************************************** */
//evento al dar click en Iniciar
$("#Iniciar").click(function () {
    //obtiene el mensaje
    msg = $('#cadena').val();
    //si el mensaje no es mas grande que 1 caracter, no continuar
    if (msg.length > 1) {
        //quita el boton seleccionado
        $("#Iniciar").remove();
        //adquiere el id donde se escribirá el mensaje original
        var typew = document.getElementById('typew');
        //se inicializa la animación
        var typewriter = new Typewriter(typew, {
            loop: false,//solo hacerlo una vez
            delay: 500 //delay de .5s
        });

        //se inicia la animacion de la escritura del mensaje original
        typewriter.typeString(msg).start();

        //se construye el arbol animado
        cy1 = cytoscape({
            //establece en que id se contruye el arbol
            container: document.getElementById('cy'),

            boxSelectionEnabled: false,
            autounselectify: true,//se deja la seleccion de nodos

            //se le asigna el estilo del grafico del arbol
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
            //se agrega un nodo temporal por default (se elimina en seguida)
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
            //se le asigna la propiedad de arbol binario
            layout: {
                name: 'dagre'
            }
        });
        //se obtiene las frecuencias del arbol
        count = buildCount(msg);
        //se construye el arbol con esas frecuencias
        arbol = animationbuildTree(count);
        //se imprime los resultados
        console.log(buildCount(msg));
        console.log(count);
        //aparece el boton de la siguiente sección
        $('#Codi').show();
    }
});

//evento al dar click en el boton Codi
$('#Codi').click(() => {
    //eliminar boton
    $("#Codi").remove();
    //vacia el div
    $("#cy2").empty();
    //establece las configuraciones del arbol de codificaciones
    config = {
        //obtiene el id donde se contruye el arbol
        container: document.getElementById('cy2'),

        boxSelectionEnabled: false,
        autounselectify: true,//se deja habilitado la seleccion

        //se le asigna los estilos al grafico del arbol
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
        //se agrega los nodos y las uniones obtenidas en la construcción del arbol
        elements: {
            nodes: nodos,

            edges: links
        },
        //se establece la propiedad de arbol binario
        layout: {
            name: 'dagre'
        }
    };
    //contruye el arbol con las frecuencias
    arbol = buildTree(count);
    //establece los elementos de arbol
    dataSet(arbol, nodos, links, hojas);
    //construye el arbol con la configuración establecida
    cy2 = cytoscape(config);
    //se establece la propiedad de arbol binario
    cy2.layout({
        name: 'dagre'
    }).run();
    //colorea todos los caminos para cada caracter
    colorearTodas();
    //para la depuracipon, se impirme el caracter y su codigo en la consola
    if (codigos.length == count.length)
        Object.entries(codigos).forEach(([k, v]) =>
            console.log('Char: ' + k + '- Codigo: ' + v)
        );
});
//evento al dar click en CodiM
$('#CodiM').click(() => {
    ///  1011011010101001
    //eliminar boton
    $("#CodiM").remove();
    //obitnee el id donde aparece la animacion de escritura
    var typew = document.getElementById('typecode');
    //concatena el mensaje codificado con cada codigo obtenido
    for (var i = 0; i < msg.length; i++) {
        //    10101    '10101'
        msgCodi = msgCodi + codigos[msg[i]];
    }
    //para depuracion, imprime los bytes de la codificacion y el mensaje original
    console.log("Longitud cod bytes: " + (msgCodi.length) / 8);
    console.log("Longitud msg bytes: " + (msg.length) * 8);

    //inicializa las configuraciones de la animacion
    var typewriter = new Typewriter(typew, {
        loop: false,//solo se hace una vez
        delay: 200 //delay de .2s
    });

    //escribe el caracter, lo borra y escribe su codigo
    for (var i = 0; i < msg.length; i++) {
        typewriter.pauseFor(1000).typeString(msg[i]).pauseFor(1000).deleteChars(1).typeString('<strong>' + codigos[msg[i]] + '</strong>').start();
    }
    //obtiene el id donde se inserta la grafica de barras
    const ctx = document.getElementById('myChart').getContext('2d');
    //se establece las configuraciones para la grafica
    const myChart = new Chart(ctx, {
        type: 'bar',//sera de tipo barra
        data: {
            labels: ['Mensaje original', 'Codificación'],//sus etiquetas
            datasets: [{
                label: '# de Bytes',
                data: [(msg.length), (msgCodi.length) / 8],//el dto será la diferencia de tamaños de la codificacion
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
    //obtiene el porcentaje de compresion
    var porcentaje = 100 - ((msgCodi.length / 8) * 100) / (msg.length);
    //imprime debajo del grafico este resutlado
    document.getElementById("porcentaje").innerHTML = "Porcentaje de compresión: " + porcentaje.toFixed(3) + "%";
    //muestra el boton de la siguiente seccion
    $('#DecoM').show();

});
//evento al dar click en DecoM
$('#DecoM').click(() => {
    //eliminar boton
    $("#DecoM").remove();
    //vacia el div con el arbol
    $("#cy3").empty();

    //establece la configuración para el arbol
    config = {
        //obtiene el id donde aparecerá el arbol
        container: document.getElementById('cy3'),

        boxSelectionEnabled: false,
        autounselectify: true, //se habilita la seleccion

        //se le da los estilos al arbol
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
        //se agrega los nodos y las uniones con los elementos obtenidos en la contrucción
        elements: {
            nodes: nodos,

            edges: links
        },
        //propiedad de arbol binario
        layout: {
            name: 'dagre'
        }
    };
    //contruye el arbol con la configuracion establecida
    cy = cytoscape(config);
    //mantiene la propiedad de arbol binario
    cy.layout({
        name: 'dagre'
    }).run();


    // imprime toda la cadena del mensaje codificado
    for (var i = 0; i < msg.length; i++) $('#typeDeco').append('<span id=c' + i + '>' + codigos[msg[i]] + '</span>');

    //colorea cada caracter del mensaje original
    colorearTodasDeco();
    //para depruacion, imprime caracter y codigo en consola
    if (codigos.length == count.length)
        Object.entries(codigos).forEach(([k, v]) =>
            console.log('Char: ' + k + '- Codigo: ' + v)
        );
});
//arboles responsivos
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