import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { message } from 'statuses';



export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.error("Error in updateProduct controller", error);
        console.error("Error in creating Product:", error.message); 
    }
};

export async function createProduct(req, res) {
    const product = req.body;
    try {
        
        if (!product.name || !product.price || !product.image) {
            return res.status(400).json({success: false, message: 'Please Provide All Fields'})
        }

        const newProduct = new Product(product)
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})

    } catch (error) {
        console.error("Error in updateProduct controller", error);
        console.error("Error in creating Product:", error.message);
    }
};

export async function updateProduct(req, res) {
    const {name, price, image} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id"
        })
    };

    try {
        
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {name, price, image}, {
            new: true
        });
        if (!updatedProduct) {res.status(404).json({"message": "Product not found!"})};
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.error("Error in updateProduct controller!", error);
        res.status(500).json({'message': "Internal Error!"});
    }
}


export async function deleteProduct(req, res) {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id"
        })
    };
    
    try {
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {res.status(404).json({"message": "Product not found"})};
        res.status(200).json({success: true, 
            message: "Product deleted sucessfully."})
        
    } catch (error) {
        console.error("Error in updateProduct controller.", error);
        res.status(500).json({'message': "Internal Error!"}); 
    }
   
}