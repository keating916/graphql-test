import emailjs from 'emailjs-com';

export default async (req, res) => {
    const user_ID = "user_mX30CEcEYTVb7EG39rmYu"        
    const serviceID = 'RLS Contact Form';
    const templateID = 'RLS';
    const params = req.body.params
    emailjs.send(serviceID, templateID, params, user_ID )
    .then(response => {
        console.log(response)
        res.status(200).send(response)
    })
    .catch(error=> {
        console.log(error)
        res.status(501).send(error)
    })

    res.status(200).send();

}