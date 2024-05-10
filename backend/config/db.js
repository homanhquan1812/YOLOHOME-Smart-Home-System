const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

async function connect()
{
	try {
		await mongoose.connect('mongodb+srv://homanhquan:homanhquan@cluster0.ap9zdrs.mongodb.net/SmartHouseSystem')
		console.log('Database connected successfully.')
	} catch (error) {
		console.log('Failed to connect to database.')
	}
}

module.exports = { connect }