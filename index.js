var express=require('express');
/*var app=express();
app.get('/',function(req,res)
{
res.send('Hello World!');
});
var server=app.listen(3000,function() {});
*/
let products=[
    {id:1,name:"milk",price:30.5},
    {id:2,name:"Egg",price:30.5},
    {id:3,name:"chees",price:30.5},
    {id:4,name:"Rice",price:30.5},
    {id:5,name:"Pepsi",price:13.5},
    {id:6,name:"Noodles",price:10.5}
]
let baseURL='/products'
var app=express();
app.use(express.json());
// get product by id
app.get(baseURL+'/:id',function(req,res)
{
let id=parseInt(req.params.id);
const product= products.find(p=>p.id===id);
res.send('Hello Product!'+product.name);
});

// get all product
app.get(baseURL,function(req,res)
{
 res.json(products);
});

// Add product by id
app.post(baseURL,function(req,res)
{
    const product =
    {
        id:(products.length)+1,
        name:req.body.name,
        price:req.body.price,
    }
products.push(product);

res.send(req.body);

});
// edit  product by id
app.put(baseURL+'/:id',function(req,res)
{

    
    const product= products.find(p=>p.id===parseInt( req.params.id));
    const index=products.indexOf(product);
    products[index].name=req.body.name;
    products[index].price=req.body.price;

res.send( products[index]);
   


});

app.delete(baseURL+'/:id',function(req,res)
{


    let id=parseInt(req.params.id);
    const product= products.find(p=>p.id===id);
    const index=products.indexOf(product);
    products.splice(index,1);
    //res.send(' Product '+product.name+" Delete.");
    res.json(products);
});
var server=app.listen(3000,function() {});