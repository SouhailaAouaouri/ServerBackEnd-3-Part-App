const express = require('express');
const admin= require('../routes/adminRoutes');
const user= require('../routes/userRoutes');
const security= require('../routes/securityRoutes');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/admin', admin);
    app.use('/api/user', user);
    app.use('/api/security', security);
}