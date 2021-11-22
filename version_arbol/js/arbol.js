window.onload = function () {
  class Nodo {
    constructor(count, symb, [a, b], digit) {
      this.digit = digit;
      this.count = count;
      this.symb = symb;
      this.children = [a, b];
    }
  }

  var msg = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora rem animi quisquam asperiores, sint porro veniam, officia mollitia accusantium autem voluptate? Vel ea modi corporis unde, recusandae porro magnam repellat.';

  buildCount = (msg) => {
    const obj = {};
    msg.split('').forEach(e => {
      if(e == ' ')
        e = 'esp';
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
      pq.queue(new Nodo(v, k, [null, null], null))
    );

    /*var size=pq.length;
    for (let i = 0; i < size; i++) {
        console.log(pq.dequeue());
    }*/
    var id=0;
    while (pq.length) {
      const a = pq.dequeue();
      if (pq.length == 0)
        return a;
      const b = pq.dequeue();
      a.digit = 0;
      b.digit = 1;
      var value = a.count + b.count;
      pq.queue(new Nodo(value, 'r'+id, [a, b], null));
      id++;
    }
  }

  var nodos = [];
  var links = [];

  function dataSet(root, elements, edges) {
    if (root.children[0] == null) {
    elements.push({
      "data": {
        "id": root.symb,
        "name":root.symb
      }
    }
    );
  }else
  elements.push({
    "data": {
      "id": root.symb,
      "name":root.count
    }
  }
  );
    if (root.children[0] != null) {
      edges.push({
        "data": {
          "source": root.symb,
          "target": root.children[0].symb,
          "label": root.children[0].digit
        }
      }
      );
      dataSet(root.children[0], elements, edges);
    }

    if (root.children[1] != null) {
      edges.push({
        "data": {
          "source": root.symb,
          "target": root.children[1].symb,
          "label": root.children[1].digit
        }
      }
      );
      dataSet(root.children[1], elements, edges);
    }

    return null;
  }

  var arbol = buildTree(count);
  dataSet(arbol, nodos, links);

  console.log(buildCount(msg));
  console.log(arbol);
  console.log(nodos);
  console.log(links);

  var cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,


    style: cytoscape.stylesheet()
      .selector('node')
      .style({
        'content': 'data(name)'
      })
      .selector('edge')
      .style({
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd',
        'label': 'data(label)'
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
      nodes: nodos,

      edges: links
    },

    layout: {
      name: 'dagre'
    }
  });
  var aStar = cy.elements().aStar({
    root: arbol.symb,
    goal: "#f"
  });

  aStar.path.select();
  console.log(aStar.distance);
  var i = 0;

  console.log(aStar.path.length);
  var highlightNextEle = function () {
    aStar.path[i].addClass('highlighted');
    /*if(aStar.path[i]._private.data.label!=undefined)
        console.log(aStar.path[i]._private.data.label.toString());*/
    i++;
    setTimeout(highlightNextEle, 500);
  };
  highlightNextEle();

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