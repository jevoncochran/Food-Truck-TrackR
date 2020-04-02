import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { GoogleComponent } from "react-google-location";
import "../styling/DinerDash.scss";
import { GOOGLE_API_KEY } from "../config";

// action imports
import { 
    clientSignOut, 
    editLocation, 
    getAllTrucks, 
    getTruckDistances, 
    setSelectedTruck, 
    removeFromFavoriteTrucks,
    addToFavoriteTrucks 
} from "../actions";

// component imports
import Header from "./Header";
import Covid19Alert from "./Covid19Alert";

const useStyles = makeStyles({
//     // root: {
//     //   maxWidth: 345,
//     //   marginBottom: 30,
//     //   padding: 10
//     // },
    media: {
      height: 288,
    },
  });

const DinerDash = props => {
    const [locationData, setLocationData] = useState({
        latitude: null,
        longitude: null,
        userAddress: null
    })

    const [initialMode, setInitialMode] = useState(true);

    // tells component whether it should render form to edit diner location
    const [locationEditMode, setLocationEditMode] = useState(false);

    // holds value of updated location
    const [updatedLocation, setUpdatedLocation] = useState({
        location: ''
    })

    // const [loadingComponent, setLoadingComponent] = useState(true);

    const [truckDistance, setTruckDistance] = useState([]);

    // holds value of params for .splice method that renders "Nearby Trucks" and "Favorites"
    const [sliceParams, setSliceParams] = useState({
        nearbyStart: 0,
        nearbyEnd: 3,
        favsStart: 0,
        favsEnd: 3
    })

    // functions that control pagination functionallity for "Nearby Trucks" and "Favorites"
    const sliceJumpNearby = () => {
        console.log(sliceParams);
        if (sliceParams.nearbyStart >= props.trucks.length - 3) {
            setSliceParams({
                ...sliceParams,
                nearbyStart: sliceParams.nearbyStart,
                nearbyEnd: sliceParams.nearbyEnd
            })
        } else {
            setSliceParams({
                ...sliceParams,
                nearbyStart: sliceParams.nearbyStart + 3,
                nearbyEnd: sliceParams.nearbyEnd + 3
            })
        }
    }

    const sliceReverseNearby = () => {
        console.log(sliceParams);
        if (sliceParams.nearbyStart === 0) {
            setSliceParams({
                ...sliceParams,
                nearbyStart: sliceParams.nearbyStart,
                nearbyEnd: sliceParams.nearbyEnd
            })
        } else {
            setSliceParams({
                ...sliceParams,
                nearbyStart: sliceParams.nearbyStart - 3,
                nearbyEnd: sliceParams.nearbyEnd - 3
            })
        }
    }

    const sliceJumpFavs = () => {
        console.log(sliceParams);
        if (sliceParams.favsStart >= props.favTrucks.length - 3) {
            setSliceParams({
                ...sliceParams,
                favsStart: sliceParams.favsStart,
                favsEnd: sliceParams.favsEnd
            })
        } else {
            setSliceParams({
                ...sliceParams,
                favsStart: sliceParams.favsStart + 3,
                favsEnd: sliceParams.favsEnd + 3
            })
        }
    } 

    const sliceReverseFavs = () => {
        console.log(sliceParams);
        if (sliceParams.favsStart === 0) {
            setSliceParams({
                ...sliceParams,
                favsStart: 0,
                favsEnd: 3
            })
        } else {
            setSliceParams({
                ...sliceParams,
                favsStart: sliceParams.favsStart - 3,
                favsEnd: sliceParams.favsEnd - 3
            })
        }
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

    // returns truck if there is match between that truck and props.favTrucks
    // looks for match based on id
    // used to conditional styling for truck cards like button
    // if truck is already in favorites, button background is filled, if not button background is transparent
    function filterThroughFavs(truckId) {
        let favFilter;
        favFilter = props.favTrucks.filter(favT => {
            return favT.id === truckId
        })
        return favFilter;
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
            // HAVE TO UNCOMMENT LINE BELOW WHEN READY TO WORK ON GETTING TRUCK DISTANCES
            // props.getTruckDistances(props.location, truck.current_location);
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

    useEffect(() => {
        if(props.selectedTruck !== undefined && !props.isLoading && !initialMode) {
            props.history.push(`/trucks/${props.selectedTruck.id}`)
        }
    }, [props.selectedTruck])

    const selectTruck = truckId => {
        props.setSelectedTruck(truckId);
        setInitialMode(false);
    }

    const removeFromFavorites = (e, truckId) => {
        props.removeFromFavoriteTrucks(props.dinerId, truckId);
        e.stopPropagation();
    }

    const addToFavs = (e, truckId) => {
        props.addToFavoriteTrucks(props.dinerId, truckId);
        e.stopPropagation();
    }

    // console.log(truckDistance);

    return (
        <div className="diner-dash-main">
            <Header history={props.history} />
            {/* <p className="diner-location">
                Find trucks near: {props.location}
                <ArrowDropDownCircleIcon 
                    className="location-edit-icon" 
                    onClick={() => setLocationEditMode(!locationEditMode)}
                />
            </p> */}

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

            <Covid19Alert />

            {props.cuisineTypeMode && <div className="card-div">
                <div className="card-sub-div">
                    <div className="trucks-category-div">
                        <h3 className="trucks-category">"{props.truckCategory}"</h3>
                    </div>
                    <p className="truck-count">{props.trucksByType.length} trucks</p>
                    <div className="trucks-by-category-div">
                        <Grid className="trucks-by-type-grid" container spacing={4}>
                            {props.trucksByType.map(truck => (
                                <Grid item xs={4}>
                                    <Card className="trucks-by-category-card" onClick={() => selectTruck(truck.id)}>
                                    <CardActionArea>
                                        <CardMedia
                                        className="trucks-by-category-img"
                                        image={truck.image}
                                        />
                                        <i 
                                            className="like-icon" 
                                            class={filterThroughFavs(truck.id).length > 0 ? "fas fa-heart" : "far fa-heart"}
                                            onClick={filterThroughFavs(truck.id).length > 0 ? e => removeFromFavorites(e, truck.id) : e => addToFavs(e, truck.id)}
                                        />
                                        <CardContent>
                                        <Typography className="trucks-by-category-name" gutterBottom variant="h5" component="h2">
                                            {truck.name}
                                        </Typography>
                                        <Typography className="trucks-by-category-cuisine-type" component="h3">{truck.cuisine_type}</Typography>
                                        {/* <Typography className="distance-plus-rating" component="h3">
                                            {truckDistance[truck.index]} */}
                                            {/* {console.log(`props.location: ${props.location}, truck.current_location: ${truck.current_location}, returns: ${getTruckDistance(props.location, truck.current_location)}`)}
                                            {console.log(getTruckDistance(props.location, truck.current_location))}   */}
                                        {/* </Typography> */}
                                        </CardContent>
                                    </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>}

         {!props.cuisineTypeMode && <div className="card-div">
                <div className="card-sub-div">
                    <div className="trucks-category-div">
                        <h3 className="trucks-category">Nearby Trucks</h3>
                        <p>View all</p>
                        <div className="category-pagination-arrows">
                            <div className="arrow-bg-div">
                                <i class="fas fa-arrow-left" onClick={sliceReverseNearby}></i>
                            </div>
                            <div className="arrow-bg-div">
                                <i class="fas fa-arrow-right" onClick={sliceJumpNearby}></i>
                            </div>
                        </div>
                    </div>
                    <div className="trucks-div">
                        {props.trucks && (props.trucks).slice(sliceParams.nearbyStart, sliceParams.nearbyEnd).map(truck => (
                            <Card className="truck-card" onClick={() => selectTruck(truck.id)}>
                            <CardActionArea>
                                <CardMedia
                                className="truck-img"
                                image={truck.image}
                                style={{ width: '100%' }}
                                />
                                <i 
                                    className="like-icon" 
                                    class={filterThroughFavs(truck.id).length > 0 ? "fas fa-heart" : "far fa-heart"}
                                    onClick={filterThroughFavs(truck.id).length > 0 ? e => removeFromFavorites(e, truck.id) : e => addToFavs(e, truck.id)}
                                />
                                <CardContent>
                                <Typography className="truck-name" gutterBottom variant="h5" component="h2">
                                    {truck.name}
                                </Typography>
                                <Typography>
                                    {truck.avg_rating}
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
                </div>
            </div>}

            {!props.cuisineTypeMode && <div className="card-div">
                <div className="card-sub-div">
                    <div className="trucks-category-div">
                        <h3 className="trucks-category">Your Favorites</h3>
                        <p>View all</p>
                        <div className="category-pagination-arrows">
                            <div className="arrow-bg-div">
                                <i class="fas fa-arrow-left" onClick={sliceReverseFavs}></i>
                            </div>
                            <div className="arrow-bg-div">
                                <i class="fas fa-arrow-right" onClick={sliceJumpFavs}></i>
                            </div>
                        </div>
                    </div>
                    <div className="trucks-div">
                        {props.favTrucks && props.favTrucks.slice(sliceParams.favsStart, sliceParams.favsEnd).map(truck => (
                            <Card className="truck-card" onClick={() => selectTruck(truck.id)}>
                                <CardActionArea>
                                    <CardMedia
                                    className="truck-img"
                                    image={truck.image}
                                    style={{ width: '100%' }}
                                    />
                                    <i 
                                        className="like-icon" 
                                        class={ filterThroughFavs(truck.id).length > 0 ? "fas fa-heart" : "far fa-heart"}
                                        onClick={(e) => removeFromFavorites(e, truck.id)}
                                    />
                                    <CardContent className="truck-contents">
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
            </div>}   
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dinerId: state.account.id,
        username: state.account.username,
        email: state.account.email,
        password: state.account.password,
        location: state.account.location,
        favTrucks: state.account.favTrucks,
        trucks: state.trucks,
        trucksByType: state.trucksByType,
        cuisineTypeMode: state.cuisineTypeMode,
        truckCategory: state.truckCategory,
        isLoading: state.isLoading,
        selectedTruck: state.selectedTruck
    }
}

export default connect(mapStateToProps, { 
    clientSignOut, 
    editLocation, 
    getAllTrucks, 
    getTruckDistances, 
    setSelectedTruck, 
    removeFromFavoriteTrucks,
    addToFavoriteTrucks 
})(DinerDash);

