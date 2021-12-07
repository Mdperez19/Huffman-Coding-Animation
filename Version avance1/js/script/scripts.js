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
        document.getElementById("Burbujatexto").innerHTML = "<h5>Codificación Huffman</h5><p>El algoritmo de Huffman es un algoritmo para la compresión de archivos o texto. Este algoritmo es greedy ya que junta cada mini árbol de los cuales son el resultado de realizar la suma de las frecuencias entre dos arboles hasta generar un solo árbol considerado como la solución óptima, ya que dicho árbol contiene las codificaciones para cada caracter único. ¿Qué esperas? ¡Introduce tu mensaje y comienza a utilizarlo! <i class='bi bi-emoji-wink-fill'</i></p>";
    }


    if(pos>60 && pos<200){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Qué pasa en la Adquisión de Frecuencias</h5><p>En esta parte se crea un árbol en base a las frecuencias de las apariciones de los caracteres que introducimos en nuestro campo de entrada. Para formar el árbol se ordenan de forma ascendente los caracteres que se introdujerón y se realiza la suma de frecuencias entre cada nodo. La creación de dicho árbol tarda en su peor caso <math>O(n logn)</math></p>";
        
    }

    else if(pos > 400 && pos<1000){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Y cómo se construyen los códigos?</h5><p>En esta sección se hace un recorrido del árbol, si se va por el lado izquierdo se va a tomar un 0, y si se va por el lado derecho tomará un 1. De esta forma se realiza el recorrido del árbol hasta encontrar el caracter al que le estamos construyendo su código para utilzarlo en la codificación.</p>";
    }

    else if(pos > 1001 && pos<1599){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Qué pasa con la codificación?</h5><p>Una vez que tenemos los códigos correspondientes a nuestros caracteres, sustituiremos cada caracter por su código que obtuvimos en la sección de construcción de códigos, además podemos ver el porcentaje de compresión en bytes de nuestro texto original <i class='bi bi-file-bar-graph-fill'></i>. El recorrido para el árbol toma en su peor caso es O(tamaño de la cadena 0 y 1).</p>";
    }

    else if(pos > 1600 && pos<2000){
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Y cómo lo regreso a la normalidad? Pues usaremos la decodificación <i class='bi bi-emoji-dizzy-fill'></i>.</h5><p>Por último, volvemos a tomar el árbol que se obtuvo en la sección de adquisión de frecuencias, como tenemos nuestro texto codificado, simplemente tenemos que realizar el recorrido del árbol hasta llegar a un nodo con la letra que le representa a dicho código. Y eso es todo, esa es la codificación Huffman <i class='bi bi-emoji-laughing-fill'></i>.</p>";
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