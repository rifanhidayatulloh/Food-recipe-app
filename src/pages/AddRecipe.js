import React, { useState } from "react";
import NavBarMain from "../components/NavBar";
import Footer from "../components/Footer";
import styleadd from "../assets/styles/Add.module.css";
import { useNavigate } from "react-router-dom";
import { postInsertRecipe } from "../redux/actions/recipes";
import Swal from "sweetalert2";

const Insert = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    video: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      form.title == "" ||
      form.ingredients == "" ||
      form.video == "" ||
      !photo
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All data must be filled",
      });
    } else {
      const data = new FormData();
      data.append("title", form.title);
      data.append("ingredients", form.ingredients);
      data.append("video", form.video);
      data.append("image", photo);

      const token = localStorage.getItem("token");
      postInsertRecipe(data, token)
        .then((response) => {
          Swal.fire("Add Recipe", "Successful Add Recipe", "success");
          return navigate("/profile");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <NavBarMain />
      {/* --------- */}
      <section className={styleadd.containerHero}>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <div className={styleadd.inputPhotoBorder}>
              <p className={styleadd.inputPhotoBorderP}>image</p>
              <i className={`fa-solid fa-image ${styleadd.iconInputImage}`}></i>
              <input
                onChange={(e) => setPhoto(e.target.files[0])}
                className={styleadd.inputPhotoBorderInput}
                type="file"
                accept=".jpg, .png"
              />
            </div>
          </div>
          <div className={styleadd.heroInputTitle}>
            <input
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={styleadd.heroInputTitleInput}
              type="text"
              placeholder="Title"
            />
          </div>
          <div className={styleadd.heroInputIngredients}>
            <textarea
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
              className={styleadd.inputIngredientsTextarea}
              placeholder="Ingredients"
            ></textarea>
          </div>
          <div className={styleadd.heroInputVideo}>
            <input
              onChange={(e) => setForm({ ...form, video: e.target.value })}
              className={styleadd.heroInputVideoInput}
              type="url"
              placeholder="Video"
            />
          </div>
          <div className={styleadd.heroButton}>
            <button type="submit" className={styleadd.heroButtonButton}>
              <h1 className={styleadd.heroButtonButtonH2}>Post</h1>
            </button>
          </div>
        </form>
      </section>
      {/* --------- */}
      <Footer />
    </>
  );
};

export default Insert;
