const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Sensors = new Schema({
    sensor_name: { type: String, maxLength: 255, required: true },
    temperature: { type: Number, maxLength: 255, required: true },
    humi: { type: Number, maxLength: 255, required: true },
    lux: { type: Number, maxLength: 255, required: true },
    light: { type: Number, maxLength: 255, required: true },
    pwd: { type: String, maxLength: 255, required: true }
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

module.exports = mongoose.model('sensors', Sensors)