const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_SEARCH_RECIPE_PENDING':
      return { ...state, isLoading: true };
    case 'GET_LIST_SEARCH_RECIPE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data
      };
    case 'GET_LIST_SEARCH_RECIPE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload.response.data.message
      };
    default:
      return state;
  }
};

export default searchReducer;
