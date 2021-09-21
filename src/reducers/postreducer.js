import { FETCH_ALL, UPDATE, DELETE, LIKE, CREATE } from "./constants/actionTypes";
 
 
 
 const reducer = (posts=[] ,action) => {

    switch(action.type) {

        
        case FETCH_ALL:
            return [...action.payload];


        case UPDATE:

            console.log('hello')
             posts.map((post,i) => {if (post._id == action.payload._id ){
                console.log(post,posts.indexOf(post))
                posts[i] = action.payload
                
                
            }})
            return [...posts]
        
        case DELETE:    
            return posts.filter((post)=>post._id != action.payload)
         
        case LIKE:
            console.log('hello')
            posts.map((post,i) => {if (post._id == action.payload._id ){
                console.log(post,posts.indexOf(post))
                posts[i] = action.payload
                
                
            }})
            return [...posts]


        case CREATE:
            return [...posts, action.payload];


            
        default:
            return posts    
    }

}

export default reducer;