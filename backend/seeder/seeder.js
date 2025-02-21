import mongoose from "mongoose";
import products from './data.js'

import Product from '../Models/productModel.js'
const seedProduct = async () =>{



    try{


await mongoose.connect("mongodb+srv://amsaAdmin:admindb000@cluster0.z7r0z.mongodb.net/Taswoqi?retryWrites=true&w=majority&appName=Cluster0")


await Product.deleteMany();
console.log('products are deleted');


await Product.insertMany(products);

console.log('products are added!');

process.exit();
    } catch(error) {

console.log(error.message);
process.exit();

    }



}


seedProduct();