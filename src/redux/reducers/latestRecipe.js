const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const latestRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_LATEST_RECIPE_PENDING":
      return { ...state, isLoading: true };
    case "GET_LIST_LATEST_RECIPE_FULFILLED":
      return { ...state, isLoading: false, data: action.payload.data.data };
    case "GET_LIST_LATEST_RECIPE_REJECTED":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default latestRecipeReducer;
