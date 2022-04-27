import axios from "axios";

export const getLatestRecipe = () => {
  return {
    type: "GET_LIST_LATEST_RECIPE",
    payload: axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/recipe-latest`,
      method: "GET",
    }),
  };
};

export const getSearchRecipe = (params) => {
  return {
    type: "GET_LIST_SEARCH_RECIPE",
    payload: axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/recipe-select-public?search=${params}&page&limit`,
      method: "GET",
    }),
  };
};

export const getMyRecipe = (token) => {
  return {
    type: "GET_MYRECIPE",
    payload: axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/recipe-myrecipe?limit=100`,
      headers: {
        token: token,
      },
    }),
  };
};

export const deleteRecipe = (idRecipe, token) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/recipe-delete/${idRecipe}`,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const getRecipeById = (recipeId) => {
  return {
    type: "GET_RECIPE_BY_ID",
    payload: axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/recipe-by-id/${recipeId}`,
    }),
  };
};

export const postInsertRecipe = (body, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/recipe-insert`, body, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const putEditRecipe = (body, token, idRecipe) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/recipe-update/${idRecipe}`,
        body,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
