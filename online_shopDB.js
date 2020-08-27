var express=require('express');
var app=express();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

const productSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

const Product = mongoose.model("Product",productSchema);

let baseURL='/products'

app.use(express.json());

// get product by id
app.get(baseURL+'/:id',function(req,res)
{
Product.findOne({id:req.params.id})
    .exec()
    .then(prod => {
        res.send("product: "+prod.name+", price: "+prod.price);
    })
    .catch(err => {
        res.send(err);
    });
});

// get all product
app.get(baseURL,function(req,res)
{
    Product.find()
    .exec()
    .then(prod => {
        for(i=0;i<prod.length;i++)
           res.write(prod[i].name+", id: "+prod[i].id+" price:"+prod[i].price+" ");

    })
    .catch(err => {
        res.send(err);
    });

});

// Add product by id
app.post(baseURL,function(req,res)
{
    const product = new Product({
        id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price,
      });
    
      product
        .save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
});
// edit  product by id
app.put(baseURL+'/:id',function(req,res)
{


    Product.update({ id: req.params.id },{price:req.body.name},{price:req.body.price})
    .exec()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    });
 
   

});

app.delete(baseURL+'/:id',function(req,res)
{

    Product.remove({id:req.params.id})
    .exec()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    });
  
});
var server=app.listen(3030,function() {});