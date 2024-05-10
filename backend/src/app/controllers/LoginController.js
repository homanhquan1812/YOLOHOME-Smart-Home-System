const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Users = require('../models/Users')

class LoginController
{
    async index(req, res, next) {
        try {
            const users = await Users.find({});
            res.json({ users: multipleMongooseToObject(users) })
        } catch (error) {
            next(error);
        }
    }
    
    async loginSubmit(req, res)
    {
        const { username, password } = req.body;

        try {
            const userLoggingin = await Users.findOne({ username });

            if (!userLoggingin || userLoggingin.password !== password) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            req.session.username = userLoggingin.username;
            return res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error logging in' });
        }
    }
}

module.exports = new LoginController