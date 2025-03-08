const { default: axios } = require("axios");
const catchAsyncError = require("../utils/catchAsyncError");

exports.get_all_cities = catchAsyncError(async (req, res) => {
    const response = await axios.get(`https://api.cert.platform.sabre.com/v1/lists/supported/cities`, {
        headers: {
            "Authorization": `Bearer T1RLAQJ3m+J2huIiuVeKAKGFBcAsu00hQh7Lx8pJFjPaWJedgBBQ2MLxU77p/6ODIWfvtBY2AADgR4XNCofPXUCtEo8h5qI5yATFYZlCLW7MEufwrirv+UWB1HiwknDMW40zcSTGITfrc+fjY4EAdRHiRDXbUf7S1xlWPPGcqklqb0wY/xDyntOBfbFnxvdmqAASMSaiviSjalqGsa9/NhCc1VaAKbD0PCWOKJPXQHhXrH6QabvQgqytgAOQCwMUyemnF/q8ou5YXxWKaGEKYkytnlv9E8fyL4Ju1WsTirK9NK0zEql8q/PfJa9l2A6xD+uMNkCSnVauEbVFpD5HXIp9lx80OfxwoRz5a2SsUkLbrfP+S5MIM3o*`,
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
                    "Authorization": `Bearer T1RLAQJ3tjtP5jF4AW0JuYlalcnE5W9AzwHf1tgb8VVg+EBCaRDZ10KULRJX40+lt0loDltBAADgKdRD1jSTWG2cmNjdh72mb3YBo/tUdJ63gdf9htS4NBHvF92BO+AdZg7RZfRH/3NvpRyG0AB9DWnqmH3HSWStOygHBnQvMvZMPrNUPX2NB9dlySfApxwC1aW/HqpDiD3KTJnmWZLknaXN5/aPJneaX6bgqhjAWyJDl+VSfgt3a7DitDXaZQabGbAr38V6JCu1Dr0TFCfbJRPmSyI2tmkx5x0ArbdiqDJmI+q0h0owzoMfOmePtFc5s56UrhAamqR6cDMScsOxsh0qYJsf/d97VSH2ob97aCh0HFjyr9/BOZI*`,
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