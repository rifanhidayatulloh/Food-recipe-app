import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBarMain from '../components/NavBar';
import Footer from '../components/Footer';
import profilestyle from '../assets/styles/Profile.module.css';
import styles from '../assets/styles/latestrecipe';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { getMyRecipe, deleteRecipe } from '../redux/actions/recipes';
import { getUserDetailId } from '../redux/actions/users';
import profileDefault from '../assets/images/profile-default.png';
import recipeIcon from '../assets/images/recipe-icon.png';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetaiId = useSelector((state) => {
    // return state.userDetaiId.data.rows[0];
    return state.userDetaiId.data;
  });
  const myRecipe = useSelector((state) => {
    return state.myRecipe;
  });

  const token = localStorage.getItem('token');
  useEffect(() => {
    // ---- user ----
    dispatch(getUserDetailId(token));

    // ---- My recipe ----
    dispatch(getMyRecipe(token));
  }, []);

  // ---- Tab ----
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // -----Button Delete ------
  const onClick = (e, idRecipe) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(idRecipe, token)
          .then(() => {
            Swal.fire('Deleted!', 'Your recipe has been deleted.', 'success');
            dispatch(getMyRecipe(token));
          })
          .catch(() => {});
      }
    });
  };

  // -----Button edit ------
  const onClickEdit = (e, idRecipe, title, ingredients, video) => {
    e.preventDefault();
    navigate(
      `/editrecipe?idRecipe=${idRecipe}&title=${title}&ingredients=${ingredients}&video=${video}`
    );
  };

  return (
    <>
      <NavBarMain />
      {/* --------- */}
      <div className={profilestyle.container}>
        <section className="">
          <div className={profilestyle.containerTopMain}>
            {/* ---------------- */}
            {userDetaiId.isLoading === true ? (
              <h1>Loading</h1>
            ) : userDetaiId.isError === true ? (
              <h1>error</h1>
            ) : (
              <div className={profilestyle.containerTopMain}>
                <div className={profilestyle.topMainProfileImg}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${userDetaiId.photo}`}
                    alt="img"
                    className={profilestyle.topMainProfileImg}
                    onError={(e) => {
                      e.target.src = { profileDefault };
                    }}
                  />
                </div>
                <h1 className={profilestyle.topMainH1}>{userDetaiId.user_name}</h1>
              </div>
            )}
            {/* <div className={profilestyle.topMainProfileImg}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${userDetaiId.photo}`}
                alt="img"
                className={profilestyle.topMainProfileImg}
              />
            </div> */}
            {/* <div className={profilestyle.topMainIcon}>
                <img src="" alt="img" className={profilestyle.topMainIconImg} />
              </div> */}
            {/* <h1 className={profilestyle.topMainH1}>{userDetaiId.user_name}</h1> */}
          </div>
        </section>
      </div>

      {/* ------ Bar ------ */}
      <div className="container-fluid">
        <Nav tabs style={{ cursor: 'pointer' }}>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}>
              My Recipe
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}>
              Saved Recipe
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}>
              Like
            </NavLink>
          </NavItem>
        </Nav>

        {/* ---- tab ----- */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            {/* <Row sm="12"> */}
            {myRecipe.data.map((e, i) => {
              // <div key={i}>{console.log(e.title)};</div>;
              return (
                <Col key={i} className="d-inline-flex ms-0 ms-lg-2 mt-3">
                  <Card inverse style={styles.border} className="ms-4 ms-lg-5 mb-5 me-0 me-lg-0">
                    <Link to={`/${e.recipe_id}`}>
                      <CardImg
                        style={styles.img}
                        alt="Card image"
                        src={`${process.env.REACT_APP_BACKEND_URL}/${e.photo}`}
                        onError={(e) => {
                          e.target.src = { recipeIcon };
                        }}
                      />
                      <CardImgOverlay style={styles.title}>
                        <CardTitle tag="h5" style={styles.title}>
                          <div style={styles.font}>{e.title}</div>
                        </CardTitle>
                      </CardImgOverlay>
                    </Link>
                    <div>
                      <form>
                        <button
                          onClick={(event) => onClick(event, e.recipe_id)}
                          className={`${profilestyle.boxIconDelete}`}>
                          <i
                            className={`${profilestyle.iconDeleteRecipe} fa-solid fa-trash-can`}></i>
                        </button>
                      </form>
                    </div>
                    <div>
                      <form>
                        <button
                          onClick={(event) =>
                            onClickEdit(event, e.recipe_id, e.title, e.ingredients, e.video)
                          }
                          className={`${profilestyle.boxIconEdit}`}>
                          <i
                            className={`${profilestyle.iconDeleteRecipe} fa-solid fa-pen-to-square`}></i>
                        </button>
                      </form>
                    </div>
                  </Card>
                </Col>
              );
            })}
            {/* </Row> */}
          </TabPane>
          <TabPane tabId="2" style={{ height: '365px' }}>
            <Row>
              <Col sm="12">
                <h4>Save Recipe</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3" style={{ height: '365px' }}>
            <Row>
              <Col sm="12">
                <h4>Like Recipe</h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>

      {/* --------- */}
      <Footer />
    </>
  );
};

export default Profile;
