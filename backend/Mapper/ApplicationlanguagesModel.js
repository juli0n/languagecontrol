var Sequelize = require('sequelize');
var sequelize = require('./sequelizeconfig');
const languagesModel = require("./LanguagesModel");


var applicationlanguagesModel = sequelize.define('applicationlanguages', {
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'uuid',
        defaultValue: Sequelize.UUIDV4
    },
    applicationID:{
        type: Sequelize.STRING,
        field: 'applicationID'
    },
    languageID:{
        type: Sequelize.STRING,
        field: 'languageID'
    }
},{
    freezeTableName: true,
    timestamps: false
});


applicationlanguagesModel.hasOne(languagesModel, {as: 'language', foreignKey: 'uuid', sourceKey: 'languageID'});



module.exports=applicationlanguagesModel;