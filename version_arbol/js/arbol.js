const STRATOS = "#001B48";
const REGAL_BLUE = "#02457A";
const BONDI_BLUE = "#018ABE";
const MORNING_GLORY = "#97CADB";
const BOTTICELLI = "#D6E8EE";
class Nodo {
  constructor(count, symb, [a, b], digit) {
    this.digit = digit;
    this.count = count;
    this.symb = symb;
    this.children = [a, b];
  }
}
window.onload = function () {

  var msg = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora rem animi quisquam asperiores, sint porro veniam, officia mollitia accusantium autem voluptate? Vel ea modi corporis unde, recusandae porro magnam repellat.';

  buildCount = (msg) => {
    const obj = {};
    msg.split('').forEach(e => {
      if (!obj[e]) obj[e] = 0;
      obj[e] += 1;
    });
    return obj;
  }

  var count = buildCount(msg);
  buildTree = count => {
    const pq = new PriorityQueue({
      comparator: function (a, b) {
        return a.count - b.count;
      }
    });

    Object.entries(count).forEach(([k, v]) =>
      pq.queue(new Nodo(v, k.charCodeAt(0), [null, null], null))
    );

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

  var nodos = [];
  var links = [];
  var hojas = [];

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

    return;
  }

  var arbol = buildTree(count);
  dataSet(arbol, nodos, links, hojas);

  console.log(buildCount(msg));
  console.log(arbol);
  console.log(nodos);
  console.log(links);

  const config = {
    container: document.getElementById('cy'),

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

  var cy = cytoscape(config);

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
    for (i = 0; i < aStar.path.length; i++)
      aStar.path[i].addClass('highlighted');

    setTimeout(() => {
      for (i = 0; i < aStar.path.length; i++)
        aStar.path[i].removeClass('highlighted');
    }, 600);

    //if (i > 1 && simbolo == aStar.path[i - 1]._private.data.id)
    //setTimeout(()=>{cy = cytoscape(config)},1000 * i);

    /*if(aStar.path[i]._private.data.label!=undefined)
      console.log(aStar.path[i]._private.data.label.toString());*/

    //setTimeout(highlightNextEle, 500*i);


    //highlightNextEle();

  };
  /* hojas.forEach((c) => {
    var flg = true;
    if (flg) {
      flg = false;
      setTimeout(() => {
        flg = colorear(c);
      }, 5000);
    }

    cy = cytoscape(config);
  }); */

  var i = 0;
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

  function task(i) {
    setTimeout(function () {
      colorear(hojas[i]);
    }, 3000 * i);
    return true;
  }
  /*setTimeout(() => {
    cy = cytoscape(config);
  }, 5000);*/

  /*setTimeout(() => {
    cy = cytoscape(config);
  }, 5000);

  setTimeout(() => {
    colorear("c");
  }, 5000);*/
  /*
    let i = 0;
  
  while (i < aStar.path.length) {
    task(i);
     i++;
  }
  function task(i) {
    
    setTimeout(function() {
      aStar.path[i].addClass('highlighted');
      if(aStar.path[i]._private.data.label!=undefined)
        this.codigo+=aStar.path[i]._private.data.label;
    }, 500 * i);
  }
  console.log(this.codigo);
  */
  /*setTimeout(function () {
    var aStar = cy.elements().aStar({
      root: "#3",
      goal: "#5"
    });

    aStar.path.select();
    console.log(aStar.distance);
    var i = 0;

    console.log(aStar.path.length);
    var highlightNextEle = function () {
      aStar.path[i].addClass('highlighted');

      i++;
      setTimeout(highlightNextEle, 500);
    };
    highlightNextEle();
  }, 1000);


  setTimeout(function () {
    cy.remove(cy.$('#1'));
  }, 1000);
  setTimeout(function () {
    cy.add([{
      group: "nodes",
      data: {
        id: '6'
      }
    },
    {
      group: "edges",
      data: {
        id: '56',
        source: '5',
        target: '6'
      }
    }
    ]);

    var layout = cy.layout({
      name: 'dagre'
    });
    layout.run();
  }, 2000);*/


  /*var cy = cytoscape({
      container: document.getElementById('cy'),
    
      boxSelectionEnabled: false,
      autounselectify: true,
    
      style: cytoscape.stylesheet()
        .selector('node')
          .style({
            'content': 'data(id)'
          })
        .selector('edge')
          .style({
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
          })
        .selector('.highlighted')
          .style({
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
          }),
    
      elements: {
          nodes: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } },
            { data: { id: 'd' } },
            { data: { id: 'e' } }
          ],
    
          edges: [
            { data: { id: 'a"e', weight: 1, source: 'a', target: 'e' } },
            { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
            { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
            { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
            { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
            { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
            { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
          ]
        },
    
      layout: {
        name: 'breadthfirst',
        directed: true,
        roots: '#a',
        padding: 10
      }
    });
    
    var bfs = cy.elements().bfs('#a', function(){}, true);
    
    var i = 0;
    var highlightNextEle = function(){
      if( i < bfs.path.length ){
        bfs.path[i].addClass('highlighted');
    
        i++;
        setTimeout(highlightNextEle, 1000);
      }
    };
    
    // kick off first highlight
    highlightNextEle();*/
  window.addEventListener('resize', function () {
    cy.resize();
    cy.fit();
  });

};