import React, { useState, useEffect } from 'react';
// import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LatestRecipe from '../components/LatesRecipe';
import Footer from '../components/Footer';
import homestyle from '../assets/styles/home.module.css';
import { Container, Row, Col } from 'reactstrap';
// --------------------
import { useSelector, useDispatch } from 'react-redux';
import { getLatestRecipe } from '../redux/actions/recipes';

import imgLanding1 from '../assets/images/imgLanding1.jpg';
import imgLanding2 from '../assets/images/imgLanding2.jpg';
import imgLanding3 from '../assets/images/imgLanding3.jpg';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: ''
  });
  const onSubmit = (e) => {
    const body = {
      title: form.title
    };
    e.preventDefault();
    if (body.title.length === 0) {
      alert('Data must be filed');
    } else {
      navigate(`/recipe?search=${body.title}`);
    }
  };
  const latestRecipe = useSelector((state) => {
    return state.latestRecipe;
  });
  // console.log(latestRecipe);
  useEffect(() => {
    dispatch(getLatestRecipe());
  }, []);
  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col>
            {/* --- section 1 --- */}
            <section>
              <Row className={homestyle.hero}>
                <Col xs="8">
                  <div className={homestyle.jumbotron}>
                    <h1 className={homestyle.jumbotronPointH1}>Discover Recipe & Dilecious Food</h1>
                    <div>
                      <div className={homestyle.iconDecoration}>
                        <i className={`fa-solid fa-magnifying-glass ${homestyle.iconSearch}`}></i>
                      </div>
                      <form onSubmit={(e) => onSubmit(e)}>
                        <input
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          type="text"
                          id="input"
                          placeholder=" Search Restaurant, Food"
                          className={homestyle.search}
                        />
                      </form>
                    </div>
                  </div>
                </Col>
                <Col className="bg-warning" xs="4">
                  <div>
                    <img src={imgLanding1} alt="image" className={homestyle.decorationImg} />
                  </div>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
        {/* --- section 2 --- */}
        <Row className={homestyle.hero}>
          <Col xs="6">
            <div style={{ position: 'relative' }}>
              <div>
                <h1 className={homestyle.decorationContentH1}>Popular For You !</h1>
                <div className={homestyle.decorationContentBorder}></div>
                <img src={imgLanding2} alt="" className={homestyle.decorationContentImg} />
              </div>
            </div>
          </Col>
          <Col xs="6">
            <div style={{ position: 'relative' }}>
              <div>
                <h1 className={homestyle.mainJumbotronH1}>
                  Healthy Bone Broth Ramen (Quick & Easy)
                </h1>
                <p className={homestyle.mainJumbotronP}>
                  Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? Thats
                  right!
                </p>
                <div className={homestyle.mainJumbotronButton}>
                  <button className={homestyle.jumbotronButtonButton}>
                    <Link to="/" className={homestyle.jumbotronButtonA}>
                      Learn More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* --- section 3 --- */}
        <Row className={homestyle.hero}>
          <Col xs="6">
            <div style={{ position: 'relative' }}>
              <div>
                <h1 className={homestyle.decorationContentH1}>Popular Recipe ! </h1>
                <div className={homestyle.decorationContentBox}></div>
                <img src={imgLanding3} alt="" className={homestyle.decorationContentImg} />
                <h1 className={homestyle.decorationContentH2}>Latest Recipe</h1>
              </div>
            </div>
          </Col>
          <Col xs="6">
            <div style={{ position: 'relative' }}>
              <div>
                <h1 className={homestyle.mainJumbotronH1}>
                  Healthy Bone Broth Ramen (Quick & Easy)
                </h1>
                <p className={homestyle.mainJumbotronP}>
                  Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? Thats
                  right!
                </p>
                <div className={homestyle.mainJumbotronButton}>
                  <button className={homestyle.jumbotronButtonButton}>
                    <Link to="/" className={homestyle.jumbotronButtonA}>
                      Learn More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* --- section 3 --- */}
      {latestRecipe.isLoading === true ? (
        <h1>loading</h1>
      ) : latestRecipe.isError === true ? (
        <h1>error</h1>
      ) : (
        <div className={homestyle.itemCard}>
          {latestRecipe.data.map((item, index) => {
            return (
              <Row key={index} className="d-inline-flex ms-3 ms-lg-2">
                <LatestRecipe title={item.title} photo={item.photo} id={item.recipe_id} />
              </Row>
            );
          })}
        </div>
      )}

      {/* --------------- */}
      <Footer />
    </>
  );
};

export default Home;
