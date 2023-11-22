const express = require('express');
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')

mongoose.connect('mongodb+srv://jesrylbaguio:Jb.1234567@cluster0.rqpztnr.mongodb.net/farmStore')
// mongoose.connect('mongodb://localhost:27017/farmStore')
.then(()=>{
    console.log('mongoDB connection open!!')
})
.catch(err=>{
    console.log('mongoDB connection error')
    console.log(err)
})
// ! Middleware
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))  


const categories = ['fruit','vegetable','dairy', 'pastries','mushrooms']


app.get('/' , (req,res)=>{
res.send('Welcome to Home')
})

app.get('/products', async (req,res)=>{
const products = await Product.find({})
// console.log(products)
// res.send(`all products received`)
res.render('products/index', {products})
})

// ! Create product
app.get('/products/new', (req, res) => {
    // res.send('Product route')
    res.render('products/new', {categories})
})

app.post('/products', async (req, res) => {
    
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)

})
// ! END 



app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    // res.send('details')
    res.render('products/show', {product})
})


app.get('/home/:id', async (req, res) => {
    const {id} = req.params
    const credentials = await CredentialsContainer.findById(id)
    res.redirect('home', {credentials})
})





// ! Update / PUT & PATCH
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories})
})
app.put('/products/:id', async (req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
    res.redirect(`/products/${product._id}`)
})

// ! END



//! DELETE ROUTE
app.delete('/products/:id', async (req, res) => {
    const {id} = req.params
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})



app.listen(3000, ()=>{
console.log('listening on port 3000')
console.log('server running')
})