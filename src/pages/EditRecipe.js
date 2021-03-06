import React, { useState } from 'react';
import NavBarMain from '../components/NavBar';
import Footer from '../components/Footer';
import styleadd from '../assets/styles/Add.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { putEditRecipe } from '../redux/actions/recipes';
import Swal from 'sweetalert2';

const Insert = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const idRecipe = queryParams.get('idRecipe');
  const title = queryParams.get('title');
  const ingredients = queryParams.get('ingredients');
  const video = queryParams.get('video');
  // console.log(idRecipe, title, ingredients, video);
  const [photo, setPhoto] = useState('');
  const [form, setForm] = useState({
    title: title,
    ingredients: ingredients,
    video: video
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.title == '' || form.ingredients == '' || form.video == '' || !photo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All data must be filled'
      });
    } else {
      const data = new FormData();
      data.append('title', form.title);
      data.append('ingredients', form.ingredients);
      data.append('video', form.video);
      data.append('image', photo);

      const token = localStorage.getItem('token');
      putEditRecipe(data, token, idRecipe)
        .then(() => {
          Swal.fire('Edit Recipe', 'Successful Edit Recipe', 'success');
          return navigate('/profile');
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
              value={form.title}
              className={styleadd.heroInputTitleInput}
              type="text"
              placeholder="Title"
            />
          </div>
          <div className={styleadd.heroInputIngredients}>
            <textarea
              onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
              value={form.ingredients}
              className={styleadd.inputIngredientsTextarea}
              placeholder="Ingredients"></textarea>
          </div>
          <div className={styleadd.heroInputVideo}>
            <input
              onChange={(e) => setForm({ ...form, video: e.target.value })}
              value={form.video}
              className={styleadd.heroInputVideoInput}
              type="url"
              placeholder="Video"
            />
          </div>
          <div className={styleadd.heroButton}>
            <button type="submit" className={styleadd.heroButtonButton}>
              <h5 className={styleadd.heroButtonButtonA}>Post</h5>
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
