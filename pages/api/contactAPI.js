import axios from 'axios'

export default async (req, res) => {
    /*const user_ID = "user_mX30CEcEYTVb7EG39rmYu"        
    const serviceID = 'RLS Contact Form';
    const templateID = 'RLS';
    const params = req.body.params
    emailjs.send(serviceID, templateID, params, user_ID )
    .then(response => {
        console.log(response.status, response.text)
        res.status(200).send(response)
    })
    .catch(error=> {
        console.log(error)
        res.status(501).send(error)
    })

    res.status(200).send();
    
    let transporter = nodemailer.createTransport({
        service: "Godaddy", // no need to set host or port etc.
        auth: {
            user: 'patrick@lodgepoleinc.com',
            pass: 'Peter91625'
        }
   });
   
    let message = {
        from: "patrick@lodgepoleinc.com",
        to: "keatingdev25@gmail.com",
        subject: "Message from contact page",
        text: "HTML Message",
        html: `<p>${req.body.params}</p>`
    };

    console.log(req.body.params)
    res.status(200).send("OK")
    transporter.sendMail(message)
    .then(response => {
        console.log(response)
        res.send(response)
    })
    .catch(error => {
        console.error(error);
    }) */

    const user_ID = "user_mX30CEcEYTVb7EG39rmYu"        
    const serviceID = 'RLS Contact Form';
    const templateID = 'RLS';
    const template_params = req.body.params
    const access_token = '216b45fad4abda169e2d724843d2ec58'
    var data = {
        service_id: serviceID,
        template_id: templateID,
        user_id: user_ID,
        accessToken: access_token,
        template_params: template_params
    };

    axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
    .then(response => {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(error => {
        console.log(error.response.data)
    })


}