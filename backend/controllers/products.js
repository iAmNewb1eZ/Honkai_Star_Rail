const { PrismaClient } = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient();

// post - insert a new Product
const createProduct = async (req, res) => {
    const {product_id, name, description, price, category, image_url} = req.body;
    try {
        const prod = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json({
            status:"ok",
            message: `Product with ID ${prod.product_id} created successfully`
        });
    }catch(error){
        res.status(500).json({
            status:"error",
            message: "Error creating Product",
            error: error.message
        });
    }
};
// get - get all customers
const getProducts = async (req, res) => {
   const prods = await prisma.products.findMany();
   res.json(prods);
};

// get - get only id Product
const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
    const prod = await prisma.products.findUnique({
        where: {
            product_id: Number(id) },
    });
    if(!prod){
        return res.status(404).json({"message": "Product not found"});
    } else {
        res.status(200).json(prod);
    }}catch(error){
        res.status(500).json(error);
    }
};

//delete - delete a Product
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const existingProduct = await prisma.products.findUnique({
            where: {
                product_id: Number(id) },
        });
        if(!existingProduct){
            return res.status(404).json({message: "Product not found"});
        }
        await prisma.products.delete({
            where: {
                product_id: Number(id) },
        });
        res.status(200).json({
            status:"ok",
            message: `Product with ID ${id} deleted successfully`
        });
    }catch(err){
        console.error('delete Product error', err);
        res.status(500).json({error: err.message});
        }
    }
//update - update a Product
const updateProduct = async (req, res) => {
    const {product_id, name, description, price, category, image_url} = req.body;
    const {id} = req.params;
    const data = {};
    if(product_id) data.product_id = product_id;
    if(name) data.name = name;
    if(description) data.description = description;
    if(price) data.price = price;
    if(category) data.category = category;
    if(image_url) data.image_url = image_url;

    if(Object.keys(data).length === 0){
        return res.status(400).json({
            status: "error", 
            message: "Plase provide data to update"});
    }
    try {
        const prod = await prisma.products.update({
            data: data,
            where: {
                product_id: Number(id) }
        });
        res.status(200).json({
            status:"ok",
            message: `Product with ID ${prod.product_id} updated successfully`,
            user: prod
        });
    }catch(err){
        console.error('update Product error', err);
        res.status(500).json({error: err.message});
    }
};

module.exports = {
    createProduct,getProducts,getProduct,deleteProduct,updateProduct
};