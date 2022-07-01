import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBarMain from '../components/NavBar';
import Footer from '../components/Footer';
import detailrecipe from '../assets/styles/Detailrecipe.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeById } from '../redux/actions/recipes';
import profileExm from '../assets/images/profileEx.png';

const DetailRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipeById = useSelector((state) => {
    return state.recipeById.data;
  });
  const ingredientsData = recipeById.ingredients;
  const getIngredients = ingredientsData.split(',');
  // console.log(getIngredients);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);

  return (
    <>
      <NavBarMain />

      <div>
        {recipeById.isLoading === true ? (
          <div style={{ height: '50vh', textAlign: 'center' }}>
            <h6>loading...</h6>
          </div>
        ) : recipeById.isError === true ? (
          <div style={{ height: '50vh', textAlign: 'center' }}>
            <h6>{recipeById.errorMessage}</h6>
          </div>
        ) : (
          <div>
            <section className={detailrecipe.containerMain}>
              <div className={detailrecipe.mainJumbotron}>
                <h1 className={detailrecipe.mainJumbotronH1}>{recipeById.title}</h1>
                <div>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${recipeById.photo}`}
                    alt="img"
                    className={detailrecipe.jumbotronMainContentImg}
                  />
                </div>
              </div>
            </section>
            <section className={detailrecipe.containerDetailMain}>
              <div className={detailrecipe.detailMainJumbotron}>
                <h1 className={detailrecipe.detailMainJumbotronH1}>Ingredients</h1>
                <ul className={detailrecipe.detailMainJumbotronUl}>
                  {getIngredients.map((item, index) => (
                    <li key={index} className={detailrecipe.jumbotronUlLi}>
                      -{item}
                    </li>
                  ))}
                </ul>
                <div>
                  <h1 className={detailrecipe.jumbotronContentH1}>Video Step</h1>
                </div>
                <div className="">
                  <button className={detailrecipe.jumbotronIconButton}>
                    <Link to="/" className={detailrecipe.jumbotronIconButtonA}>
                      <i className={`fa-solid fa-play ${detailrecipe.iconButtonAImg}`}></i>
                    </Link>
                  </button>
                </div>
                <div className={detailrecipe.jumbotronComment}>
                  <textarea
                    className={detailrecipe.commentInputComment}
                    placeholder=" Comment :"></textarea>
                </div>
                <div className="">
                  <button className={detailrecipe.jumbotronSendButton}>
                    <a className={detailrecipe.sendButtonA} href="">
                      Send
                    </a>
                  </button>
                </div>
                <div className="">
                  <h1 className={detailrecipe.listCommentH1}>Comment</h1>
                </div>
                <div className="">
                  <img src={profileExm} alt="img" className={detailrecipe.profilUserImg} />
                  <div className={detailrecipe.profilUserCommentText}>
                    <h4 className={detailrecipe.commentTextH4}>Ayudia</h4>
                    <p className={detailrecipe.commentTextP}>
                      Nice recipe. Simple and delicious, Thankyou
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default DetailRecipe;
