import * as api from '../api';

export const getPosts = () => async (dispatch)=>{

    try {
        console.log('Hellos from getpost from Post.js')
        const { data } = await api.fetchPosts();
        

        dispatch({type: 'FETCH_ALL' , payload: data });
    
    }catch(error){
        
    
        
    }
    

   
}

export const createPost = (post) => async (dispatch) =>{

    try{
        const { data } = await api.createPost(post);
        dispatch({type:'CREATE', payload: data });

    }catch(error){
    
    }
}

export const updatePost = (id, post) => async (dispatch) =>{

    try{
        const { data } = await api.updatePost(id, post);

    
        dispatch({type:'UPDATE', payload: data });

    }catch(error){
    
    }
}



export const likePost = (id) => async (dispatch)=>{

    try {
        console.log('Hellos from likePOst action from Post.js', id)

        const { data } = await api.likePost(id);
        
        

        dispatch({type: 'LIKE' , payload: data });
    
    }catch(error){
        
    
        
    }
    

   
}


export const deletePost = (id) => async (dispatch)=>{

    try {
        

        const { data } = await api.deletePost(id);
        


        dispatch({type: 'DELETE' , payload: id});
    
    }catch(error){
        
        
    }
    

   
}