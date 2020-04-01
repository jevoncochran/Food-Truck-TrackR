import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/white-logo-png.png";
import "../styling/Header.scss";
import { connect } from "react-redux";
import { GOOGLE_API_KEY } from "../config";

// material UI imports
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';

import { turnOffCuisineTypeMode, clientSignOut, editLocation } from "../actions";

const Header = props => {
    // Stores a bool that determines if header border-bottom is visible
    const [isBorderVisible, setIsBorderVisible] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    // tells component whether it should render form to edit diner location
    const [locationEditMode, setLocationEditMode] = useState(false);

    // holds value of updated location
    const [updatedLocation, setUpdatedLocation] = useState({
        location: `${props.location}`
    })

    // holds value of abbreviated diner location
    const [abbreviatedLocation, setAbbreviatedLocation] = useState({
        number: '',
        street: ''
    });

    // handles conditional styling for border-bottom for header
    useEffect(() => {
        // Define a function that is called when the scroll event fires
        const handleScroll = e => {
        const scrollTop = e.target.documentElement.scrollTop;
        //   console.log(`scrollTop: ${scrollTop}`);
        if (scrollTop > 0) {
            setIsBorderVisible(true);
        } else {
            setIsBorderVisible(false);
        }
        };

        // Add the event listener inside a useEffect
        if (document) {
        document.addEventListener("scroll", handleScroll);
        }

        // Remove the event listener on unmount
        return () => {
        if (document) {
            document.removeEventListener("scroll", handleScroll);
        }
        };
    }, [setIsBorderVisible]);

    // converts full diner location (num, street, city, state, zip) to abbreviated form (num, street)
    useEffect(() => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${props.location}&key=${GOOGLE_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setAbbreviatedLocation({
                number: data.results[0].address_components[0].long_name,
                street: data.results[0].address_components[1].short_name
            })
        })
    }, [props.location])

    // opens preferences menu
    const handlePreferencesClick = e => {
        setAnchorEl(e.currentTarget);
    }

    // closes preferences menu
    const handlePreferencesClose = () => {
        setAnchorEl(null);
    }

    // function that allows diner to sign out
    const logout = e => {
        e.preventDefault();
        props.clientSignOut();
        props.history.push('/');
    }

    // updates updatedLocation
    const handleLocationChange = e => {
        setUpdatedLocation({
            location: e.target.value
        })
    }

    // function that allows diner to edit location
    const changeLocation = e => {
        console.log(updatedLocation);
        e.preventDefault();
        props.editLocation(updatedLocation, props.accountId);
        setLocationEditMode(false);
    }

    // styling for preferences menu
    const StyledMenu = withStyles({
        paper: {
        border: '1px solid #d3d4d5',
        width: '12%',
        borderRadius: '0px'
        },
    })((props) => (
        <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 20,
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
        />
    ));

    const StyledMenuItem = withStyles((theme) => ({
        root: {
        '&:hover': {
            backgroundColor: 'lightgrey',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.black,
            },
        },
        },
    }))(MenuItem);

    return (
        <header className={ isBorderVisible ? "header-container scrolled" : "header-container"}>
            
            <NavLink to={`/diner/${props.accountId}`} className="logo-container" onClick={() => props.turnOffCuisineTypeMode()}>
                <img className="white-logo" src={logo} alt="Food Truck TrackR logo white" />
            </NavLink>

            {!locationEditMode && <section className="header-section-one">
                <div className="location-sub-div" onClick={() => setLocationEditMode(true)}>
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>{abbreviatedLocation.number} {abbreviatedLocation.street}</h3>
                </div>

            </section>}

            {locationEditMode && <section className="header-section-one">

                <form className="location-sub-div location-edit" onSubmit={changeLocation}>
                    <i class="fas fa-map-marker-alt"></i>
                    <input type="text" name="location" value={updatedLocation.location} onChange={handleLocationChange} />
                    <div className="location-edit-buttons">
                        <div>
                        <button className="location-edit-clear" onClick={null}>Clear</button>
                        </div>
                        <div>
                        <button className="location-edit-cancel" onClick={() => setLocationEditMode(false)}>X</button>
                        </div>
                    </div>
                    <button type="submit" style={{ display: 'none' }}>Done</button>
                </form>

            </section>}

            <section className="header-section-two">
                <NavLink to="/dine/search" className="search-sub-div">
                    <i class="fas fa-search search-icon"></i>
                    <h3>Search</h3>
                </NavLink>
                <div className="acct-sub-div" onClick={handlePreferencesClick}>
                    <i class="fas fa-user acct-icon"></i>
                    <h3>{props.username}</h3>
                </div>
            </section>

            {/* preferences menu */}
            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handlePreferencesClose}
                className="pref-menu"
            >
                <StyledMenuItem>
                    <ListItemIcon className="pref-menu-icons">
                        <i class="fas fa-receipt"></i>
                    </ListItemIcon>
                    <p className="pref-menu-titles">Orders</p>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon className="pref-menu-icons">
                        <i class="fas fa-heart"></i>
                    </ListItemIcon>
                    <p className="pref-menu-titles">Favorites</p>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon className="pref-menu-icons">
                        <i class="fas fa-wallet"></i>
                    </ListItemIcon>
                    <p className="pref-menu-titles">Wallet</p>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon className="pref-menu-icons">
                    <i class="fas fa-question-circle"></i>
                    </ListItemIcon>
                    <p className="pref-menu-titles">Help</p>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon className="pref-menu-icons">
                    <i class="fas fa-user"></i>
                    </ListItemIcon>
                    <p className="pref-menu-titles">Account</p>
                </StyledMenuItem>
                <StyledMenuItem onClick={logout}>
                    <p className="pref-menu-titles signout">Sign Out</p>
                </StyledMenuItem>

            </StyledMenu>

        </header>
    )
}

const mapStateToProps = state => {
    return {
        accountId: state.account.id,
        cuisineTypeMode: state.cuisineTypeMode,
        username: state.account.username,
        location: state.account.location

    }
}
export default connect(mapStateToProps, { turnOffCuisineTypeMode, clientSignOut, editLocation })(Header);