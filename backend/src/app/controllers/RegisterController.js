const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Users = require('../models/Users')

class RegisterController
{
    async index(req, res, next) {
        try {
            const users = await Users.find({});
            res.json({ users: multipleMongooseToObject(users) })
        } catch (error) {
            next(error);
        }
    }
    
    async registerSubmit(req, res) {
        const { username, emailaddress, password } = req.body;
    
        try {
            const userCheck = await Users.findOne({ username });
            if (userCheck) {
                return res.status(401).json({ error: 'This username exists.' });
            }
            
            const userData = {
                username,
                emailaddress,
                password
            };

            await Users.create(userData);
            
            return res.redirect('/login');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error registering account' });
        }
    }    
}

module.exports = new RegisterController