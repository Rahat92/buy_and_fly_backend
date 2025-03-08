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
            "Authorization": `Bearer T1RLAQL3FrNVW0IYjgY04TZszqGbhZ0BkYrRPOf4Uha4KgCP2BC5mikEyih+AdOUPXMmm1n0AADgqdgI2nnSXbbzN6j1nERCRCLt4O9w4bI9qvqQCqTP7lESlU9aK6YdxbTvKPR0EyddCN6AsR8j1eIaUSEsDkSdw+4LC4dp7JbztyfQ0DUDYMpbniT28+1msawV882tpDwgbpEg+w78tDLXgSSvhT4CdKIrekuOGgx+gGSpPRwKyT7GnG0X7wRGP1h9IEOT4r/m25DeRGrmxy4uRYW/ynfbkZYHoaTZuA1AJPhzDv6yH7GGqpiqxVF34mUGRpHxPdwWIUJ3Rk7QLq/zZ6C9H0yfARk1d8IeMXeTAYPuwzn1SNU*`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    res.status(200).json({
        status: 'Success',
        data: response.data
    })
})