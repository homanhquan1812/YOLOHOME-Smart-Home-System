const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
    username: { type: String, maxLength: 255, required: true },
    password: { type: String, maxLength: 255, required: true },
    emailaddress: { type: String, maxLength: 255, required: true }
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

module.exports = mongoose.model('users', Users)