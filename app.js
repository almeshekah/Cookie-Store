const express = require("express");
let products = require("./data");

const app = express();
app.use(express.json());
const db = require("./db/models");




//app.get("/products" , (req , res)=>{
//res.json(products);
//});

app.get("/products" , async(req , res )=>{
    try{
        const _products=await products.findAll();
        res.json(_products);
    }catch(error){
        res.json({message:error.message});
    }
});


app.get("/products/:productId", (req , res) => {

    const foundproduct =products.find((product)=>product.id === +req.params.productId);
    if(foundproduct){
        res.json(foundproduct);
    }else{
        res.status(404);
        res.json({message : "product not found"})
    }
});

app.delete("/products/:productId", (req, res )=>{
    const foundproduct =products.find((product)=>product.id === +req.params.productId);
    if(foundproduct){
        products=products.filter((product)=> product.id !== foundproduct.id);
        res.status(204).end();
    }else{
        res.status(404);
        res.json({message : "product not found"})
    }

});

app.post("/products", (req,res)=>{
    req.body.id=products[products.length-1].id + 1;
    products.push(req.body);
    res.status(201).json(req.body);
});

db.sequelize.sync();


app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});


