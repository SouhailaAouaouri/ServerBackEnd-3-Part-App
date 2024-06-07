const Joi = require('joi');
exports.PersonValidator =(req, res, next) => {
    const schema = Joi.object({
        lastname: Joi.string().required().min(2).max(255),
        firstname: Joi.string().required().min(2).max(255),
        dob: Joi.date().required(),
        lieuNaissance: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        password: Joi.string().required(),

    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(422).json({error: result.error.message});
    }
    next();
}
