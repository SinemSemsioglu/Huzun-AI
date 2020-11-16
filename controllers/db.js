'use strict';
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../ai/data');

const save = async(req, res) => {
    if (req.body.text && req.body.text.length > 0 ) {
        let filename = dataPath + '/sample.json';
        let textDB = JSON.parse(fs.readFileSync(filename));
        let submittedText = textDB.submitted;
        submittedText.push({
            timestamp: Date.now(),
            req_id: req.uniqueId,
            text: req.body.text
        })

        // for now, to make sure the latest element is displayed
        submittedText.sort((el1, el2) => {return el1.timestamp < el2.timestamp})

        fs.writeFileSync(filename, JSON.stringify(textDB));
        res.send({success: true});
    } else {
        res.send({success: false, reason: 'missing data'})
    }
}

module.exports = {
    save
}
