import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import LatestRecipe from "../components/LatesRecipe";
import Footer from "../components/Footer";
import homestyle from "../assets/styles/home.module.css";
import { Container, Row, Col } from "reactstrap";
// --------------------
import { useSelector, useDispatch } from "react-redux";
import { getLatestRecipe } from "../redux/actions/recipes";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
  });
  const onSubmit = (e) => {
    const body = {
      title: form.title,
    };
    e.preventDefault();
    if (body.title.length === 0) {
      alert("Data must be filed");
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
                    <h1 className={homestyle.jumbotronPointH1}>
                      Discover Recipe & Dilecious Food
                    </h1>
                    <div>
                      <div className={homestyle.iconDecoration}>
                        <i
                          className={`fa-solid fa-magnifying-glass ${homestyle.iconSearch}`}
                        ></i>
                      </div>
                      <form onSubmit={(e) => onSubmit(e)}>
                        <input
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                          type="text"
                          id="input"
                          placeholder="Search Restaurant, Food"
                          className={homestyle.search}
                        />
                      </form>
                    </div>
                  </div>
                </Col>
                <Col className="bg-warning" xs="4">
                  <div>
                    <img
                      src="https://s3-alpha-sig.figma.com/img/2ca7/faff/4da51338c06dd21688b82eae3bc9dfa6?Expires=1650844800&Signature=RIAAwPyMnN9sDA~c8Vx37nsEZmfiLIZ6GG7h2MNZd7paGI2p4uAg65T6oU8WaDhakelGrKs1xwc-UrgHIYT89AiyFc72oh2QiE0g8luZRbgBPnQXwxh1~0JqrwW9n16h98vvpU4o9isbtvAZXSdbmS1wFdthyKyFPplbOaZ6NmxRxqEUHgR~CJywLOQBeHhvNNHt3CQ-Ku3G1tcYeLMcHg8L6vjCwMBZUP7G13keRoshWpkOH6vr7ogdNa~djMUphT7c8hnnJIX0n2cvqxeb9G2Zj2C4j8tT~GfbgfuraEWSw1SSFbLWF0KggZeUVnylNnn5tIr8BKEQt4H61zpcYw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                      alt="image"
                      className={homestyle.decorationImg}
                    />
                  </div>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
        {/* --- section 2 --- */}
        <Row className={homestyle.hero}>
          <Col xs="6">
            <div style={{ position: "relative" }}>
              <div>
                <h1 className={homestyle.decorationContentH1}>
                  Popular For You !
                </h1>
                <div className={homestyle.decorationContentBorder}></div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/e20b/679e/52207741d95649c4cb58a57ba663027f?Expires=1650844800&Signature=NxY1FvFXnvn4ivra4pxiWZPNIu4UQY5704bDmh8GcP7~B0rCYn9gZd7fdeHWATJTKwWxZACIzZt2Zu4nyOx~v8~8XWZdavNAIrF-J1Vw8C6uH8wJmOzxvpFE7-rjJSx~cxWnW1aiV0IKzrK9ah3e7YXNbZ-nkw5-oTq6BSdvR6jHQS-zcNpxN0ZyZ4qcETdr3e73v4yVdcovdXFr6kR~M-oO~UR-9tVG0nLf2~Sbu03dQ54YVH2gUBoJdqMGyLKa-fBGobZmeSe6BbE8UVKwXmAHvAaMiiR~PoGtgWGfl27tHteiVMAKfBbNvz8n9d2b4pek8LtkNS58w2bQ0h-Wmg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt=""
                  className={homestyle.decorationContentImg}
                />
              </div>
            </div>
          </Col>
          <Col xs="6">
            <div style={{ position: "relative" }}>
              <div>
                <h1 className={homestyle.mainJumbotronH1}>
                  Healthy Bone Broth Ramen (Quick & Easy)
                </h1>
                <p className={homestyle.mainJumbotronP}>
                  Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen
                  in a hurry? That's right!
                </p>
                <div className={homestyle.mainJumbotronButton}>
                  <button className={homestyle.jumbotronButtonButton}>
                    <Link
                      to="/detail-recipe"
                      className={homestyle.jumbotronButtonA}
                    >
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
            <div style={{ position: "relative" }}>
              <div>
                <h1 className={homestyle.decorationContentH1}>
                  Popular Recipe !{" "}
                </h1>
                <div className={homestyle.decorationContentBox}></div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/a940/c01b/c2792cef25a0bfa97a2bd8c65b80f9c5?Expires=1650844800&Signature=IqXV5VER~KytLlE8ceWM2junqiT-ZBiY5A8A9nJ4V7hirYHrdAHK6y8XViTx1FEQyEYmvBjNpg1myRCM8ss6nMkpJoZbv2pV4LVcBAUl-7xdaYKHKPh3ymqSC~18Nl7eUfhVdxoaHxbf5OVLa8HNdoQZof8xAxyfFtCi2vy63DqPGWW5fP1BKkcf647W8YMWfrtaxJ6XqzrRp~EVNsXZ5Nd~G9U~ToagswAnz9qPAVRONj5QpNrLqjH4wi3Hehlttq4FodSFj7MVfid5HRrO8DVYaMzAx789n4mCszmrb5TjlyVa~lOa4URyPRM7xigBPSHw~Z6NihWmHbv8WJOgbA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt=""
                  className={homestyle.decorationContentImg}
                />
                <h1 className={homestyle.decorationContentH2}>Latest Recipe</h1>
              </div>
            </div>
          </Col>
          <Col xs="6">
            <div style={{ position: "relative" }}>
              <div>
                <h1 className={homestyle.mainJumbotronH1}>
                  Healthy Bone Broth Ramen (Quick & Easy)
                </h1>
                <p className={homestyle.mainJumbotronP}>
                  Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen
                  in a hurry? That's right!
                </p>
                <div className={homestyle.mainJumbotronButton}>
                  <button className={homestyle.jumbotronButtonButton}>
                    <Link
                      to="/detail-recipe"
                      className={homestyle.jumbotronButtonA}
                    >
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

      {/* --------------- */}
      <Footer />
    </>
  );
};

export default Home;
