import axios from 'axios';

const url = 'http://localhost:5000/posts';

const API = axios.create({baseURL: 'http://localhost:5000'})


API.interceptors.request.use((req)=> {

    if(localStorage.getItem('profile')){

        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` 

    }

    return req;

})




export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id,post) => API.patch(`/posts/${id}`, post)

export const likePost = ( id, likeCount ) => API.patch(`/posts/${id}/likepost`, likeCount )



export const deletePost = ( id ) => API.delete(`/posts/${id}/deletePost`, deletePost )



export const signin = (formData) => API.post('/users/signin', formData)

export const signup = (formData) => API.post('/users/signup', formData)