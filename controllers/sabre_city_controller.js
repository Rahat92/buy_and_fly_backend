const { default: axios } = require("axios");
const catchAsyncError = require("../utils/catchAsyncError");

exports.get_all_cities = catchAsyncError(async (req, res) => {
    const response = await axios.get(`https://api.cert.platform.sabre.com/v1/lists/supported/cities`, {
        headers: {
            "Authorization": `Bearer T1RLAQIsIMsLTjd2LfaArM+b74hNIGxczswbqk7oYbA8ixr2cxDe+wmqnPNJkBm7xG7ivVIUAADgR/Xp+SVIWzMSruX79ohm8nyFLGN7HAMoPd5LWHgC0g9s5ajWvH4J5Pb78J7SBeJdHLZsRpz0vGHAXFrZiDmTTC9+ooDVg9U4qeAnU1phgW02DK2HkAHePh20AZ/fPAarp4sf4l54klf4pqyGZUx07IyjL4UMD3dal4mknDHkd/uvEdwsXm0kyhFMU69PkAPpPyA4ECWdX7qo+5TFTE/V6udIgsGbonNr6fYXgn5R+egS8et6E7V1kdl+1fV60I/1PI2a5P6cY2I3eH84TY6Bzp+3KlvESE5Ke7DCnGIat0w*`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    // console.log(response.data.Cities)
    const all_airports = []
    const res_data = await Promise.all(response.data.Cities.map(async (item, i) => {
        const links = item.Links
        // console.log(links)

        // links.map(async (itm) => {
        //     const rs = await axios.get(`${itm.href}`, {
        //         headers: {
        //             "Authorization": `Bearer T1RLAQJ3tjtP5jF4AW0JuYlalcnE5W9AzwHf1tgb8VVg+EBCaRDZ10KULRJX40+lt0loDltBAADgKdRD1jSTWG2cmNjdh72mb3YBo/tUdJ63gdf9htS4NBHvF92BO+AdZg7RZfRH/3NvpRyG0AB9DWnqmH3HSWStOygHBnQvMvZMPrNUPX2NB9dlySfApxwC1aW/HqpDiD3KTJnmWZLknaXN5/aPJneaX6bgqhjAWyJDl+VSfgt3a7DitDXaZQabGbAr38V6JCu1Dr0TFCfbJRPmSyI2tmkx5x0ArbdiqDJmI+q0h0owzoMfOmePtFc5s56UrhAamqR6cDMScsOxsh0qYJsf/d97VSH2ob97aCh0HFjyr9/BOZI*`,
        //             "Content-Type": "application/json",
        //             "Accept": "application/json"
        //         }
        //     })
        //     console.log('all airports', rs.data)
        // })
        // return item
        let airports = []
        for (const itm of links) {
            const rs = await axios.get(`${itm.href}`, {
                headers: {
                    "Authorization": `Bearer T1RLAQIsIMsLTjd2LfaArM+b74hNIGxczswbqk7oYbA8ixr2cxDe+wmqnPNJkBm7xG7ivVIUAADgR/Xp+SVIWzMSruX79ohm8nyFLGN7HAMoPd5LWHgC0g9s5ajWvH4J5Pb78J7SBeJdHLZsRpz0vGHAXFrZiDmTTC9+ooDVg9U4qeAnU1phgW02DK2HkAHePh20AZ/fPAarp4sf4l54klf4pqyGZUx07IyjL4UMD3dal4mknDHkd/uvEdwsXm0kyhFMU69PkAPpPyA4ECWdX7qo+5TFTE/V6udIgsGbonNr6fYXgn5R+egS8et6E7V1kdl+1fV60I/1PI2a5P6cY2I3eH84TY6Bzp+3KlvESE5Ke7DCnGIat0w*`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            airports = rs.data.Airports
            for (const single_airports of airports){
                all_airports.push({
                    ...single_airports,
                    country_code: item.countryCode,
                    country_name: item.countryName,
                    city_name: item.name,
                    city_code: item.code
                })
            }
        }
        return {
            ...item,
            airports
        }
    }))
    res.status(200).json({
        status: 'Success',
        data: all_airports
    })
})