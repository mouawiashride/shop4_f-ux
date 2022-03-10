import {ReduceStore} from 'flux/utils';
import ActionTypes from '../FluxActionTypes';
import FluxDispatcher from '../FluxDispatcher';

class CategoriesStore extends ReduceStore 
{

    constructor()
    {
        super(FluxDispatcher);
      
        
    }

    getInitialState() {
        return  {
            isLoading:true,
            errMess:null,
            categories:[]
        };
      }
    
 

    reduce(state=this.state , action) {
        switch(action.type)
    {   case ActionTypes.CATEGORIES_LOADING:
        return {...state,isLoading:true};
        case ActionTypes.CATEGORIES_FAILED:
            return {...state,isLoading:false , errMess:action.payload,categories:[]};
        case ActionTypes.GIT_CATEGORIES:
            return {...state, isLoading:false ,categories:action.payload };
        default:
            return state;
    }
    }
}
export default new CategoriesStore();