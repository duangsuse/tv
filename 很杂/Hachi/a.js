var f = function (x) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    return a;
}, g = function (a) { return f.apply(void 0, a); };
// {id,method,params}
// {id,result}
// {evalute({expression:js}){return{result:{value:x, type:typeof x,description:""}} } }
