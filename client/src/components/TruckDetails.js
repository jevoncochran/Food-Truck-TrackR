import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { GOOGLE_API_KEY } from "../config";
import "../styling/TruckDetails.scss";
import StarRatings from "react-star-ratings";
import Modal from "react-modal";
import Header from "./Header";
import TruckOnMap from "./TruckOnMap";
import TruckMenu from "./TruckMenu";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useToasts } from "react-toast-notifications";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import OrderCard from "./OrderCard";


import { addToFavoriteTrucks, setSelectedTruck } from "../actions";

const customStyles = {
  content: {
    width: "32%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "rgb(58, 58, 58)",
    borderRadius: "8px",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.37)",
  },
};

const TruckDetails = (props) => {
  const { addToast } = useToasts();
  const { truckId } = useParams();

  const initialReview = {
    diner_id: props.dinerId,
    star_rating: 0,
    review: "",
  };
  const [review, setReview] = useState(initialReview);
  const [truckCoordinates, setTruckCoordinates] = useState({
    lat: "",
    long: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [menuMode, setMenuMode] = useState(false);
  let subtitle;

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...review,
      [event.target.name]: event.target.value,
    };
    console.log(review);
    /*     validateChange(event);
     */ setReview(newFormData);
  };

  const inputStarRating = (newRating) => {
    setReview({
      ...review,
      star_rating: newRating,
    });
  };

  const submitReview = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axiosWithAuth()
      .post(
        `https://foodtrucktrackr.herokuapp.com/api/trucks/${props.selectedTruck.id}/reviews`,
        review
      )
      .then((res) => {
        console.log(res);
        setReview({
          initialReview,
        });
        props.setSelectedTruck(truckId);
        setSubmitting(false);
        closeModal();
        addToast("Review Added!", {
          appearance: "success",
          autoDismiss: true,
        });
      });
  };

  const openModal = (item) => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const afterOpenModal = () => {
    subtitle.style.color = "white";
  };

  function getTruckCoordinates() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${props.selectedTruck.current_location}&key=${GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTruckCoordinates({
          lat: data.results[0].geometry.location.lat,
          long: data.results[0].geometry.location.lng,
        });
        // console.log(truckCoordinates);
      });
  }

  useEffect(() => {
    getTruckCoordinates();
    console.log(truckCoordinates);
  }, [props.selectedTruck.current_location]);

  useEffect(() => {
    console.log(
      `new value of truckCoordinates: lat: ${truckCoordinates.lat}, long: ${truckCoordinates.long}`
    );
  }, [truckCoordinates]);

  const addToFavs = (e) => {
    e.preventDefault();
    props.addToFavoriteTrucks(props.dinerId, props.selectedTruck.id);
  };

  // const truckInFavs = () => {
  //   if (props.favTrucks.some(el => props.selectedTruck.id === el.id) === true) {
  //     return 1
  //   } else {
  //     return -1
  //   }
  // }

  // disables "Add to favorites" button if truck is already in favorites
  useEffect(() => {
    let add2FavsBtn = document.getElementById("add-to-favs-btn");

    if (props.favTrucks.some(el => props.selectedTruck.id === el.id)) {
      add2FavsBtn.disabled = true;
    }
  }, [props.favTrucks])

  return (
    <div className="truck-details-main">
      <Header history={props.history} />

      <Grid className="truck-detail-pics-grid" container spacing={1}>
        {props.truck_images.slice(0, 4).map((pic) => (
          <Grid className="grid-item" item xs={3}>
            <Card className="pics-card" onClick={null}>
              <img className="pics-img" src={pic.image} alt="pics from truck" />
            </Card>
          </Grid>
        ))}
      </Grid>

      {!menuMode && (
        <div className="details-container">
          <div className="non-map-div">
            <div className="details-truck-container">
              <h1 className="title">{props.selectedTruck.name}</h1>
              <div className="stars-div">
                <StarRatings
                  rating={Number(props.selectedTruck.avg_rating)}
                  starDimension="22px"
                  starSpacing="2px"
                  starRatedColor="#ef903c"
                />
              </div>
              <p className="ratings">
                <span className="avg-rating">
                  {props.selectedTruck.avg_rating}
                </span>{" "}
                <span>{props.selectedTruck.reviews.length} reviews</span>
              </p>
              <p className="type">{props.selectedTruck.cuisine_type}</p>
              <div className="card-buttons-div">
                <button onClick={openModal}>Write review</button>
                <button>Add photo</button>
                <button>Share</button>
                <button id="add-to-favs-btn" className="add-to-favs-btn" onClick={addToFavs}>Add to favorites</button>
              </div>
            </div>

            <div className="pop-items-container">
              <div className="pop-items-title-div">
                <h2 className="pop-items-h2">Popular Items</h2>
                <p className="pop-items-p" onClick={() => setMenuMode(true)}>
                  View full menu
                </p>
              </div>
              <Grid className="pop-items-pics-grid" container spacing={1}>
                {props.menu.slice(0, 3).map((item) => (
                  <Grid item xs={4}>
                    <Card className="menu-item-card">
                      <img
                        className="menu-item-pic"
                        src={item.image}
                        alt="pic of menu item"
                      />
                      <h3 className="menu-item-name">{item.name}</h3>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>

            <div className="customer-reviews-container">
              <h2 className="customer-revs-h2">Customer Reviews</h2>
              <div className="customer-revs-map">
                {props.reviews.map((review) => (
                  <div className="customer-revs-subdiv">
                    <i class="fas fa-user"></i>
                    <p className="reviewer-username">{review.username}</p>
                    <div className="customer-revs-rev-div">
                      <p className="customer-rev-star-rating">
                        <StarRatings
                          rating={Number(review.star_rating)}
                          starDimension="15px"
                          starSpacing="2px"
                          starRatedColor="#ef903c"
                        />
                      </p>
                      <p>{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="map-div" style={{ height: "400px" }}>
            <Card
              className="map-card"
              style={{ height: "400px", width: "100%" }}
            >
              {truckCoordinates.lat && truckCoordinates.long && (
                <TruckOnMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`}
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: "90%" }} />}
                  mapElement={<div style={{ height: "95%" }} />}
                  truckCoordinates={truckCoordinates}
                />
              )}
              <p>{props.selectedTruck.current_location}</p>
            </Card>
          </div>
        </div>
      )}

      {menuMode && <TruckMenu history={props.history} />}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <div className="modal-header">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Leave a Review</h2>
          <button onClick={closeModal}>
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div className="contact-inputs">
          <form onSubmit={submitReview}>
            {submitting ? (
              <Loader
                className="login-loader"
                type="ThreeDots"
                color="white"
                height={80}
                width={80}
              />
            ) : (
              <>
                <StarRatings
                  rating={review.star_rating}
                  starRatedColor="#ef903c"
                  starDimension="28px"
                  starSpacing="2px"
                  changeRating={inputStarRating}
                  numberOfStars={5}
                  name="rating"
                />
                <label htmlFor="review">details (optional)</label>

                <textarea
                  className="text-area"
                  name="review"
                  placeholder="tell us about your visit"
                  rows="8"
                  value={review.review}
                  onChange={inputChange}
                ></textarea>
                <input className="send-btn" type="submit" value="Submit" />
              </>
            )}
          </form>
        </div>
      </Modal>
      {props.orderCardOpen && <OrderCard history={props.history} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    truck_images: state.selectedTruck.truck_images,
    selectedTruck: state.selectedTruck,
    menu: state.selectedTruck.menu,
    reviews: state.selectedTruck.reviews,
    dinerId: state.account.id,
    orderCardOpen: state.orderCardOpen,
    favTrucks: state.account.favTrucks
  };
};

export default connect(mapStateToProps, {
  addToFavoriteTrucks,
  setSelectedTruck,
})(TruckDetails);
