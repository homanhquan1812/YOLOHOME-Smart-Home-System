const loginRouter = require('./login');
const registerRouter = require('./register')
const dashboardRouter = require('./dashboard')
const logoutRouter = require('./logout')
const smartdoorRouter = require('./smartdoor')

function route(app) {
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/dashboard', dashboardRouter)
    app.use('/logout', logoutRouter)
    app.use('/smartdoor', smartdoorRouter)
}

module.exports = route;