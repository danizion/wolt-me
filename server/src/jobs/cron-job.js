const cron = require('node-cron');
const transporter = require('../../cron-mail');

cron.schedule('* 2 * * *', function() {
    console.log('----------------');
    console.log('Running Cron Job');



    let messageDetails = {
        from : '',
        to: '',
        subject: '',
        text: ''
    };

    transporter.sendMail(messageDetails, function(err, info) {
        if (error) {
            throw error;
        } else {
            console.log("Email Successfully Sent");
        }
    })
})