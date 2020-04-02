import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import "../styling/TruckMenu.scss";

const TruckMenu = props => {
    // holds value of menu object
    const [menu, setMenu] = useState({
        entrees: [],
        sides: [],
        drinks: []
    })

    // makes call to backend to get truck menu
    useEffect(() => {
        axiosWithAuth()
        .get(`https://foodtrucktrackr.herokuapp.com/api/trucks/${props.selectedTruck.id}/menu`)
        .then(res => {
            // console.log(res);
            setMenu({ 
                entrees: res.data.filter(item => item.category === 'entree'),
                sides: res.data.filter(item => item.category === 'side'),
                drinks: res.data.filter(item => item.category === 'drink')
            });
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    // logs value of menu each time it is updated
    useEffect(() => {
        console.log(menu);
    }, [menu])

    return (
        <div className="truck-menu-main">
            <div className="details-truck-container">
                <h1 className="title">{props.selectedTruck.name}</h1>
                <p className="ratings"><span className="avg-rating">{props.selectedTruck.avg_rating}</span> <span>{props.selectedTruck.reviews.length} reviews</span></p>
                <p className="type">{props.selectedTruck.cuisine_type}</p>
                <div className="card-buttons-div">
                    <button>Write review</button>
                    <button>Add photo</button>
                    <button>Share</button>
                    <button onClick={null}>Add to favorites</button>
                </div>
            </div>

            <div className="menu-cont">
                {menu.entrees.length > 0 && (
                    <div className="entree-cont">
                        <h3 className="item-type-cont-h3">Entrees</h3>
                        <Grid container spacing={2}>
                            {menu.entrees.map(item => (
                                <Grid item xs={4}>
                                    <Card className="menu-deets-card">
                                        <div className="menu-deets-cont">
                                            <p className="menu-item-name">{item.name}</p>
                                            <p className="menu-item-description">{item.description}</p>
                                            <p className="menu-item-price">${item.price}</p>
                                        </div>
                                        <div className="menu-item-img">
                                            <object data={item.image} alt="pic of menu item" />
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}

                {menu.drinks.length > 0 && (
                    <div className="sides-cont">
                        <h3 className="item-type-cont-h3">Drinks</h3>
                        <Grid container spacing={2}>
                            {menu.drinks.map(item => (
                                <Grid item xs={4}>
                                    <Card className="menu-deets-card">
                                        <div className="menu-deets-cont">
                                            <p className="menu-item-name">{item.name}</p>
                                            <p className="menu-item-description">{item.description}</p>
                                            <p className="menu-item-price">${item.price}</p>
                                        </div>
                                        <div className="menu-item-img">
                                            <object data={item.image} alt="pic of menu item" />
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}

                {menu.sides.length > 0 && (
                    <div className="drinks-cont">
                        <h3 className="item-type-cont-h3">Sides</h3>
                        <Grid container spacing={2}>
                            {menu.sides.map(item => (
                                <Grid item xs={4}>
                                    <Card className="menu-deets-card">
                                        <div className="menu-deets-cont">
                                            <p className="menu-item-name">{item.name}</p>
                                            <p className="menu-item-description">{item.description}</p>
                                            <p className="menu-item-price">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="menu-item-img">
                                            <object data={item.image} alt="pic of menu item" />
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedTruck: state.selectedTruck
    }
}

export default connect(mapStateToProps, {})(TruckMenu);