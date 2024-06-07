const {Person, PersonSchema} = require('../models/Person');
const {sendEmail} = require('../helpers/mailHelper');

// get all users
exports.getAllUser = async (req, res) => {
    console.log('getAllUser')
    try{
        const users = await Person.find({role:'USER'})
            .select({firstname:1,lastname:1})
            .sort({firstname:1})
            .limit(10);
        return res.status(200).json(users);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
//get user by id
exports.getUserById = async (req, res) => {
    try{
        const user=await Person.findById(req.body.id);
        if(!user) return res.status(404).json({message:'User not found'});
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
//update user
exports.updateUser = async (req, res) => {
    try{
        const user= await Person.findByIdAndUpdate(req.params.id,{
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            dob: req.body.dob,
            lieuNaissance: req.body.lieuNaissance,
            email: req.body.email,
            phone: req.body.phone,
            login: req.body.login,
            password: req.body.password,
            role:"USER",
            address: req.body.address,
            isActivate:true
        },{new:true});
        if(!user) return res.status(404).send('User not found');
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
//delete user
exports.deleteUser = async (req, res,id) => {
    try{
        const user = await Person.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message:'User not found'});
        return res.status(200).send('User deleted');
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
//get users pageable
exports.getUsersPageable = async (req, res,pageNumber,pageSize) => {
    pageNumber=req.params.pageNumber;
    pageSize=req.params.pageSize;
    try{
        const users = await Person.find({role:'USER'})
            .select({firstname:1,lastname:1})
            .sort({firstname:1})
            .skip((pageNumber-1)*pageSize)
            .limit(pageSize);
        return res.status(200).json(users);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
//send mail to user
exports.sendMailToUser = async (req, res) => {

    let emailData = {
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text
    };
    try{
        await sendEmail(emailData);
        return res.status(200).json({message:'Email sent'});
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}


