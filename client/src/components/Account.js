import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { storage } from "../firebase";
import "../styling/Account.scss";

// component imports
import Header from "./Header";

// action imports
import {
  clientSignOut,
  editCountry,
  editLanguage,
  changeProfilePic,
} from "../actions";

// array populates country input
var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// array populates language input
var language_list = ["English", "Español", "Français", "Português"];

const Account = (props) => {
  // holds value of updated country
  const [updatedCountry, setUpdatedCountry] = useState({
    country: `${props.country}`,
  });

  // holds value of updated language
  const [updatedLanguage, setUpdatedLanguage] = useState({
    language: `${props.language}`,
  });

  // holds value for updated profile pic after it is chosen through input
  const [newProfilePic, setNewProfilePic] = useState(null);

  // holds value for upload progress of new profile pic
  // used to show a progress bar
  // may not need this code bc currently no progress bar in component
  // const [uploadProgress, setUploadProgress] = useState(0);

  // holds image URL after profile pic has been updated
  const [profilePicUrl, setProfilePicUrl] = useState(props.profile_pic);

  // code to trigger click event on input while clicking on a profile pic
  let inputFile = "";
  const inputClick = (e) => {
    e.preventDefault();
    inputFile.click();
  };

  // function that allows diner to sign out
  const logout = (e) => {
    e.preventDefault();
    props.clientSignOut();
    props.history.push("/");
  };

  // changes updatedCountry based on user input from country select
  const handleCountryChange = (e) => {
    setUpdatedCountry({
      country: e.target.value,
    });
  };

  // changes updatedLanguage based on user input from language select
  const handleLanguageChange = (e) => {
    setUpdatedLanguage({
      language: e.target.value,
    });
  };

  // function that allows diner to edit country
  const changeCountry = (e) => {
    console.log(`new country is ${updatedCountry.country}`);
    props.editCountry(updatedCountry, props.accountId);
  };

  // function that allows diner to change language
  const changeLanguage = (e) => {
    console.log(`new language is ${updatedLanguage.language}`);
    props.editLanguage(updatedLanguage, props.accountId);
  };

  // stores updated image in state (i.e. newProfilePic)
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewProfilePic(e.target.files[0]);
    }
  };

  // uploads new profile pic to Firebase storage: diner-profile-pics
  // keeps track of upload progress
  // gets Firebase URL for new profile pic
  // updates database entry with new URL for diner profile pic
  // updates profilePicUrl which causes profile pic to rerender with new image
  // runs each time newProfilePic state is updated through input
  useEffect(() => {
    if (newProfilePic) {
      const uploadTask = storage
        .ref(`diner-profile-pics/${newProfilePic.name}`)
        .put(newProfilePic);
      uploadTask.on(
        "state_changed",
        // snapshot => {
        // const progress = Math.round(
        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setUploadProgress(progress);
        // },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("diner-profile-pics")
            .child(newProfilePic.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setProfilePicUrl(url);
              props.changeProfilePic({ profile_pic: url }, props.accountId);
            });
        }
      );
    }
  }, [newProfilePic]);

  return (
    <div className="account-main">
      <Header history={props.history} />
      <div className="account-div">
        <div className="account-bio">
          <div className="identifiers">
            <p className="acct-holder">{props.name}</p>
            <p>{props.username}</p>
          </div>
          <div className="profile-pic-div">
            {!props.profile_pic && <i class="fas fa-user-circle"></i>}
            <div className="circle">
              {
                <img
                  className="profile-img"
                  src={profilePicUrl}
                  alt="profile image"
                  style={{ height: "250px", width: "400px" }}
                  onClick={inputClick}
                />
              }
            </div>
          </div>
        </div>

        <div className="labels-and-inputs">
          <div className="grouping-div">
            <p className="input-label">Country</p>
            <select
              className="display-and-input"
              onChange={handleCountryChange}
              defaultValue={props.country}
            >
              {country_list.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="grouping-div">
            <p className="input-label">Language</p>
            <select
              className="display-and-input"
              onChange={handleLanguageChange}
              defaultValue={props.language}
            >
              {language_list.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="grouping-div">
            <p className="input-label">Invite Code</p>
            <input
              className="display-and-input"
              type="text"
              name="invite-code"
              value={null}
              placeholder="JC97DUI"
              onChange={null}
            />
          </div>
          <div className="grouping-div">
            <p className="input-label">Email</p>
            <input
              className="display-and-input"
              type="email"
              name="email"
              value={props.email}
              placeholder="jevon.cochran@gmail.com"
              onChange={null}
            />
          </div>
        </div>

        <input
          className="change-pic-input"
          type="file"
          id="prof-pic-file"
          name="file"
          placeholder="test"
          onChange={handleFileChange}
          ref={(input) => (inputFile = input)}
        />

        <div className="action-btn-div">
          <button
            onClick={() => {
              changeCountry();
              changeLanguage();
            }}
          >
            Save changes
          </button>
          <button onClick={logout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accountId: state.account.id,
    name: state.account.name,
    username: state.account.username,
    email: state.account.email,
    country: state.account.country,
    language: state.account.language,
    profile_pic: state.account.profile_pic,
  };
};

export default connect(mapStateToProps, {
  clientSignOut,
  editCountry,
  editLanguage,
  changeProfilePic,
})(Account);
