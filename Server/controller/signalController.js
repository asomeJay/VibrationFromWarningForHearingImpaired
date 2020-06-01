import dotenv from 'dotenv';
// import multer from 'multer';
// import path from 'path';
import spawn from 'child_process';
import fs from 'fs';
import config from '../config.json'
import axios from 'axios'

dotenv.config();

function _python() {
    return new Promise((resolve, object) => {
        const pythonProcess = spawn.spawn('python3', [config.pythonPath, '--config=../ML/Keras-Project-Template/configs/wav_classify_config.json']);
        var dataToSend;
        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
            dataToSend = data.toString();
        });
    
        pythonProcess.on('close', (code) => {
            console.log(`${code}`);
            resolve(dataToSend);
        })
    });
        
}

export const middleUpload = (req, res, next) => {
	console.log(new Date());
    console.log("middleUpload");
    try {
        var data = new Buffer('');
        req.on('data', (chunk) => {
            data = Buffer.concat([data, chunk]);
        })
        req.on('end', () => {
            console.log("Data", data);
    
            req.rawBody = data;
            next();
        })
    } catch (error) {
        console.err(error);
        return res.sendStatus(400);
    }
}

export const soundPost = async (req, res) => {
    var dataToSend = "";
    await fs.writeFile(config.fileName, req.rawBody, (err) => {
        if (err) return console.log(err);
    });
    const request = axios.get('http://localhost:5000/').then(response => {
        console.log(response);
        return response;
    })

    console.log("Request", request);
    return res.sendStatus(200);
    // dataToSend = await _python();
    // var listed = [];
    // listed = dataToSend.split('\n');
    // console.log("dataToSend : ", listed);
    const color = (listed[9] === 'baby cry' ? 'B' : (listed[9] === 'siren'?'R':'NULL'));
    const vibrate = (color == 'NULL' ? 'OFF' : 'ON');
    if(vibrate === 'OFF') return res.status(203).send("fuck");
	else if(color === 'B') return res.status(201).send("201ddd");
	else if(color === 'R') return res.status(202).send("202ddd");
	else {
		console.log("else");
		return res.status(500).send("220002");
	}
   /* res.send({
        color: color,
        vibrate: vibrate
    });*/
}
const task = []
// export const vibeLedGet = (req, res) => {
//     console.log("VIBELGET");
//     // const pythonProcess = spawn.spawn('python', ["C:/Users/KimJaeWon/Desktop/Project/VibrationFromWarningForHearingImpaired/ML/Keras-Project-Template/main.py"]);
    
//     var dataToSend;
    
    

export const vibeLedGet = (req, res) => {
    console.log("VIBELGET");
    return res.sendStatus(200);
    // const pythonProcess = spawn.spawn('python', ["C:/Users/KimJaeWon/Desktop/Project/VibrationFromWarningForHearingImpaired/ML/Keras-Project-Template/main.py"]);
    
    
    

    // var ID = req.query.ID;
    // var PW = req.query.PW;
    // if (ID === process.env.ID && PW === process.env.PASSWORD) {
    //     var color = req.query.color;

    //     vibrate();
    //     led(color);
    // }
}
