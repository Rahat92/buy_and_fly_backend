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
            "Authorization": `Bearer T1RLAQJ3m+J2huIiuVeKAKGFBcAsu00hQh7Lx8pJFjPaWJedgBBQ2MLxU77p/6ODIWfvtBY2AADgR4XNCofPXUCtEo8h5qI5yATFYZlCLW7MEufwrirv+UWB1HiwknDMW40zcSTGITfrc+fjY4EAdRHiRDXbUf7S1xlWPPGcqklqb0wY/xDyntOBfbFnxvdmqAASMSaiviSjalqGsa9/NhCc1VaAKbD0PCWOKJPXQHhXrH6QabvQgqytgAOQCwMUyemnF/q8ou5YXxWKaGEKYkytnlv9E8fyL4Ju1WsTirK9NK0zEql8q/PfJa9l2A6xD+uMNkCSnVauEbVFpD5HXIp9lx80OfxwoRz5a2SsUkLbrfP+S5MIM3o*`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    res.status(200).json({
        status: 'Success',
        data: response.data
    })
})