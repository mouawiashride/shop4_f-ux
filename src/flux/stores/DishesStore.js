import {ReduceStore} from 'flux/utils';
import ActionTypes from '../FluxActionTypes';
import  {DISHES} from './../data/dishes'
import FluxDispatcher from './../FluxDispatcher';

class DishesStore extends ReduceStore 
{

    constructor()
    {
        super(FluxDispatcher);
    }
    
    getInitialState() {
        return  {
            isLoading:true,
            errMess:null,
            dishes:DISHES
        };
      }
 

    reduce(state=this.state , action) {
        switch(action.type)
    {case ActionTypes.ADD_DISHES:
        return {...state,isLoading:false , errMess:null,dishes:action.payload}
     case ActionTypes.DISHES_LOADING:
         return {...state,isLoading:true , errMess:null,dishes:[]}
     case ActionTypes.DISHES_FAILED:
        return {...state,isLoading:false , errMess:action.payload,dishes:[]}
        default:
            return state;
    }
    }

} 

export default new DishesStore();