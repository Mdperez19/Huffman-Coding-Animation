const set = new Set();
const map = new Map();

var cadena = 'ahahahltijfajdfaelifjelg';
var cont = cadena.length;


for (var i = 0; i < cadena.length; i++) {
    set.add(cadena[i]);
}

console.log('Tamaño de cadena: ' + cont);

var num = 0;
var tam = Math.ceil(Math.log2(set.size));

set.forEach((elemento) => {
    map.set(elemento, '0'.repeat(tam - num.toString(2).length) + num.toString(2));
    num++;
});

var codigo = '';

for (var i = 0; i < cadena.length; i++) {
    codigo = codigo + map.get(cadena[i]);
}


console.log('Codigo: ' + codigo);

var inicio = 0;
var deco = '';

for (var i = 0; i < codigo.length; i += tam) {
    set.forEach((elemento) => {
        if (map.get(elemento) == codigo.substr(i, tam)) {
            deco = deco + elemento;
        }
    });
}

console.log('Decodif: ' + deco);

console.log(set);
console.log(map);