const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStore')  
.then(()=>{
    console.log('mongoDB connection open!!')
})
.catch(err=>{
    console.log('mongoDB connection error')
    console.log(err)
})


// ! insert One
// const p = new Product ({
//   name: 'Durian',
//   price: 1,
//   category: 'fruit'
// })

// p.save()
//   .then(p => {
//     console.log(p)
// })
//   .catch(err => {
//     console.log(err)
//   })

  //! insert Many
  const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
        
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
   
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
   
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
     
    },
]

Product.insertMany(seedProducts )
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})