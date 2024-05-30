const { multipleMongooseToObject } = require('../../util/mongoose');
const Sensors = require('../models/Sensors');
const mqtt = require('mqtt');
const io = require('socket.io')();
const EventEmitter = require('events');

class DashboardController extends EventEmitter {
    constructor(io, mqttClient) {
        super(); // Call the constructor of the base class
        this.io = io;
        this.mqttClient = mqttClient; // Assign the mqttClient passed from outside

        // Bind the updateled method to the current instance
        this.updateled = this.updateled.bind(this);
        this.enterkey = this.enterkey.bind(this);
    
        // Subscribe to MQTT topics for different sensors
        this.mqttClient.on('connect', () => {
            console.log('Connected to Adafruit MQTT broker');
            this.mqttClient.subscribe('TyTran/feeds/microbit-temperature');
            this.mqttClient.subscribe('TyTran/feeds/microbit-humi');
            this.mqttClient.subscribe('TyTran/feeds/microbit-lux');
            this.mqttClient.subscribe('TyTran/feeds/microbit-rgb');
            this.mqttClient.subscribe('TyTran/feeds/microbit-pwd');
        });

        // MQTT message handling
        this.mqttClient.on('message', async (topic, message) => {
            console.log('Received message:', message.toString(), 'from topic:', topic);
    
            const data = JSON.parse(JSON.stringify(message.toString()));
    
            try {
                // Find the document based on the topic
                let sensor;
                switch (topic) {
                    case 'TyTran/feeds/microbit-temperature':
                        sensor = await Sensors.findOne({ sensor_name: "temperatureSensor" });
                        break;
                    case 'TyTran/feeds/microbit-humi':
                        sensor = await Sensors.findOne({ sensor_name: "humiSensor" });
                        break;
                    case 'TyTran/feeds/microbit-lux':
                        sensor = await Sensors.findOne({ sensor_name: "luxSensor" });
                        break;
                    case 'TyTran/feeds/microbit-rgb':
                        sensor = await Sensors.findOne({ sensor_name: "lightSensor" });
                        break;
                    case 'TyTran/feeds/microbit-pwd':
                        sensor = await Sensors.findOne({ sensor_name: "passwordSensor" });
                        break;
                    default:
                        console.error('Unknown topic:', topic);
                        return;
                }
    
                if (!sensor) {
                    console.error('Sensor not found');
                    return;
                }
    
                // Update the appropriate field with the received message
                switch (topic) {
                    case 'TyTran/feeds/microbit-temperature':
                        sensor.temperature = data
                        break;
                    case 'TyTran/feeds/microbit-humi':
                        sensor.humi = data
                        break;
                    case 'TyTran/feeds/microbit-lux':
                        sensor.lux = data
                        break;
                    case 'TyTran/feeds/microbit-rgb':
                        sensor.light = data
                        break;
                    case 'TyTran/feeds/microbit-pwd':
                        sensor.pwd = data
                        break;
                }
    
                // Save the updated document to the database
                await sensor.save();
    
                console.log('Sensor data saved to MongoDB');

                this.emitSensorData();

            } catch (err) {
                console.error('Error saving sensor data:', err);
            }
        });

        // this.startChangeStream();
    }

    /*
    // Detect changes
    async startChangeStream() {
        try {
            const sensors = await Sensors.find({});
            const changeStream = Sensors.watch();
            changeStream.on('change', async (change) => {
                console.log('Change detected:', change);
                if (change.operationType === 'update') {
                    // If an update operation is detected, emit 'sensorDataUpdated' event
                    this.io.emit('sensorDataUpdated', multipleMongooseToObject(sensors));
                }
            });
        } catch (err) {
            console.error('Error starting change stream:', err);
        }
    }
    */

    async emitSensorData() {
        try {
            const sensors = await Sensors.find({});
            // Emit the updated sensor data to all connected clients
            this.io.emit('sensorDataUpdated', multipleMongooseToObject(sensors));
        } catch (err) {
            console.error('Error fetching sensor data:', err);
        }
    }

    async dashboard(req, res, next) {
        try {
            const sensors = await Sensors.find({});
            res.json({ sensors: multipleMongooseToObject(sensors) })
        } catch (error) {
            next(error);
        }
    }

    async smartdoor(req, res, next) {
        try {
            const sensors = await Sensors.find({});
            res.json({ sensors: multipleMongooseToObject(sensors) })
        } catch (error) {
            next(error);
        }
    }

    async updateled(req, res, next) {
        try {
            const { action } = req.body;
            if (action === 'updateLed') {
              const lightSensor = await Sensors.findOne({ sensor_name: "lightSensor" });
              lightSensor.light = lightSensor.light === 0 ? 1 : 0;
              await lightSensor.save();

              this.mqttClient.publish('TyTran/feeds/microbit-rgb', lightSensor.light.toString());

              res.json({ success: true, message: 'LED state updated successfully', lightState: lightSensor.light });
            } else {
              res.status(400).json({ success: false, message: 'Invalid action' });
            }
          } catch (error) {
            console.error('Error updating LED:', error);
            res.status(500).json({ success: false, message: 'An error occurred' });
        }
    }

    async enterkey(req, res, next) {
        try {
            const { action, enteredNumber } = req.body;
            if (action === 'enterKey') {
                // Convert enteredNumber to string
                const digit = enteredNumber.toString();

                // Get the last character of the string
                const currentDigit = digit.charAt(digit.length - 1);

                // Find the passwordSensor
                let passwordSensor = await Sensors.findOne({ sensor_name: "passwordSensor" });

                // If passwordSensor doesn't exist, create a new one
                if (!passwordSensor) {
                    passwordSensor = new Sensors({ sensor_name: "passwordSensor", pwd: currentDigit });
                } else {
                    // Update the pwd field with the current digit
                    passwordSensor.pwd = currentDigit;
                }

                // Save the passwordSensor
                await passwordSensor.save();

                // Publish the current digit to MQTT
                this.mqttClient.publish('TyTran/feeds/microbit-pwd', currentDigit);

                // Send the response back to the client
                res.json({ success: true, message: 'Password state updated successfully', passwordState: enteredNumber });
            } else {
                res.status(400).json({ success: false, message: 'Invalid action' });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({ success: false, message: 'An error occurred' });
        }
    }
}

module.exports = new DashboardController(io, mqtt.connect('mqtt://io.adafruit.com', {
    username: 'TyTran',
    password: 'aio_QgYr96ESQHn2tWmef26USoGLUEu4', // Key or password for authentication
    clientId: 'my-client-id', // Unique client ID
    clean: true // Clean session
}));