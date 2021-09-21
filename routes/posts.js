import express from 'express';
import { getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js'
import { auth } from '../middleware/authmiddleware.js';


const router = express.Router();

router.get('/', getPosts)

router.post('/', auth, createPost)

router.patch('/:id', auth,  updatePost)

router.patch('/:id/likepost', auth, likePost)


router.delete('/:id/deletePost', auth, deletePost)


export default router;