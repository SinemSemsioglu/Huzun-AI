'use strict';
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../ai/data');

const save = async(req, res) => {
    if (req.body.text && req.body.text.length > 0 ) {
        let filename = dataPath + '/sample.json';
        let textDB = JSON.parse(fs.readFileSync(filename));
        textDB[req.uniqueId] = req.body.text;
        fs.writeFileSync(filename, JSON.stringify(textDB));
        res.send({success: true});
    } else {
        res.send({success: false, reason: 'missing data'})
    }
}

module.exports = {
    save
}
