const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
/*
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
*/


const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tda92212@gmail.com',
        pass: 'datepe#2020'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;
        const sujet = req.query.sujet;
        const message = req.query.message;

        const mailOptions = {
            from: 'daTépé | location/Res. de Salles', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            bcc: 'daomag30@yahoo.com',
            subject: sujet, // email subject
            html: message // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send(JSON.stringify('Sended '+dest+' '+sujet+' '+message));
        });
    });    
});

