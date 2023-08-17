const express = require("express");
const {PostModel} = require("../Models/post.model");

const postRoute = express.Router();

postRoute.get("/",async(req,res) => {
    try{
        const allPost = await PostModel.find();
        res.status(200).send(allPost);
    }
    catch(err){
        res.send({"error":err.message});
    }
})

postRoute.post("/",async(req,res) => {
    const {name,email,destination,no_of_travellers,budget_per_person} = req.body;
    try{
        const newPost = PostModel({name,email,destination,no_of_travellers,budget_per_person});
        await newPost.save();
        res.status(201).send({"message":"New Destination Posted"});
    }
    catch(err){
        res.send({"error":err.message});
    }
})

postRoute.delete("/:id",async(req,res) => {
    const id = req.params.id;
    try{
        const postCheck = await PostModel.findById(id);
        if(postCheck){
            const deletedPost = await PostModel.findByIdAndDelete(id);
            res.send({"message":"Post deleted"});
        }
        else{
            res.send({"message":"Post with such ID does not exist"});
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
})

module.exports = {postRoute};