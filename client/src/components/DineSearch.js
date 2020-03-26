import React, { useState } from "react";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import DinerFooter from "./DinerFooter";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import { CardMedia, Typography } from "@material-ui/core";

import { getTrucksByCuisine } from "../actions";


const categoryArr = [
    {category: 'Latest Deals', image: '../assets/truck2.png'},
    {category: 'Breakfast and Brunch', image: '../assets/truck2.png'},
    {category: 'Fast Food', image: '../assets/truck2.png'},
    {category: 'Mexican', image: '../assets/truck2.png'},
    {category: 'Vegan', image: '../assets/truck2.png'},
    {category: 'American', image: '../assets/truck2.png'},
    {category: 'Healthy', image: '../assets/truck2.png'},
    {category: 'Pizza', image: '../assets/truck2.png'},
    {category: 'Chinese', image: '../assets/truck2.png'},
    {category: 'Coffee and Tea', image: '../assets/truck2.png'},
]



const DineSearch = props => {
    // const [trucksByType, setTrucksByType] = useState([]);

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
    
    const classes = useStyles();

    const selectCategory = (category) => {
        props.getTrucksByCuisine(category)
            .then(props.history.push(`/diner/${props.dinerId}`))
    }
    return (
        <div>
            <h1>This is the Dine Search component</h1>

            <Grid container spacing={2}>
                {categoryArr.map(el => (
                    <Grid item xs={6}>
                        <Card className="category-card" onClick={() => selectCategory(el.category)}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={el.image}
                                />
                                <Typography component="h2">
                                    {el.category}
                                </Typography>
                            </CardActionArea>
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