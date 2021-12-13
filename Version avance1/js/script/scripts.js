/*!
* Start Bootstrap - Modern Business v5.0.5 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project



window.onload = document.getElementById("Burbujatexto").innerHTML = "<h5>Codificación Huffman</h5><p>El algoritmo de Huffman es un algoritmo para la compresión de archivos o texto. Este algoritmo es greedy ya que junta cada mini árbol de los cuales son el resultado de realizar la suma de las frecuencias entre dos arboles hasta generar un solo árbol considerado como la solución óptima, ya que dicho árbol contiene las codificaciones para cada caracter único. ¿Qué esperas? ¡Introduce tu mensaje y comienza a utilizarlo! <i class='bi bi-emoji-wink-fill'</i></p>";

window.onscroll = function(){
  cambiarTexto(); 
};

function cambiarTexto(){
    
    var pos = window.scrollY;

    if(pos>-1 && pos<100){
        document.getElementById("Burbujatexto").innerHTML = "<h5>Codificación Huffman</h5><p>El algoritmo de Huffman es un algoritmo para la compresión de archivos o texto. Este algoritmo está diseñado bajo la estrategia greedy, ya que junta cada mini árbol de los cuales son el resultado de realizar la suma de las frecuencias entre dos arboles hasta generar un solo árbol considerado como la solución óptima, esto debido a que dicho árbol contiene las codificaciones para cada caracter único. ¿Qué esperas? ¡Introduce tu mensaje y comienza a utilizarlo! <i class='bi bi-emoji-wink-fill'</i></p>";
    }


    if(pos>60 && pos<200){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Qué pasa en la Adquisión de Frecuencias</h5><p>En esta parte se crea un árbol con base a las frecuencias de las apariciones de los caracteres que se introducen en el campo de entrada. Para formar el árbol se ordenan de forma ascendente los caracteres que se introdujeron y se realiza la suma de las frecuencias de los dos elementos con menor frecuencia, este proceso se repite hasta que queda un único arbol. La complejidad de la creación de dicho árbol en su peor caso es de <math>O(n logn)</math></p>";
        
    }

    else if(pos > 400 && pos<1000){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Y cómo se construyen los códigos?</h5><p>En esta sección se hace el recorrido del árbol para obtener los códigos. Si se va por el lado izquierdo se va a tomar un 0, y si se va por el lado derecho tomará un 1. De esta forma se realiza el recorrido hasta llegar a un nodo hoja de el árbol para encontrar el caracter del que se está construyendo su código.</p>";
    }

    else if(pos > 1001 && pos<1599){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Qué pasa con la codificación?</h5><p>Una vez que se tienen los códigos de los caracteres, se sustityue cada caracter por su código correspondiente obtenido en la sección de construcción de códigos. Se puede observar el porcentaje de compresión en bytes del texto original con respecto del texto codificado <i class='bi bi-file-bar-graph-fill'></i>. La complejidad del recorrido del árbol en su peor caso es de O(tamaño de la cadena 0 y 1).</p>";
    }

    else if(pos > 1600 && pos<2000){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Y cómo lo regreso a la normalidad? Pues usaremos la decodificación <i class='bi bi-emoji-dizzy-fill'></i></h5><p>Por último, se vuelve a utilizar el árbol que se obtuvo en la sección de adquisión de frecuencias, como se tiene el texto codificado, simplemente se debe realizar el recorrido del árbol hasta llegar a un nodo hoja con la letra que le representa a dicho código. Y eso es todo, esa es la codificación Huffman <i class='bi bi-emoji-laughing-fill'></i>.</p>";
    }

    
}

function ocultar(){
    var x = document.getElementById("Burbujita");
    
    if(x.style.display === "none"){
        x.style.display="block";
        document.getElementById("Boton").value="Ocultar";
    }
    else{
        x.style.display = "none";
        document.getElementById("Boton").value="Mostrar";
    }
}