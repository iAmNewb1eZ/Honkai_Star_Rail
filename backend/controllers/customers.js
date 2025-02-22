const { PrismaClient } = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient();

// post - insert a new customer
const createCustomer = async (req, res) => {
    const {customer_id, first_name, last_name, address, email, phone_number} = req.body;
    try {
        const cust = await prisma.customers.create({
            data: {
                customer_id,
                first_name,
                last_name,
                address,
                email,
                phone_number
            }
        });
        res.status(200).json({
            status:"ok",
            message: `User with ID ${cust.customer_id} created successfully`
        });
    }catch(error){
        res.status(500).json({
            status:"error",
            message: "Error creating user",
            error: error.message
        });
    }
};
// get - get all customers
const getCustomers = async (req, res) => {
   const custs = await prisma.customers.findMany();
   res.json(custs);
};

// get - get only id customer
const getCustomer = async (req, res) => {
    const id = req.params.id;
    try {
    const cust = await prisma.customers.findUnique({
        where: {
            customer_id: Number(id) },
    });
    if(!cust){
        return res.status(404).json({"message": "Customer not found"});
    } else {
        res.status(200).json(cust);
    }}catch(error){
        res.status(500).json(error);
    }
};

//delete - delete a customer
const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const exitingCustomer = await prisma.customers.findUnique({
            where: {
                customer_id: Number(id) },
        });
        if(!exitingCustomer){
            return res.status(404).json({message: "Customer not found"});
        }
        await prisma.customers.delete({
            where: {
                customer_id: Number(id) },
        });
        res.status(200).json({
            status:"ok",
            message: `User with ID ${id} deleted successfully`
        });
    }catch(err){
        console.error('delete Customer error', err);
        res.status(500).json({error: err.message});
        }
    }
//update - update a customer
const updateCustomer = async (req, res) => {
    const {first_name, last_name, address, email, phone_number} = req.body;
    const {id} = req.params;
    const data = {};
    if(first_name) data.first_name = first_name;
    if(last_name) data.last_name = last_name;
    if(address) data.address = address;
    if(email) data.email = email;
    if(phone_number) data.phone_number = phone_number;

    if(Object.keys(data).length === 0){
        return res.status(400).json({
            status: "error", 
            message: "Plase provide data to update"});
    }
    try {
        const cust = await prisma.customers.update({
            data: data,
            where: {
                customer_id: Number(id) }
        });
        res.status(200).json({
            status:"ok",
            message: `User with ID ${cust.customer_id} updated successfully`,
            user: cust
        });
    }catch(err){
        if(err.code === 'P2002'){
             res.status(404).json({
                status: "error",
                message: "Email already exists"
             });
            } else if(err.code === 'P2025') {
                 res.status(404).json({
                    status: "error",
                    message: `User with ID= ${id} not found`
        });
    } else {
        console.error('update Customer error', err);
        res.status(500).json({
            status: "error",
            message: "Error updating user",
            error: err.message
        });
    }}
};

module.exports = {
    createCustomer,getCustomers,getCustomer,deleteCustomer,updateCustomer
};