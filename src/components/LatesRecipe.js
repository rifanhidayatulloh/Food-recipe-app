import React from "react";
import styles from "../assets/styles/latestrecipe";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const LatestRecipe = (props) => {
  // console.log(props.photo);
  return (
    <>
      <div>
        <Card
          inverse
          style={styles.border}
          className="ms-4 ms-lg-5 mb-5 me-0 me-lg-0"
        >
          <Link to={`/${props.id}`}>
            <CardImg
              style={styles.img}
              alt="Card image"
              src={`${process.env.REACT_APP_BACKEND_URL}/${props.photo}`}
            />
            <CardImgOverlay style={styles.title}>
              <CardTitle tag="h5" style={styles.title}>
                <div style={styles.font}>{props.title}</div>
              </CardTitle>
            </CardImgOverlay>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default LatestRecipe;
