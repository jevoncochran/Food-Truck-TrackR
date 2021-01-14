import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { storage } from "../firebase";
import Card from "@material-ui/core/Card";
import "../styling/VendorDash.scss";

// component imports
import Header from "./Header";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { clientSignOut, changeTruckImg } from "../actions";

const VendorDash = (props) => {
  // holds operator account info
  // gathered from API call to `/operator/${props.id}`
  const [accountInfo, setAccountInfo] = useState({});

  // holds value of truck that is being edited
  // this is how truck ID is sent via API .patch request
  const [truckToChange, setTruckToChange] = useState(null);

  // holds value for updated image after it is chosen through input
  const [newImage, setNewImage] = useState(null);

  // holds value for upload progress of new image
  // used to show a progress bar
  // may not need this code bc currently no progress bar in component
  // const [uploadProgress, setUploadProgress] = useState(0);

  // holds image URL after a particular truck image has been updated
  // every time this value changes, new API call is made to gather operator account info
  // this is so updated image of truck will render
  const [imageUrlChange, setImageUrlChange] = useState("");

  // code to trigger click event on input while clicking on a given truck image
  let inputFile = "";
  const inputClick = (e) => {
    // e.preventDefault();
    inputFile.click();
  };

  // holds updated image in state (i.e. newImage)
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  // makes API call to grab operator account info including trucks owned
  // runs when operator logs in and every time truck image is changed
  // may need this when other things are changed such as truck cuisine_type or truck_location
  useEffect(() => {
    axiosWithAuth()
      .get(`/operator/${props.id}`)
      .then((res) => {
        // console.log(res);
        setAccountInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.id, imageUrlChange]);

  // uploads new image to Firebase storage: owner-uploaded-truck-pics
  // keeps track of upload progress
  // gets Firebase URL for new image
  // updates database entry with new URL for truck image
  // updates ImageUrlChange state which causes previous UseEffect to execute
  // runs each time newImage state is updated through input
  useEffect(() => {
    if (newImage && truckToChange) {
      const uploadTask = storage
        .ref(`owner-uploaded-truck-pics/${newImage.name}`)
        .put(newImage);
      uploadTask.on(
        "state_changed",
        // (snapshot) => {
        //   const progress = Math.round(
        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //   );
        //   setUploadProgress(progress);
        // },
        // (error) => {
        //   console.log(error);
        // },
        () => {
          storage
            .ref("owner-uploaded-truck-pics")
            .child(newImage.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setImageUrlChange(url);
              props.changeTruckImg({ image: url }, props.id, truckToChange.id);
            });
        }
      );
    }
  }, [newImage, props, truckToChange]);

  return (
    <div className="vend-dash-main">
      <Header history={props.history} />
      <h2>Welcome, {accountInfo.username}</h2>
      <h3>Your Trucks</h3>
      {accountInfo.trucks &&
        accountInfo.trucks.map((truck) => (
          <Card className="op-truck-card" onClick={null}>
            <div key={truck.id}>
              <p>{truck.name}</p>
              <img
                className="op-truck-img"
                src={truck.image}
                alt=""
                onClick={() => {
                  setTruckToChange(truck);
                  inputClick();
                }}
              />
              <input
                className="change-pic-input"
                type="file"
                id="prof-pic-file"
                name="file"
                placeholder="test"
                onChange={handleFileChange}
                ref={(input) => (inputFile = input)}
              />
              <p>{truck.cuisine_type}</p>
              <p>{truck.current_location}</p>
              <br />
            </div>
          </Card>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.account.id,
    username: state.account.username,
    email: state.account.email,
  };
};

export default connect(mapStateToProps, { clientSignOut, changeTruckImg })(
  VendorDash
);
