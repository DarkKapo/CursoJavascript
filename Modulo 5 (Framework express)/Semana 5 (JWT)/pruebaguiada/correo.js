const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "darkkapo@gmail.com",
        pass: "krhfavfsglslwhqo"
    }
})

const send = async (email, nombre) => {
    let mailOptions = {
        from: "darkkapo@gmail.com",
        to: [email],
        subject: `Saludos desde la NASA`,
        html: `<h3> Hola ${nombre} <br> La Nasa te da las gracias por compartir tus experiencias</h3>`,
    }
    await transporter.sendMail(mailOptions)
}

module.exports = send