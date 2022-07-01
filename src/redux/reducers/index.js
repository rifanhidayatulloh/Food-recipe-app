import { combineReducers } from 'redux';

import latestRecipeReducer from './latestRecipe';
import searchRecipeReducer from './seacrhRecipe';
import myRecipeReducer from './myRecipe';
import getUserDetailId from './userDetailId';
import recipeByIdReducer from './recipeById';

const rootReducer = combineReducers({
  // --------recipes------
  latestRecipe: latestRecipeReducer,
  searchRecipe: searchRecipeReducer,
  myRecipe: myRecipeReducer,
  recipeById: recipeByIdReducer,

  // ----------user--------
  userDetaiId: getUserDetailId
});

export default rootReducer;
