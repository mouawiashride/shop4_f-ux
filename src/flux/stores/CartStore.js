import {ReduceStore} from 'flux/utils';
import ActionTypes from '../FluxActionTypes';
import {LEADERS} from '../data/leaders'
import FluxDispatcher from '../FluxDispatcher';

class CartStore extends ReduceStore 
{

    constructor()
    {
        super(FluxDispatcher);  
    }

    getInitialState() {
        return  {
            isLoading:true,
            errMess:null,
            checkoutToken:null,
            cart:{}
        };
      }
    
 

    reduce(state=this.state , action) {
        switch(action.type)
    {   case ActionTypes.ADD_TO_CART:
             return {...state,isLoading:false , errMess:null,cart:action.payload};
        case ActionTypes.EMPTY_CART:
             return {...state,isLoading:false , errMess:null,cart:action.payload};
        case ActionTypes.MINUS_FROM_CART:
             return {...state,isLoading:false , errMess:null,cart:action.payload};
        case ActionTypes.REMOVE_FROM_CART:
            return {...state,isLoading:false , errMess:null,cart:action.payload};
        case ActionTypes.CART_LOADING:
            return {...state,isLoading:true , errMess:null};
        case ActionTypes.RETRIVE_CART:
            return {...state,isLoading:false,errMess:null,cart:action.payload};
        case ActionTypes.CART_FAILED:
              return {...state,isLoading:false , errMess:action.payload,cart:{}};
        case ActionTypes.GENERATE_TOKEN:
                return {...state,isLoading:false , errMess:null,checkoutToken:action.payload};
        default:
            return state;
    }
    }
}
export default new CartStore();