import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
//used to update existing documents
router.patch('/:id', updatePost); //imported from controllers/posts.js
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost )

export default router;
