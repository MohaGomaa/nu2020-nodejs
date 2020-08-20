function area(n){


    let area=n*n;
    return area;

}

function testCallback(callbackarea)
{
    return callbackarea(20);

}
let x=testCallback(area);
console.log(x);