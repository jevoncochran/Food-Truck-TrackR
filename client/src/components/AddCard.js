import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import '../styling/AddCard.scss';

import { addCreditCard } from "../actions";

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'relative',
    //   top: '50%',
    //   left: '50%',
      width: 400,
      minHeight: '85vh',
      height: '90vh',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      outline: 'none'
    //   padding: theme.spacing(2, 4, 3),
    },
  }));

const AddCard = props => {
    const classes = useStyles();

    const modalStyle = {
        border: '1px dashed black',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    }

    const [cardToAdd, setCardToAdd] = useState({
        num: '',
        name: '',
        exp_date: '',
        cvc: '',
        zip: '',
        customer: props.account.stripe_id
    });

    // don't need this i don't think 
    // just styling while I figure out Stripe functionality
    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    const [focus, setFocus] = useState('');

    const addCard = e => {
        e.preventDefault();
        props.addCreditCard(props.account.id, cardToAdd);
        props.closeCardModal();
    }

    // delete this afterward
    useEffect(() => {
        console.log(`card to add: ${cardToAdd.name}, ${cardToAdd.num}, ${cardToAdd.exp_date}, ${cardToAdd.cvc}, ${cardToAdd.zip}`)
    }, [cardToAdd])

    return (
        <Modal 
        open={props.addCardMode} 
        onClose={props.closeCardModal} 
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                
                <div className="add-card-body">
                    <i class="fas fa-times" onClick={props.closeCardModal} style={{ marginTop: '2%', fontSize: '1.2rem', marginBottom: '4%', display: 'block' }}></i>
                
                    <Cards 
                        number={cardToAdd.num}
                        name={cardToAdd.name}
                        expiry={cardToAdd.exp_date}
                        cvc={cardToAdd.cvc}
                        focused={focus}
                    />

                    
                         <form onSubmit={addCard}>  
                
                            <label htmlFor="number" style={{ marginBottom: '2%' }}>Card Number</label>
                            <input 
                            type='tel' 
                            name='number' 
                            value={cardToAdd.num} 
                            onChange={e => setCardToAdd({...cardToAdd, num: e.target.value})}
                            onFocus={e => setFocus(e.target.name)} 
                            className="card-num-input"
                            />

                            <label htmlFor="name" style={{ marginBottom: '2%' }}>Name</label>
                            <input 
                            type='text' 
                            name='name' 
                            value={cardToAdd.name} 
                            onChange={e => setCardToAdd({...cardToAdd, name: e.target.value})}
                            onFocus={e => setFocus(e.target.name)} 
                            className="card-name-input"
                            />

                            <div className="exp-sec-div">
                            <div className="exp-sec-label-div">
                                <div className="exp-label-div" style={{ marginBottom: '2%' }}>
                                    <label htmlFor="expiry">Exp. Date</label>
                                </div>
                                <div className="sec-label-div">
                                    <label htmlFor="cvc">Security Code</label>
                                </div>
                            </div>
                            <div className="exp-sec-input-div">
                                <div className="exp-input-div">
                                    <input 
                                    type='text' 
                                    name='expiry' 
                                    placeholder='MM/YY' 
                                    value={cardToAdd.exp_date} 
                                    onChange={e => setCardToAdd({...cardToAdd, exp_date: e.target.value})}
                                    onFocus={e => setFocus(e.target.name)} 
                                    />
                                </div>

                                <div className="sec-input-div">
                                    <input 
                                    type='tel' 
                                    name='cvc' 
                                    value={cardToAdd.cvc} 
                                    onChange={e => setCardToAdd({...cardToAdd, cvc: e.target.value})}
                                    onFocus={e => setFocus(e.target.name)} 
                                    />
                                </div>
                            </div>
                            </div>

                            <div className="zip-div">
                                <label htmlFor="zip" style={{ marginBottom: '2%' }}>Zip Code</label>
                                <input 
                                    type='tel' 
                                    name='zip' 
                                    value={cardToAdd.zip} 
                                    onChange={e => setCardToAdd({...cardToAdd, zip: e.target.value})}
                                    onFocus={e => setFocus(e.target.name)} 
                                />
                            </div>

                            <button type="submit" className="add-card-btn">Add Card</button>
                        </form>
                    
                </div> 
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        cardOnFile: state.account.cardOnFile,
        account: state.account
    }
}

// const mapStateToProps = state => {
//     return {
//         account: state.account
//     }
// }

export default connect(mapStateToProps, { addCreditCard })(AddCard);