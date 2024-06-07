const nodeMailer = require("nodemailer");

exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "ttccenter664@gmail.com",
            pass:"rpcv oedp hdvo sewt"
            //pwd email: "123456789TTCMailer"
        }
    });
    return transporter
        .sendMail(emailData)
        .then(info => console.log(`Message sent: ${info.response} to ${emailData.to}.`))
        .catch(err => console.log(`Problem sending email: ${err}`));
};
