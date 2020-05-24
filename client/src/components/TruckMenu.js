import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CurrencyFormatter from "currencyformatter.js";
import "../styling/TruckMenu.scss";

// component imports
import MenuItemModal from "./MenuItemModal";
import OrderCard from "./OrderCard";
import NewOrderModal from "./NewOrderModal";


import { closeOrderCard } from "../actions";

const TruckMenu = props => {
    // holds value of menu object
    const [menu, setMenu] = useState({
        entrees: [],
        sides: [],
        drinks: []
    })

    // holds value that determines whether menu item modal is open or not
    const [openMode, setOpenMode] = useState(false);

    // holds value of menu item object to be passed down to menu item modal
    const [menuItem, setMenuItem] = useState({
        id: '',
        name: '',
        description: '',
        image: '',
        price: ''
    })

    const [newOrderAlert, setNewOrderAlert] = useState(false);

    // sets modalOpen to true, thus openinng the menu item modal
    const openModal = () => {
        setOpenMode(true);
    }

    // sets modalOpen to false, thus closing the menu item modal
    const closeModal = () => {
        setOpenMode(false);
    }

    const showNewOrderAlert = () => {
        setNewOrderAlert(true);
    }

    const closeNewOrderAlert = () => {
        setNewOrderAlert(false);
    }

    const addToFavs = (e) => {
        e.preventDefault();
        props.addToFavoriteTrucks(props.dinerId, props.selectedTruck.id);
    };

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

    useEffect(() => {
        let add2FavsBtn = document.getElementById("add-to-favs-btn");

        if (props.favTrucks.some(el => props.selectedTruck.id === el.id)) {
            add2FavsBtn.disabled = true;
        }
    }, [props.favTrucks])

    return (
        <div className="truck-menu-main">
            <div className="details-truck-container">
                <h1 className="title">{props.selectedTruck.name}</h1>
                <p className="ratings">
                    <span className="avg-rating">              
                        <div className="stars-div">
                            <StarRatings
                            rating={Number(props.selectedTruck.avg_rating)}
                            starDimension="22px"
                            starSpacing="2px"
                            starRatedColor="#ef903c"
                            />
                        </div>
                    </span> 
                    <span>{props.selectedTruck.reviews.length} reviews</span>
                </p>
                <p className="type">{props.selectedTruck.cuisine_type}</p>
                <div className="card-buttons-div">
                    <button>Write review</button>
                    <button>Add photo</button>
                    <button>Share</button>
                    <button id="add-to-favs-btn" className="add-to-favs-btn" onClick={addToFavs}>Add to favorites</button>
                </div>
            </div>

            <div className="menu-cont">
                {menu.entrees.length > 0 && (
                    <div className="entree-cont">
                        <h3 className="item-type-cont-h3">Entrees</h3>
                        <Grid container spacing={2}>
                            {menu.entrees.map(item => (
                                    <Grid item xs={4} onClick={() => setMenuItem({ id: item.id, name: item.name, description: item.description, image: item.image, price: item.price })}>
                                        <Card className={props.order.some(el => item.name === el.item) ? "menu-deets-card-inactive" : "menu-deets-card"} onClick={openModal}>
                                            <div className="menu-deets-cont">
                                                <p className="menu-item-name">{item.name}</p>
                                                <p className="menu-item-description">{item.description}</p>
                                                <p className="menu-item-price">{CurrencyFormatter.format(item.price, { currency: 'USD' })}</p>
                                            </div>
                                            <div className="menu-item-img">
                                                <object data={item.image} alt="pic of menu item" />
                                            </div>
                                        </Card>
                                    </Grid>
                            ))}
                        </Grid>
                        <MenuItemModal openMode={openMode} closeModal={closeModal} menuItem={menuItem} showNewOrderAlert={showNewOrderAlert} />
                    </div>
                )}

                {menu.sides.length > 0 && (
                    <div className="sides-cont">
                        <h3 className="item-type-cont-h3">Sides</h3>
                        <Grid container spacing={2}>
                            {menu.sides.map(item => (
                                <Grid item xs={4} onClick={() => setMenuItem({ id: item.id, name: item.name, name: item.name, description: item.description, image: item.image, price: item.price })}>
                                    <Card className={props.order.some(el => item.name === el.item) ? "menu-deets-card-inactive" : "menu-deets-card"} onClick={openModal}>
                                        <div className="menu-deets-cont">
                                            <p className="menu-item-name">{item.name}</p>
                                            <p className="menu-item-description">{item.description}</p>
                                            <p className="menu-item-price">{CurrencyFormatter.format(item.price, { currency: 'USD' })}</p>
                                        </div>
                                        <div className="menu-item-img">
                                            <object data={item.image} alt="pic of menu item" />
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <MenuItemModal openMode={openMode} closeModal={closeModal} menuItem={menuItem} showNewOrderAlert={showNewOrderAlert} />
                    </div>
                )}

                {menu.drinks.length > 0 && (
                    <div className="drinks-cont">
                        <h3 className="item-type-cont-h3">Drinks</h3>
                        <Grid container spacing={2}>
                            {menu.drinks.map(item => (
                                <Grid item xs={4} onClick={() => setMenuItem({ name: item.name, description: item.description, image: item.image, price: item.price })}>
                                    <Card className={props.order.some(el => item.name === el.item) ? "menu-deets-card-inactive" : "menu-deets-card"} onClick={openModal}>
                                        <div className="menu-deets-cont">
                                            <p className="menu-item-name">{item.name}</p>
                                            <p className="menu-item-description">{item.description}</p>
                                            <p className="menu-item-price">{CurrencyFormatter.format(item.price, { currency: 'USD' })}</p>
                                        </div>
                                        <div className="menu-item-img">
                                            <object data={item.image} alt="pic of menu item" />
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <MenuItemModal openMode={openMode} closeModal={closeModal} menuItem={menuItem} showNewOrderAlert={showNewOrderAlert} />
                    </div>
                )}
            </div>

            {props.orderCardOpen && <OrderCard history={props.history} />}
            {newOrderAlert && <NewOrderModal newOrderAlert={newOrderAlert} closeNewOrderAlert={closeNewOrderAlert} openModal={openModal} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedTruck: state.selectedTruck,
        orderCardOpen: state.orderCardOpen,
        order: state.order,
        favTrucks: state.account.favTrucks
    }
}

export default connect(mapStateToProps, { closeOrderCard })(TruckMenu);