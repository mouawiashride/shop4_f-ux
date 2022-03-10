import {Container} from 'flux/utils';
import App from '../App';

import DisheStore from './stores/DishesStore';
  import  CategoriesStore from './stores/CategoriesStore'
  import  CartStore from './stores/CartStore'
  import  PromotionsStore from './stores/PromotionsStore'
  import Actions from './Actions'
import Middle from '../Middle';
function getStores() {
  return [
    CategoriesStore,
    CartStore
  ];
}



function getState() {
      return {
      cart :CartStore.getState(),
      fetchCart:Actions.fetchCart,
      handleAddToCart:Actions.handleAddToCart,
      handleMinusFromCart:Actions.handleMinusFromCart,
      handleRemoveFromCart:Actions.handleRemoveFromCart,
      handleEmptyCart:Actions.handleEmptyCart,
      handleGenerateToken:Actions.handleGenerateToken,
      handleCaptureOrder:Actions.handleCaptureOrder
      ,
      categories: CategoriesStore.getState(),
      fetchCategories: Actions.fetchCategories,
      
      
    };
  }





export default Container.createFunctional(Middle,getStores,getState);