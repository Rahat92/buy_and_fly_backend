const axios = require("axios");
const catchAsyncError = require("../utils/catchAsyncError");

exports.get_airs = catchAsyncError(async (req, res) => {
    console.log(req.body)
    // {
    //     "Code": "ADT",
    //     "Quantity": req.body.adult*1 || 1
    // },
    const passengers = [];
    if(req.body.adult>0){
        passengers.push({
            "Code":"ADT",
            "Quantity":req.body.adult*1
        })
    }
    if(req.body.child>0){
        passengers.push({
            "Code":"CNN",
            "Quantity":req.body.child*1
        })
    }
    if(req.body.infant>0){
        passengers.push({
            "Code":"INF",
            "Quantity":req.body.infant*1
        })
    }
    console.log(passengers)
    const passenterQuantity = passengers.reduce((f,c) => f+c.Quantity, 0)
    console.log(Number(passenterQuantity))
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
                        "PassengerTypeQuantity": passengers
                    }
                ],
                "SeatsRequested": [
                    passenterQuantity*1
                ]
            },
            "Version": "1"
        }

    }, {
        headers: {
            "Authorization": `Bearer ${process.env.COOKIE}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    res.status(200).json({
        status: 'Success',
        data: response.data
    })
})