import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBarMain from "../components/NavBar";
import Footer from "../components/Footer";
import detailrecipe from "../assets/styles/Detailrecipe.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeById } from "../redux/actions/recipes";

const DetailRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeById = useSelector((state) => {
    return state.recipeById.data[0];
    // return state.recipeById;
  });

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);
  return (
    <>
      <NavBarMain />
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
            {/* <div className="icon-1">
              <img src="" alt="icon" />
            </div>
            <div className="icon-2">
              <img src="" alt="icon" />
            </div> */}
          </div>
        </section>
        <section className={detailrecipe.containerDetailMain}>
          <div className={detailrecipe.detailMainJumbotron}>
            <h1 className={detailrecipe.detailMainJumbotronH1}>Ingredients</h1>
            <ul className={detailrecipe.detailMainJumbotronUl}>
              <li className={detailrecipe.jumbotronUlLi}>
                - {recipeById.ingredients}
              </li>
            </ul>
            <div>
              <h1 className={detailrecipe.jumbotronContentH1}>Video Step</h1>
            </div>
            <div className="">
              <button className={detailrecipe.jumbotronIconButton}>
                <Link to="/" className={detailrecipe.jumbotronIconButtonA}>
                  <i
                    className={`fa-solid fa-play ${detailrecipe.iconButtonAImg}`}
                  ></i>
                </Link>
              </button>
            </div>
            <div className={detailrecipe.jumbotronComment}>
              <textarea
                className={detailrecipe.commentInputComment}
                placeholder="Comment :"
              ></textarea>
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
              <img
                src="https://s3-alpha-sig.figma.com/img/3d1d/4c1c/c08f710828e1d2aacf71af8c92583062?Expires=1650844800&Signature=CIPGwGLE9QhceRNlGybm~0yvf0Ex0G0HQfvX9gOUlmLVwBd8G5fzT6rzqoMMjCFw47Gbnd8r012T~Pix4Qj2SF3EMHSUCNXhbLkGDixhvROF-UDHGRdz0ciYtFAt-lhJjUbRMgWjfq2P~3ZrTEc~5n2Ct4HyQS86bsbOe6ACeoo2vEC-cxXKrAY6dRaNk~tb-nmO9sy~Ow3EMjUBsXoKhsSM7awvpzY3OOvOI7aCtdJcLRco5SPaBjTLXJ0FiP04ei6ZUQ0rQO1TyJwOoHeZAIRJjFhWyf2rcyJiZIytppfJLtqaU3fTz6DazQqeo4dOfBpvrQd-kxXMppbxA3BtDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt="img"
                className={detailrecipe.profilUserImg}
              />
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
      <Footer />
    </>
  );
};

export default DetailRecipe;
