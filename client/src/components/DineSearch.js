import React, { useState } from "react";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import "../styling/DineSearch.scss";

import DinerFooter from "./DinerFooter";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import { CardMedia, Typography } from "@material-ui/core";

import { getTrucksByCuisine } from "../actions";

// images
import deals from "../assets/deals.jpg";
import breakfast from "../assets/breakfast.jpg";
import fastfood from "../assets/fastfood.jpg";
import mexican from "../assets/mexican.jpg";
import vegan from "../assets/vegan.jpg";
import american from "../assets/american.jpg";
import healthy from "../assets/healthy.jpg";
import chinese from "../assets/chinese.jpg";
import pizza from "../assets/pizza.jpg";
import coffee from "../assets/coffee.jpg";


const categoryArr = [
    {category: 'Latest Deals', image: deals},
    {category: 'Breakfast and Brunch', image: breakfast},
    {category: 'Fast Food', image: fastfood},
    {category: 'Mexican', image: mexican},
    {category: 'Vegan', image: vegan},
    {category: 'American', image: american},
    {category: 'Healthy', image: healthy},
    {category: 'Pizza', image: pizza},
    {category: 'Chinese', image: chinese},
    {category: 'Coffee and Tea', image: coffee},
]



const DineSearch = props => {
    // const [trucksByType, setTrucksByType] = useState([]);

    const useStyles = makeStyles({
            categoryCard: {
                // backgroundImage: `url(${chinese})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: 200,
            }
          });
    
    const classes = useStyles();

    const selectCategory = (category) => {
        props.getTrucksByCuisine(category)
            .then(props.history.push(`/diner/${props.dinerId}`))
    }
    return (
        <div>
            <h1>This is the Dine Search component</h1>

            <Grid className="category-grid" container spacing={1}>
                {categoryArr.map(el => (
                    <Grid item xs={6}>
                        <Card className={classes.categoryCard} style={{ backgroundImage: `url(${el.image})` }} onClick={() => selectCategory(el.category)}>
                                <div className="category-image-wrapper">
                                <CardMedia
                                    className="category-image"
                                    // image={el.image}
                                />
                                </div>
                                <div className="category-text-wrapper">
                                <Typography className="category-text" component="h2">
                                    {el.category}
                                </Typography>
                                </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <DinerFooter />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dinerId: state.account.id
    }
}

export default connect(mapStateToProps, { getTrucksByCuisine })(DineSearch);