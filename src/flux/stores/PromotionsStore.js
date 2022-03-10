import {ReduceStore} from 'flux/utils';
import ActionTypes from '../FluxActionTypes';
import { PROMOTIONS } from '../data/promotions'
import FluxDispatcher from './../FluxDispatcher';

class PromotionsStore extends ReduceStore 
{

    constructor()
    {
        super(FluxDispatcher);
    }
    
    getInitialState() {
        return { 
            isLoading:true,
            errMess:null,
            promotions:PROMOTIONS
        };
      }
 

    reduce(state=this.state , action) {
        switch(action.type)
    {    case ActionTypes.ADD_PROMOS:
        return {...state,isLoading:false , errMess:null,promotions:action.payload};
     case ActionTypes.PROMOS_LOADING:
         return {...state,isLoading:true , errMess:null,promotions:[]};
 
     case ActionTypes.PROMOS_FAILED:
        return {...state,isLoading:false , errMess:action.payload,promotions:[]};
        default:
            return state;
    }
    }
}
export default new PromotionsStore();