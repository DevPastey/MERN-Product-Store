import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true //creatAt. updatedAt
    }
);



const Product = mongoose.model('Product', productSchema);

export default Product;