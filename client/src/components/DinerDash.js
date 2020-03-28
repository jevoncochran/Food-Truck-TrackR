import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GoogleComponent } from "react-google-location";
import "../styling/DinerDash.scss";
import truck from "../assets/truck2.png";
import { GOOGLE_API_KEY } from "../config";


import { axiosWithAuth } from "../utils/axiosWithAuth";

import { clientSignOut, editLocation, getAllTrucks, getTruckDistances } from "../actions";

import DinerFooter from "./DinerFooter";

const useStyles = makeStyles({
//     // root: {
//     //   maxWidth: 345,
//     //   marginBottom: 30,
//     //   padding: 10
//     // },
    media: {
      height: 140,
    },
  });

const DinerDash = props => {
    const [locationData, setLocationData] = useState({
        latitude: null,
        longitude: null,
        userAddress: null
    })
    // tells component whether it should render form to edit diner location
    const [locationEditMode, setLocationEditMode] = useState(false);

    // holds value of updated location
    const [updatedLocation, setUpdatedLocation] = useState({
        location: ''
    })

    // const [loadingComponent, setLoadingComponent] = useState(true);

    const [truckDistance, setTruckDistance] = useState([]);

    // function that allows diner to sign out
    const logout = e => {
        e.preventDefault();
        props.clientSignOut();
        props.history.push('/');
    }

    // function that allows diner to edit location
    const changeLocation = e => {
        console.log(updatedLocation);
        e.preventDefault();
        props.editLocation(updatedLocation, props.id);
        setLocationEditMode(false);
    }

    const classes = useStyles();

    // runs function that gets lat and long coordinates if the browsers supports this feature
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates);
          } else {
            alert("Geolocation is not supported by this browser.");
          }
    }

    // tells app to run the fn that triggers the get coordinates fn as as soon as app renders 
    useEffect(() => {
        getLocation();
    }, [])

    // function to get user coordinates for lat and long
    const getCoordinates = position => {
        // console.log(position);
        setLocationData({
            ...locationData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    // gets user address as soon as component renders and runs each time user updates latitude or longitude
    useEffect(() => {
        if (locationData.latitude && locationData.longitude) {
            getUserAddress();
        }
    }, [locationData.latitude, locationData.longitude])

    // function that gets user address 
    function getUserAddress() {
        console.log(locationData.latitude, locationData.longitude);
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationData.latitude},${locationData.longitude}&sensor=false&key=${GOOGLE_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLocationData({
                ...locationData,
                userAddress: data.results[0].formatted_address
            })
        })
        .catch(err => alert(err));
    }

    // function getDistance() {
    //     fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${props.location}&destinations=${locationData.userAddress}&departure_time=now&key=${GOOGLE_API_KEY}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data.rows[0].elements[0].distance);
    //         return data.rows[0].elements[0].distance;
    //     })
    // }

    const getTruckDistance = () => {
        props.trucks.forEach((truck, i, truckArr) => {
            props.getTruckDistances(props.location, truck.current_location);
            // if (i === props.trucks.length - 1) {
            //     setLoadingComponent(false);
            //     console.log('this thing is firing');
            // }
            // axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${props.location}&destinations=${truck.current_location}&departure_time=now&key=${GOOGLE_API_KEY}`)
            // .then(res => {
            //     console.log(res);
                // if (i === truckArr.length - 1) {
                //     setLoadingComponent(false);
                //     console.log('this thing is firing');
                // }
            //     truckDistance.push(res.data.rows[0].elements[0].distance.text);
            })
        // .then(data => {
        //     let calculatedDistance;
        //     console.log(data.rows[0].elements[0].distance.text);
        //     calculatedDistance = data.rows[0].elements[0].distance.text;
        //     return calculatedDistance;
        // })
        // .catch(err => console.log(err))
        // })
    }

    // useEffect(() => {
    //     if (props.location && locationData.user) {
    //         console.log(getDistance());
    //     }
    // }, [props.location, locationData.user])

    useEffect(() => {
            getTruckDistance();
    }, [props.trucks])

    console.log(truckDistance);

    return (
        <div className="diner-dash-main">
            <p className="diner-location">
                Find trucks near: {props.location}
                <ArrowDropDownCircleIcon 
                    className="location-edit-icon" 
                    onClick={() => setLocationEditMode(!locationEditMode)}
                />
            </p>

            <div>
                {/* <h2>React Geolocation</h2> */}
                {/* <button onClick={null}>Get coordinates</button>
                <h4>HTML Coordinates</h4>
                <p>Latitude: {locationData.latitude}</p>
                <p>Longitude: {locationData.longitude}</p>
                <h4>Google Maps Reverse Geocoding</h4> */}
                {/* <p>Address: {locationData.userAddress}</p>
                <button onClick={getDistance}>Get Distance</button> */}
            </div>

            {/* {locationData.latitude && locationData.longitude && <img src={`https://maps.googleapis.com/maps/api/staticmap?center=
  ${locationData.latitude},${locationData.longitude}&zoom=14&size=400x300&sensor=false&key=${GOOGLE_API_KEY}`} alt='' />} */}

            {/* conditional rendering of form for updating diner location */}
            {locationEditMode && <div>
                <GoogleComponent 
                    apiKey={GOOGLE_API_KEY}
                    language={'en'}
                    country={'country:br|country:us'}
                    coordinates={true}
                    onChange={e => setUpdatedLocation({ location: e.place })}
                />
                {/* <input placeholder="Enter a new location" onChange={handleLocationChange}/> */}
                <button onClick={changeLocation}>Done</button>
            </div>}
            
            {/* conditional rendering of trucks listing by cuisine type */}
            {props.cuisineTypeMode && <div className="card-div">
                <h3 className="trucks-category">Trucks By Type</h3>
                <div className="trucks-div">
                    {props.trucksByType.map(truck => (
                        <Card className="truck-card">
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={truck.image}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography className="truck-name" gutterBottom variant="h5" component="h2">
                                {truck.name}
                            </Typography>
                            <Typography className="cuisine-type" component="h3">{truck.cuisine_type}</Typography>
                            {/* <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography> */}
                            </CardContent>
                        </CardActionArea>
                        {/* <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions> */}
                    </Card>
                    ))}
                </div>
            </div>}

            {<div className="card-div">
                <h3 className="trucks-category">Nearby Trucks</h3>
                <div className="trucks-div">
                    {props.trucks && (props.trucks).slice(0, 3).map(truck => (
                        <Card className="truck-card">
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={truck.image}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography className="truck-name" gutterBottom variant="h5" component="h2">
                                {truck.name}
                            </Typography>
                            <Typography className="cuisine-type" component="h3">{truck.cuisine_type}</Typography>
                            <Typography className="distance-plus-rating" component="h3">
                                {truckDistance[truck.index]}
                                {/* {console.log(`props.location: ${props.location}, truck.current_location: ${truck.current_location}, returns: ${getTruckDistance(props.location, truck.current_location)}`)}
                                {console.log(getTruckDistance(props.location, truck.current_location))}   */}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    ))}
                </div>
            </div>}
            <div className="card-div">
                <h3 className="trucks-category">Your Favorites</h3>
                <div className="trucks-div">
                    {props.favTrucks && props.favTrucks.slice(0, 3).map(truck => (
                        <Card className="truck-card">
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={truck.image}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography className="truck-name" gutterBottom variant="h5" component="h2">
                                {truck.name}
                            </Typography>
                            <Typography className="cuisine-type" component="h3">{truck.cuisine_type}</Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    ))}
                </div>
            </div>
            <h1>This is the diner Dashboard component</h1>
            <h2>Welcome, {props.username}</h2>
            <br />
            <button onClick={logout}>Logout</button>

            <DinerFooter />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        id: state.account.id,
        username: state.account.username,
        email: state.account.email,
        password: state.account.password,
        location: state.account.location,
        favTrucks: state.account.favTrucks,
        trucks: state.trucks,
        trucksByType: state.trucksByType,
        cuisineTypeMode: state.cuisineTypeMode
    }
}

export default connect(mapStateToProps, { clientSignOut, editLocation, getAllTrucks, getTruckDistances })(DinerDash);

