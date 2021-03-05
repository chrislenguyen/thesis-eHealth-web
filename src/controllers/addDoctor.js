const queryAddDoctor = require('../models/queryAddDoctor')

const addDoctor = (data, callback) => {
    queryAddDoctor(data, (err, data) => {
        if (err) {
            callback(err, undefined)
        } else {
            // console.log(data);
            // callback(undefined, )
        }
    })
}

module.exports = addDoctor