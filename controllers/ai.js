'use strict';
const fs = require('fs');
const path = require('path');
const {spawn} = require("child_process");

const aiPath = path.join(__dirname, '../ai');


const generate = async(req, res) => {
    const python = spawn('python', [aiPath + '/sample.py', req.uniqueId]);

    python.stdout.on('data', (data) => {
        console.log("from python: " + data.toString());
    });

    python.on('close', (code) => {
        console.log("python process ended with code " + code)

        // check for successful code
        if(code == 0) {
            // read json data
            let data = fs.readFileSync(aiPath + '/generated/' + req.uniqueId + '.json');
            res.send({success: true, data: JSON.parse(data)});
        } else {
            res.send({success: false})
        }
    })
}

module.exports = {
    generate
}
