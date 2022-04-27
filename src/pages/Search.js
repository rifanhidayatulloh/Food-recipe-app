import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import NavBarMain from "../components/NavBar";
import Footer from "../components/Footer";
import LatestRecipe from "../components/LatesRecipe";
import homestyle from "../assets/styles/home.module.css";
import { Row, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSearchRecipe } from "../redux/actions/recipes";

const SearchRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const search = queryParams.get("search");
  const [form, setForm] = useState(search);
  const searchRecipe = useSelector((state) => {
    return state.searchRecipe;
  });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchRecipe(form));
    navigate(`/recipe?search=${form}`);
  };
  useEffect(() => {
    dispatch(getSearchRecipe(search));
  }, []);
  return (
    <>
      <NavBarMain />

      {/* --------- */}
      <div>
        <br />
        <br />
        <br />

        {/* ------ */}
        <Container>
          <div style={{ marginBottom: "30px", position: "relative" }}>
            <h1 style={{ fontFamily: "sans-serif", color: "#8692a6" }}>
              search
            </h1>
            <div className={homestyle.iconDecoration}>
              <i
                className={`fa-solid fa-magnifying-glass ${homestyle.iconSearch}`}
              ></i>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                type="text"
                id="input"
                placeholder="Search Restaurant, Food"
                className={homestyle.search}
              />
            </form>
          </div>
        </Container>

        {/* --- card --- */}
        {searchRecipe.isLoading === true ? (
          <div style={{ height: "50vh", textAlign: "center" }}>
            <h1>loading</h1>
          </div>
        ) : searchRecipe.isError === true ? (
          <div style={{ height: "50vh", textAlign: "center" }}>
            <h1>{searchRecipe.errorMessage}</h1>
          </div>
        ) : (
          <div className={homestyle.itemCard}>
            {searchRecipe.data.map((item, index) => {
              return (
                <Row key={index} className="d-inline-flex ms-3 ms-lg-2">
                  <LatestRecipe
                    title={item.title}
                    photo={item.photo}
                    id={item.recipe_id}
                  />
                </Row>
              );
            })}
          </div>
        )}
      </div>

      {/* --------- */}
      <Footer />
    </>
  );
};

export default SearchRecipe;
