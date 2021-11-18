window.onload = function () {

    var queue = new PriorityQueue({
        comparator: function (a, b) {
            return a.numero - b.numero;
        }
    });
    queue.queue(new Prueba(5, "hola"));
    queue.queue(new Prueba(56, "como"));
    queue.queue(new Prueba(10, "estas"));
    queue.queue(new Prueba(100, "prueba"));
    //queue.queue(new Prueba(0,"?"));
    var lowest = queue.dequeue(); // returns 5
    console.log(lowest);

    var test = new Prueba(500, "holi");
    test.hola("jejeje");
};
