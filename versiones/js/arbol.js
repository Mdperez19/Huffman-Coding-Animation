window.onload = function () {
  var cy = cytoscape({
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
      nodes: [{
          data: {
            id: '1'
          }
        },
        {
          data: {
            id: '2'
          }
        },
        {
          data: {
            id: '3'
          }
        },
        {
          data: {
            id: '4'
          }
        },
        {
          data: {
            id: '5'
          }
        }
      ],

      edges: [{
          data: {
            source: '3',
            target: '2'
          }
        },
        {
          data: {
            source: '3',
            target: '4'
          }
        },
        {
          data: {
            source: '2',
            target: '1'
          }
        },
        {
          data: {
            source: '4',
            target: '5'
          }
        }
      ]
    },

    layout: {
      name: 'dagre'
    }
  });
  setTimeout(function(){
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
  },1000);
  

  setTimeout(function(){
    cy.remove(cy.$('#1'));
  },1000);
  setTimeout(function(){
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
  },2000);
  

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