import express from 'express';
import mongoose from  'mongoose';  


import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {

    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
    
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    
    try {
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//once a request is made, it will go to posts and then the id e.g posts/123
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body //sent from front-end


    //check if the id is a mongoose id

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');


    //post message is the model
    //asynchronous action 
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,  {...post, _id}, { new : true });

    res.json(updatedPost);
}
//delete functionality
export const deletePost = async (req, res) => {
    //recieves id

    const { id } = req.params; 
    //makes sure its a valid id 
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id'); 
    
    await PostMessage.findByIdAndRemove(id);
    //check to see if the delete went through
    console.log('DELETe!')

    res.json({message: 'Post deleted sucessfully '});    
}

export const likePost = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id'); 

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true }) // increment the like count 

    res.json(updatedPost);
}
