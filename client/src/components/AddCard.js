import React, { useState } from "react";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import '../styling/AddCard.scss';

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
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');
    const [zip, setZip] = useState('');

    return (
        <Modal 
        open={props.addCardMode} 
        onClose={props.closeCardModal} 
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                
                <div className="add-card-body">
                    <i class="fas fa-times" onClick={props.closeCardModal} style={{ marginTop: '2%', fontSize: '1.2rem', marginBottom: '4%' }}></i>
                    <Cards 
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focus}
                    />
                    <form>
                        <label htmlFor="number" style={{ marginBottom: '2%' }}>Card Number</label>
                        <input 
                        type='tel' 
                        name='number' 
                        value={number} 
                        onChange={e => setNumber(e.target.value)}
                        onFocus={e => setFocus(e.target.name)} 
                        className="card-num-input"
                        />

                        <label htmlFor="name" style={{ marginBottom: '2%' }}>Name</label>
                        <input 
                        type='text' 
                        name='name' 
                        value={name} 
                        onChange={e => setName(e.target.value)}
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
                                value={expiry} 
                                onChange={e => setExpiry(e.target.value)}
                                onFocus={e => setFocus(e.target.name)} 
                                />
                            </div>

                            <div className="sec-input-div">
                                <input 
                                type='tel' 
                                name='cvc' 
                                value={cvc} 
                                onChange={e => setCvc(e.target.value)}
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
                                value={zip} 
                                onChange={e => setZip(e.target.value)}
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

export default AddCard;