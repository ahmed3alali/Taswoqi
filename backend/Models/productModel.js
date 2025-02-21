import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({


    name: {

        type: String,
        required: [true, "Please enter a product name"],
        maxLenght: [200, "Product name cannot exceed 200 characters"]
    },


    price: {

        type: Number,
        required: [true, "Product price cannot be empty"],
        maxLenght: [5, "Product price cannot exceed 5 digits"]

    },

    description: {

        type: String,
        required: [true, "Please enter a product description"],


    },


    ratings: {

        type: Number,

        default: 0,


    },



    images: [{

    public_id:{

type:String,
required:true

    },

    url:{

type:String,
required:true,

    }

    }],
    category: {

        type: String,
        required: [true, "Please enter product category"],
        enum: {

            values: ['Laptops','Electronics','Headphones','Accessories','Cameras','Food'],
            message: 'Please select correct categories'


        }


    },

    seller: {

        type: String,
        required: [true, "Please enter a product seller "],


    },


    stock: {

        type: Number,
        required: [true, "Please enter product stock"],

    },


    numOfReviews: {


        type: Number,
        default: 0,

    },

    reviews: [

        {

            user: {

                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,

            },
            rating: {

                type: Number,
                required: true,

            },

            comment: {

                type: String,
                required: true


            }



        }

    ],

    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,

    },





},{timestamps:true});



export default mongoose.model("Product",productSchema);