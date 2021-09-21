import * as api from '../api/index'
import { AUTH, ERROR_AUTH } from '.././reducers/constants/actionTypes'


export const signup = (formData,history) => async (dispatch) =>{

    

    try{

        
        await api.signup(formData)
                 .then(response => {console.log(response); dispatch({type:AUTH, payload: response.data})})



         history.push('/')

    }catch(error){

        // console.log(error)
        dispatch({type:ERROR_AUTH, payload: error.response.data})

    }


}




export const signin = (formData,history) => async (dispatch) =>{

    try{

        // console.log('hello authenticationn signin', formData, history)
        
        await api.signin(formData)
                 .then(response => {console.log(response); dispatch({type:AUTH, payload: response.data})})
     
     
      
    
    
    }catch(error){

    
        dispatch({type:ERROR_AUTH, payload: error.response.data})

    

    }  





}