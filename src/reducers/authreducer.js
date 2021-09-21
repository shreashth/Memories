import { AUTH ,LOGOUT, ERROR_AUTH } from './constants/actionTypes';




const authReducer = (state={'authData': null,'authMessage':null}, action) =>{

    switch(action.type){

        
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload}))

    

            return {...state, authData: action?.payload}


        case LOGOUT:
            localStorage.clear();

            return {...state, authData: null}


        case ERROR_AUTH:

            
            return {...state,authMessage: action?.payload}

        default:
             return state   

    }

    
    }


export default authReducer;