const STRATOS = "#001B48";
const REGAL_BLUE = "#02457A";
const BONDI_BLUE = "#018ABE";
const MORNING_GLORY = "#97CADB";
const BOTTICELLI = "#D6E8EE";

/*************Estructuras************************ */
class Nodo {
    constructor(count, symb, [a, b], digit) {
        this.digit = digit;
        this.count = count;
        this.symb = symb;
        this.children = [a, b];
    }
}
/************************************************ */
/********Variables globales**************** */
var cy;
var arbol
var msg;
var nodos = [];
var links = [];
var hojas = [];
var codigos = [];
var config;
var count;
/************************************************ */
/************************funciones*************** */
buildCount = (msg) => {
    const obj = {};
    msg.split('').forEach(e => {
        if (!obj[e]) obj[e] = 0;
        obj[e] += 1;
    });
    return obj;
}

animationbuildTree = count => {
    $("#cabeceraTabla").empty();
    $("#cabeceraTabla").append(`<tr>
        <th class="animate__animated animate__fadeIn" scope="col">Caracter</th>
        <th class="animate__animated animate__fadeIn" scope="col">Frecuencia</th>
    </tr>`);
    $("#cuerpoTabla").empty();
    const pq = new PriorityQueue({
        comparator: function (a, b) {
            return a.count - b.count;
        }
    });

    Object.entries(count).forEach(([k, v]) => {
        pq.queue(new Nodo(v, k.charCodeAt(0), [null, null], null));
        cy.add([{
            group: "nodes",
            "data": {
                "id": k.charCodeAt(0),
                "name": k
            }
        }]);
        cy.layout({
            name: 'dagre'
        }).run();
        $("#cuerpoTabla").append(`<tr>
        <td class="animate__animated animate__fadeIn">${k}</td>
        <td class="animate__animated animate__pulse">${v}</td>
        </tr>`);
    });
    cy.remove(cy.$('#01'));
    /* var size = pq.length;
    for (let i = 0; i < size; i++) {
        console.log(pq.dequeue());
    } */
    var id = 0;
    var loop = () => {
        const a = pq.dequeue();
        if (pq.length == 0)
            return a;
        const b = pq.dequeue();
        a.digit = 0;
        b.digit = 1;
        var value = a.count + b.count;
        pq.queue(new Nodo(value, 'a' + id, [a, b], null));

        cy.add([{
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

        cy.layout({
            name: 'dagre'
        }).run();

        cy.resize();
        cy.fit();
        id++;
        setTimeout(loop, 1000);
    }
    setTimeout(loop, 3050);

}

buildTree = count => {
    const pq = new PriorityQueue({
        comparator: function (a, b) {
            return a.count - b.count;
        }
    });

    Object.entries(count).forEach(([k, v]) => {
        pq.queue(new Nodo(v, k.charCodeAt(0), [null, null], null))
    });

    /*var size=pq.length;
    for (let i = 0; i < size; i++) {
        console.log(pq.dequeue());
    }*/

    var id = 0;
    while (pq.length) {
        const a = pq.dequeue();
        if (pq.length == 0)
            return a;
        const b = pq.dequeue();
        a.digit = 0;
        b.digit = 1;
        var value = a.count + b.count;
        pq.queue(new Nodo(value, 'r' + id, [a, b], null));
        id++;
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
    var fg = false;
    var aStar = cy.elements().aStar({
        root: arbol.symb,
        goal: "#" + simbolo
    });

    aStar.path.select();
    console.log(aStar.distance);
    var i = 0;

    console.log(aStar.path.length);

    var i;
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
            if (value == true) cy = cytoscape(config);
        }, function (error) {
            console.log("No puelo");
        });

        i++;
    });
}

/********************************************************** */
$("#Iniciar").click(function () {

    msg = $('#cadena').val();

    var typew = document.getElementById('typew');

    var typewriter = new Typewriter(typew, {
        loop: false,
        delay: 500
    });

    typewriter.typeString(msg).start();

    cy = cytoscape({
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

    /*setTimeout(() => {
        
    }, 10500);

    setTimeout(() => {
        Object.entries(codigos).forEach(([k, v]) =>
        console.log('Char: ' + k + '- Codigo: ' + v)
    );
}, 10501);*/
});


$('#Codi').click(() => {
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
    cy = cytoscape(config);
    cy.layout({
        name: 'dagre'
    }).run();
    colorearTodas();

    if (codigos.length == count.length)
        Object.entries(codigos).forEach(([k, v]) =>
            console.log('Char: ' + k + '- Codigo: ' + v)
        );
});

/*$('#Paths').click(() => {
    Object.entries(codigos).forEach(([k, v]) => {
        console.log('Char: ' + k + '- Codigo: ' + v)
    });
});*/

window.addEventListener('resize', function () {
    cy.resize();
    cy.fit();
});