import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


// function to get the homepage
let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getFacebookUserProfile = (req, res) => {
    return res.render("profile.ejs");
};


let setUpUserFacebookProfile = (req, res) => {

    // Send the HTTP request to the Messenger Platform
    let data = {
        "get_started":{
            "payload":"GET_STARTED"
          },
          "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                     {
                        "type": "web_url",
                        "title": "View Github",
                        "url": "https://github.com/mconour/feastbott",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "View Website",
                        "url": "http://michaelconour.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ],
        "whitelisted_domains":[
            "https://feastbott.herokuapp.com/"
          ]
    };

    request({
        "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
        "qs": {
            "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": data
    }, (err, res, body) => {
        if (!err) {
            return res.status(200).json({
                message: "setup complete"
            })
        } else {
            return res.status(500).json({
                "message": "Error from server"
            })
        }
    });

    return res.status(200).json({
        message: "OK"
    });
};

module.exports = {
    getHomepage: getHomepage,
    getFacebookUserProfile: getFacebookUserProfile,
    setUpUserFacebookProfile: setUpUserFacebookProfile
};