const bcrypt = require("bcrypt");
const {Person} = require("../models/Person");
const {generateAuthToken} = require("../helpers/authHelper");
const axios = require('axios');
//login
exports.login = async function (req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Please provide email and password');
    }
    try {
        let person= await Person.findOne({ email: email });
        //tester si l'email existe
        if (!person )  return res.status(400).send('Invalid email !');
        //tester si le compte est activé
        if(person.isActivate===false) return res.status(400).send('Your account is not validated yet');
        //tester si le password est valide
        const validPassword = await bcrypt.compare(password, person.password);
        if (!validPassword) return res.status(400).send('Invalid password');
        //générer le token dans le cas où tout est valide(email et password)
        const token = generateAuthToken(person);
        return res.status(200).json({token:token});
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
}
//create a user
exports.signUpUser = async function (req, res) {
    try{
        const person = new Person({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            dob: req.body.dob,
            lieuNaissance: req.body.lieuNaissance,
            email: req.body.email,
            phone: req.body.phone,
            login: req.body.login,
            password: req.body.password,
            role:'USER',
            adresse: req.body.adresse,
            isActivate:false
        });
        const result = await person.save();
        if(!result) return res.status(400).send('Error saving person');
        return res.status(201).json(person);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
//create admin
exports.signUpAdmin = async function (req, res) {
    try{
        // Générer un sel (salt) avec une force de hachage de 10
        const salt = await bcrypt.genSalt(10);
        //Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const person = new Person({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            dob: req.body.dob,
            lieuNaissance: req.body.lieuNaissance,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            role:'ADMIN',
            adresse: req.body.adresse,
            isActivate:true
        });
        const result = await person.save();
        if(!result) return res.status(400).send('Error saving person');
        return res.status(201).json(person);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.authenticatToIDP = async function (req, res) {
    let { client_id, client_secret,grant_type } = req.body;
    if (!client_id || !client_secret || !grant_type) {
        return res.status(400).send('Please provide client_id, client_secret and grant_type');
    }
    try {
        const response= await axios.post('http://0.0.0.0:3000/oauth2/token', {
            client_id: client_id,
            client_secret: client_secret,
            grant_type:grant_type
        });
        return res.status(200).json(response.data);
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
}