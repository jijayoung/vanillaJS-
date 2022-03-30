const calcultor = {
    add : function(a,b){
        console.log(a+b);
    },
    minus : function(a,b){
        console.log(a-b);
    },
    multi : function(a,b){
        console.log(a*b);
    },
    divide : function(a,b){
        console.log(a/b);
    },
    power : function(a,b){
        console.log(a**b);
    },
}
calcultor.add(10,5);
calcultor.minus(10,5);
calcultor.multi(10,5);
calcultor.divide(10,5);
calcultor.power(10,5);


const calculator2 = {
    plus: (a, b) => console.log(a + b),
    minus: (a, b) => console.log(a - b),
    multiply: (a, b) => console.log(a * b),
    divide: (a, b) => console.log(a / b),
    power: (a, b) => console.log(a ** b),
    remain: (a, b) => console.log(a % b),
    };


calculator2.plus(2, 5);
calculator2.minus(5, 3);
calculator2.multiply(5, 9);
calculator2.divide(8, 4);
calculator2.power(2, 3);
calculator2.remain(5, 2);