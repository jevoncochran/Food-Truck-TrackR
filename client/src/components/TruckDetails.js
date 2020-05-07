import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { GOOGLE_API_KEY } from "../config";
import "../styling/TruckDetails.scss";

import Header from "./Header";
import TruckOnMap from "./TruckOnMap";
import TruckMenu from "./TruckMenu";

import { addToFavoriteTrucks } from "../actions";

const TruckDetails = props => {
    const [truckCoordinates, setTruckCoordinates] = useState({
        lat: '',
        long: ''
    })

    const [menuMode, setMenuMode] = useState(false);

    function getTruckCoordinates() {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${props.selectedTruck.current_location}&key=${GOOGLE_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTruckCoordinates({
                lat: data.results[0].geometry.location.lat,
                long: data.results[0].geometry.location.lng
            });
            // console.log(truckCoordinates);
        })
    }

    useEffect(() => {
        getTruckCoordinates();
        console.log(truckCoordinates);
    }, [props.selectedTruck.current_location])

    useEffect(() => {
        console.log(`new value of truckCoordinates: lat: ${truckCoordinates.lat}, long: ${truckCoordinates.long}`)
    }, [truckCoordinates])

    const addToFavs = e => {
        e.preventDefault();
        props.addToFavoriteTrucks(props.dinerId, props.selectedTruck.id)
    }

    return (
        <div className="truck-details-main">
            <Header history={props.history} />

            <Grid className="truck-detail-pics-grid" container spacing={1}>
                {props.truck_images.slice(0, 4).map(pic => (
                    <Grid className="grid-item" item xs={3}>
                        <Card className="pics-card" onClick={null}>
                            <img className="pics-img" src={pic.image} alt="pics from truck" />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            {!menuMode && <div className="details-container">
                <div className="non-map-div">
                    <div className="details-truck-container">
                            <h1 className="title">{props.selectedTruck.name}</h1>
                            <p className="ratings"><span className="avg-rating">{props.selectedTruck.avg_rating}</span> <span>{props.selectedTruck.reviews.length} reviews</span></p>
                            <p className="type">{props.selectedTruck.cuisine_type}</p>
                            <div className="card-buttons-div">
                                <button>Write review</button>
                                <button>Add photo</button>
                                <button>Share</button>
                                <button onClick={addToFavs}>Add to favorites</button>
                            </div>
                    </div>

                    <div className="pop-items-container">
                        <div className="pop-items-title-div">
                            <h2 className="pop-items-h2">Popular Items</h2>
                            <p className="pop-items-p" onClick={() => setMenuMode(true)}>View full menu</p>
                        </div>
                        <Grid className="pop-items-pics-grid" container spacing={1}>
                            {props.menu.slice(0, 3).map(item => (
                                <Grid item xs={4}>
                                    <Card className="menu-item-card">
                                        <img className="menu-item-pic" src={item.image} alt="pic of menu item" />
                                        <h3 className="menu-item-name">{item.name}</h3>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                    <div className="customer-reviews-container">
                        <h2 className="customer-revs-h2">Customer Reviews</h2>
                        <div className="customer-revs-map">
                            {props.reviews.map(review => (
                                <div className="customer-revs-subdiv">
                                    <i class="fas fa-user"></i>
                                    <p className="reviewer-username">{review.username}</p>
                                    <div className="customer-revs-rev-div">
                                        <p className="customer-rev-star-rating">{review.star_rating} stars</p>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="map-div" style={{ height: '400px' }}>
                    <Card className="map-card" style={{ height: '400px', width: '100%' }}>
                    {truckCoordinates.lat && truckCoordinates.long && <TruckOnMap
                        googleMapURL = {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`}
                        loadingElement = {<div style={{ height: '100%' }} />}
                        containerElement = {<div style={{ height: '90%' }} />}
                        mapElement = {<div style={{ height: '95%' }} />}
                        truckCoordinates={truckCoordinates}
                    />}
                    <p>{props.selectedTruck.current_location}</p>
                    </Card>
                </div>
            </div>}

            {menuMode && (
                <TruckMenu history={props.history} />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        truck_images: state.selectedTruck.truck_images,
        selectedTruck: state.selectedTruck,
        menu: state.selectedTruck.menu,
        reviews: state.selectedTruck.reviews,
        dinerId: state.account.id
    }
}

export default connect(mapStateToProps, { addToFavoriteTrucks })(TruckDetails);