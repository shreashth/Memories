import React, {useState} from 'react';
import useStyles from './style';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from 'moment';
import {useDispatch} from 'react-redux'
import { likePost, deletePost } from 'C:/Users/user/Desktop/Memories/client/src/actions/posts.js'

// import { set } from 'mongoose';

function Post({ post, setCurrentId }) {
    const classes = useStyles();

    const  dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'));

    const LikeCount = () =>{
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
              ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
              ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
              );
          }
      
          return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
        };
    

   




    return (
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() =>  setCurrentId(post._id)} >
                            <MoreHorizIcon fontSize="small" />
                        </Button>
                    </div>
                )}
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary">{post.tags[0].split(", ").map((tag) => ` #${tag} `)}</Typography>
                        {/* <Typography className={classes.title} variant="h6" > {post.title}</Typography> */}
                    </div>

                    <div >
                        
                        <Typography  className={classes.title} variant="h6" > {post.title}</Typography>
                    </div>

                    <CardContent>
                    <Typography className={classes.message} variant="h5" color="textSecondary" gutterBottom> {post.message}</Typography>

                    </CardContent>

                    <CardActions className={classes.cardActions}>
                        <Button size="small" disabled={!user?.result} color="primary" onClick={() => {
                                                                             dispatch(likePost(post._id))  } }>
                            
                             <LikeCount />
                        </Button>
                    
                     {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id))}}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    )}
                    </CardActions>

                
            </Card>
        </div>
    )
}

export default Post
