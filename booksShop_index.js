var express=require('express');

    // Sample data 
let books=[
    {isbn:6846,title:"book 1",publisher:"pub1"},
    {isbn:5468,title:"book 2",publisher:"pub2"},
    {isbn:6546,title:"book 3",publisher:"pub3"},
    {isbn:5468,title:"book 4",publisher:"pub4"},
    {isbn:5684,title:"book 5",publisher:"pub5"},
    {isbn:5453,title:"book 6",publisher:"pub6"}
  ]

let baseURL='/books'
var app=express();
app.use(express.json()); // allow to use json in app

// get book  by isbn
app.get(baseURL+'/:isbn',function(req,res)
{
let isbn=parseInt(req.params.isbn); //get id from request
const book= books.find(b=>b.isbn===isbn); // get object from database
res.send(book); // respond by object
});


// get all books
app.get(baseURL,function(req,res)
{
 res.json(books);  // respond by all books 
});


// Add new book by id
app.post(baseURL,function(req,res)
{
    const book =                      // create new object and push in array of objects
    {
        isbn:(books.length)+1,
        title:req.body.title,
        publisher:req.body.publisher,
    }
books.push(book);

res.send(req.body);   // respond by new  data of new book

});



// edit  book  by id
app.put(baseURL+'/:isbn',function(req,res)
{

    
    const book= books.find(b=>b.isbn===parseInt( req.params.isbn)); //get book object by isbn
    const index=books.indexOf(book);               // get index of object in array
    books[index].title=req.body.title;            // change title of selected book
    books[index].publisher=req.body.publisher;   // change publisher of selected book

res.send( books[index]);                       // retun updated book object
   


});


// delete book object
app.delete(baseURL+'/:isbn',function(req,res)
{


    let isbn=parseInt(req.params.isbn);  //get isbn from request 
    const book= books.find(b=>b.isbn===isbn); //get book object by isbn
    const index=books.indexOf(book); //get index of book object in array
    books.splice(index,1);  // remove 
    res.json(books);  // return all book objects  after remove 
});

var server=app.listen(3030,function() {});