//al cargar la pagina, en la burbuja pone un texto por default
window.onload = document.getElementById("Burbujatexto").innerHTML = "<h5>Codificación Huffman</h5><p>El algoritmo de Huffman es un algoritmo para la compresión de archivos o texto. Este algoritmo es greedy ya que junta cada mini árbol de los cuales son el resultado de realizar la suma de las frecuencias entre dos arboles hasta generar un solo árbol considerado como la solución óptima, ya que dicho árbol contiene las codificaciones para cada caracter único. ¿Qué esperas? ¡Introduce tu mensaje y comienza a utilizarlo! <i class='bi bi-emoji-wink-fill'</i></p>";
//al hacer scroll en la pagina, cambiar el texto
window.onscroll = function(){
  cambiarTexto(); 
};
/**
 * Función:cambiarTexto(0)
 * Descripcion: cambia el texto de la burbuja
 * Recibe: 
 *  - void
 * Regresa:
 *  - void
 * Errores: ninguno
*/
function cambiarTexto(){
    //obtiene la posicion del scroll en la pagina
    var pos = window.scrollY;
    //si esta entre 1 y 100 
    if(pos>-1 && pos<100){
        //cambiar texto
        document.getElementById("Burbujatexto").innerHTML = "<h5>Codificación Huffman</h5><p>El algoritmo de Huffman es un algoritmo para la compresión de archivos o texto. Este algoritmo está diseñado bajo la estrategia greedy, ya que junta cada mini árbol de los cuales son el resultado de realizar la suma de las frecuencias entre dos arboles hasta generar un solo árbol considerado como la solución óptima, esto debido a que dicho árbol contiene las codificaciones para cada caracter único. ¿Qué esperas? ¡Introduce tu mensaje y comienza a utilizarlo! <i class='bi bi-emoji-wink-fill'</i></p>";
    }

    //si esta entre 60 y 200 
    if(pos>60 && pos<200){
        //cambiar texto
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Qué pasa en la Adquisión de Frecuencias</h5><p>En esta parte se crea un árbol con base a las frecuencias de las apariciones de los caracteres que se introducen en el campo de entrada. Para formar el árbol se ordenan de forma ascendente los caracteres que se introdujeron y se realiza la suma de las frecuencias de los dos elementos con menor frecuencia, este proceso se repite hasta que queda un único arbol. La complejidad de la creación de dicho árbol en su peor caso es de <math>O(n logn)</math></p>";
        
    }
    //si esta entre 400 y 1000 
    else if(pos > 400 && pos<1000){
        //cambiar texto
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Y cómo se construyen los códigos?</h5><p>En esta sección se hace el recorrido del árbol para obtener los códigos. Si se va por el lado izquierdo se va a tomar un 0, y si se va por el lado derecho tomará un 1. De esta forma se realiza el recorrido hasta llegar a un nodo hoja de el árbol para encontrar el caracter del que se está construyendo su código.</p>";
    }
    //si esta entre 1001 y 1599 
    else if(pos > 1001 && pos<1599){
        //cambiar texto
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Qué pasa con la codificación?</h5><p>Una vez que se tienen los códigos de los caracteres, se sustityue cada caracter por su código correspondiente obtenido en la sección de construcción de códigos. Se puede observar el porcentaje de compresión en bytes del texto original con respecto del texto codificado <i class='bi bi-file-bar-graph-fill'></i>. La complejidad del recorrido del árbol en su peor caso es de O(tamaño de la cadena 0 y 1).</p>";
    }
    //si esta entre 1600 y 2000
    else if(pos > 1600 && pos<2000){
        //cambiar texto
        document.getElementById("Burbujatexto").innerHTML = "<h5>¿Y cómo lo regreso a la normalidad? Pues usaremos la decodificación <i class='bi bi-emoji-dizzy-fill'></i></h5><p>Por último, se vuelve a utilizar el árbol que se obtuvo en la sección de adquisión de frecuencias, como se tiene el texto codificado, simplemente se debe realizar el recorrido del árbol hasta llegar a un nodo hoja con la letra que le representa a dicho código. Y eso es todo, esa es la codificación Huffman <i class='bi bi-emoji-laughing-fill'></i>.</p>";
    }

    
}
/**
 * Función:ocultar(0)
 * Descripcion: ocultar o muestra la burbuja
 * Recibe: 
 *  - void
 * Regresa:
 *  - void
 * Errores: ninguno
*/
function ocultar(){
    //obtiene el id de la burbuja
    var x = document.getElementById("Burbujita");
    //si estaba oculta
    if(x.style.display === "none"){
        //mostrar y cambiar el valor del boton
        x.style.display="block";
        document.getElementById("Boton").value="Ocultar";
    }
    else{
        //en caso contrario, ocultarla
        x.style.display = "none";
        //cambiar el valor del boton
        document.getElementById("Boton").value="Mostrar";
    }
}