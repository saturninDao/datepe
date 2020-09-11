const functions = require('firebase-functions');
const admin=require('firebase-admin');
const nodemailer =required('nodemailer');

admin.initializeApp()
require('dotenv').config()


const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;

exports.sendEmailNotification=functions.firestore.document('submissions/{docId}')
.onCreate((snap,ctx)=>{
    const data=snap.data();

    let authData=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:SENDER_EMAIL,
            pass:SENDER_PASSWORD
        }
    });

    authData.sendMail({
        from :'info.truly@makethatap.com',
        to:`${data.email}`,
        subject:'Your are submission info to datepe',
        text:`${data.email}`,
        html:`${data.email}`,
    }).then(res=>console.log('successfully that mail')).catch(err=>console.log(err));
});