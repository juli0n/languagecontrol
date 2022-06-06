var Sequelize = require('sequelize');
var sequelize = require('./sequelizeconfig');
const termusagesModel = require("./TermusagesModel");
const applicationLanguageModel = require("./ApplicationlanguagesModel");


var applicationsModel = sequelize.define('applications', {
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'uuid',
        defaultValue: Sequelize.UUIDV4
    },
    applicationname:{
        type: Sequelize.STRING,
        field: 'applicationname'
    }
},{
   freezeTableName: true,
   timestamps: false
});

applicationsModel.hasMany(termusagesModel, {as: 'usedterms', foreignKey: 'applicationsID', sourceKey: 'uuid'});
applicationsModel.hasMany(applicationLanguageModel, {as: 'activelanguages', foreignKey: 'applicationID', sourceKey: 'uuid'});



module.exports=applicationsModel;