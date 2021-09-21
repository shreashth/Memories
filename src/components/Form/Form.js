import React,{ useEffect, useState } from 'react'; 
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import useStyles from './style';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost , updatePost } from '../../actions/posts';
// import { updatePost } from '../../../../server/controllers/posts';

function Form({ currentId, setCurrentId }) {
    const classes = useStyles();
    const [postData, setPostData] = useState({ title: '', message:'', tags:'', selectedFile: ''   })
    const posts = useSelector((state)=>state.posts);
    const  dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'))
 
    
    useEffect(()=>{
        

        for(let post of posts){
            if(post._id == currentId){
               
                setPostData({ title: `${post.title}`, message: `${post.message}`, tags: `${post.tags}`, selectedFile: `${post.selectedFile}`   })
                
                setCharState({ chars_left: 200-post.message.length})
                }
            }
           

        },[currentId])
        
        
        
        
        const handleSubmit= (e) =>{
            e.preventDefault();
            
            if(currentId){
                
                
        

                dispatch(updatePost(currentId, {...postData, name: `${user?.result?.name}`}))
                
                setCurrentId(null)
            }else{
            dispatch(createPost({...postData, name: `${user?.result?.name}`}))

        

        }
        clear()
    }
    
    const clear = ()=>{
        setPostData({ title: '', message:'', tags:'', selectedFile: ''   })

        setCurrentId(null)

    }
    const [charState,setCharState]= useState({ chars_left: 200 })

    
    const maxChar = 200;

    const handleWordCount = event => {
        const charCount = event.target.value.length;
        const charLength = maxChar - charCount;
        setCharState({ chars_left: charLength });


    }
 

    const [messageFocused,setMessageFocused]= useState(false)

    


    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
             <Typography variant="h6" align="center">
                Please Sign In to create your own memories and like other's memories
             </Typography>
             </Paper>
        )

    }

 
    
    return (
        
        <Paper className= {classes.paper}>
            <form autoComplete= 'off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >{currentId ? 'Editing a Memory' : 'Creating a Memory'}</Typography>
                <TextField name="title" variant= "outlined" label= "Title" fullWidth  value={postData.title} onChange={(e)=>setPostData({ ...postData, title:e.target.value})}  />
                <TextField name="message" multiline rows={4} variant= "outlined" onBlur={()=>setMessageFocused(false)} onFocus={()=> setMessageFocused(true) } label= {messageFocused ?  'Message '+ ` (${charState.chars_left}/200)` :'Message'} fullWidth  value={postData.message} onChange={(e)=>{ if(e.target.value.length< maxChar+1){ handleWordCount(e);  setPostData({ ...postData, message:e.target.value})}; }}  />
                <TextField name="tags" variant= "outlined" label= "Tags" fullWidth  value={postData.tags} onChange={(e)=>setPostData({ ...postData, tags:e.target.value})}  />
                
                <div className= {classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone= {({base64})=> setPostData({...postData, selectedFile: base64 })}></FileBase>
                </div>
                <Button className={classes.buttonClear} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit">Submit</Button>
                
            </form>
        </Paper>
    )
}

export default Form;
