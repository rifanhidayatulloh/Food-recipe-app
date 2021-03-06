const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const recipeByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPE_BY_ID_PENDING':
      return { ...state, isLoading: true };
    case 'GET_RECIPE_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data
      };
    case 'GET_RECIPE_BY_ID_REJECTED':
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default recipeByIdReducer;
