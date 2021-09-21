import React,{ useState, useEffect} from 'react'
import Post from './Post/Post';
import useStyles from './style';
import { useSelector } from 'react-redux'; 
import { Grid, CircularProgress } from "@material-ui/core"
import { fetchPosts } from "C:/Users/user/Desktop/Memories/client/src/api/index.js"



function Posts({ setCurrentId }) {
    const posts = useSelector((state)=>state.posts);
   

    const classes = useStyles();


    console.log(posts)
    return (
        <div>
           {!posts.length ? <CircularProgress/> : (
               <Grid className={classes.container} container alignItems="stretch" spacing={3}>
               {posts.map((post) => (
                   <Grid key={post._id} item xs={12} sm={5}>

                       <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
               ))}

               </Grid>
           )}
        </div>
    )
}

export default Posts;
