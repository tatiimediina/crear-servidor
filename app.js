const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./database')
const app = express();

//M

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Rutas

//obtener todos los productos
app.get('/products', (req,res)=>{
    res.send(database)
})
//obtener los productos por id
app.get('/products/:id',(req,res)=>{
    const id = parseInt(req.params.id)

    const product = database.find((product)=>product.id === id)

    res.json(product)
})
//obtener 
app.post('/products',(req,res)=>{
    const { id, producto, precio } = req.body

    const newProduct = database.push({ id: id, producto: producto, precio: precio})
    console.log(newProduct)
    res.json({message: "producto creado"})

})

app.delete('/products/:id', (req,res)=>{
    const id = parseInt(req.params.id);

    const product = database.find((producto)=>product.id ===id)
    const ind = database.indexOf(producto)
    const productDeleted = database.splice(ind, 1)

    res.send({message :"producto eliminado", productDeleted})
})
app.put('/products/:id', (req, res)=>{
    const id = parseInt(req.params.id);

    const { producto, precio } = req.body

    const getProduct = database.find((producto)=>producto.id ===id);

    getProduct.producto = producto;
    getProduct.precio = precio;
    
    res.json({message: "producto editado"})
})

app.listen(PORT,()=>{
    console.log('servidor funcionando')
    console.log(PORT)
})


