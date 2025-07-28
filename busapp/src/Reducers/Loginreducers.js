import {combineReducers} from 'redux'
const LoginReducer=(state={authed:false,userdata:{}},action)=>{
    switch(action.type){
        case "Login":return{...state,authed:action.authed,userdata:action.userdata};
        default :return state;
    }
}

export const rootreducer=combineReducers({
    LoginReducer,
})