const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const myRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MYRECIPE_PENDING':
      return { ...state, isLoading: true };
    case 'GET_MYRECIPE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data
      };
    case 'GET_MYRECIPE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default myRecipeReducer;
