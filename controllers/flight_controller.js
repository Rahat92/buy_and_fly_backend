const axios = require("axios");
const catchAsyncError = require("../utils/catchAsyncError");

exports.get_airs = catchAsyncError(async (req, res) => {
    console.log(req.body)
    // share trip
    // bd fare
    const response = await axios.post('https://api-crt.cert.havail.sabre.com/v6.1.0/shop/altairports/flights?mode=live', {
        "OTA_AirLowFareSearchRQ": {
            "OriginDestinationInformation": [
                {
                    "DepartureDateTime": `${req.body.departure_date_temp}`,
                    "DestinationLocation": {
                        "LocationCode": `${req.body.journey_to}`
                    },
                    "OriginLocation": {
                        "LocationCode": `${req.body.journey_from}`
                    },
                    "RPH": "0"
                }
            ],
            "POS": {
                "Source": [
                    {
                        "PseudoCityCode": "F9CE",
                        "RequestorID": {
                            "CompanyName": {
                                "Code": "TN"
                            },
                            "ID": "1",
                            "Type": "1"
                        }
                    }
                ]
            },
            "TPA_Extensions": {
                "IntelliSellTransaction": {
                    "RequestType": {
                        "Name": "200ITINS"
                    }
                }
            },
            "TravelPreferences": {
                "TPA_Extensions": {
                    "DataSources": {
                        "ATPCO": "Enable",
                        "LCC": "Disable",
                        "NDC": "Disable"
                    },
                    "NumTrips": {}
                }
            },
            "TravelerInfoSummary": {
                "AirTravelerAvail": [
                    {
                        "PassengerTypeQuantity": [
                            {
                                "Code": "ADT",
                                "Quantity": req.body.adult*1 || 1
                            }
                        ]
                    }
                ],
                "SeatsRequested": [
                    req.body.adult*1
                ]
            },
            "Version": "1"
        }

    }, {
        headers: {
            "Authorization": `Bearer T1RLAQIsIMsLTjd2LfaArM+b74hNIGxczswbqk7oYbA8ixr2cxDe+wmqnPNJkBm7xG7ivVIUAADgR/Xp+SVIWzMSruX79ohm8nyFLGN7HAMoPd5LWHgC0g9s5ajWvH4J5Pb78J7SBeJdHLZsRpz0vGHAXFrZiDmTTC9+ooDVg9U4qeAnU1phgW02DK2HkAHePh20AZ/fPAarp4sf4l54klf4pqyGZUx07IyjL4UMD3dal4mknDHkd/uvEdwsXm0kyhFMU69PkAPpPyA4ECWdX7qo+5TFTE/V6udIgsGbonNr6fYXgn5R+egS8et6E7V1kdl+1fV60I/1PI2a5P6cY2I3eH84TY6Bzp+3KlvESE5Ke7DCnGIat0w*`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    res.status(200).json({
        status: 'Success',
        data: response.data
    })
})