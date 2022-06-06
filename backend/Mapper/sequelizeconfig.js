var Sequelize = require('sequelize');
const path = require("path");


var dburl = path.resolve(__dirname, "./translation.sqlite");


const sequelizeconfig = new Sequelize({
    dialect: 'sqlite',
    storage: dburl
});


module.exports=sequelizeconfig;
