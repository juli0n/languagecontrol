var Sequelize = require('sequelize');
var sequelize = require('./sequelizeconfig');
const languagesModel = require("./LanguagesModel");


var termlanguagesModel = sequelize.define('termlanguages', {
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'uuid',
        defaultValue: Sequelize.UUIDV4
    },
    termID:{
        type: Sequelize.STRING,
        field: 'termID'
    },
    termtext:{
        type: Sequelize.STRING,
        field: 'termtext'
    },
    languageID:{
        type: Sequelize.STRING,
        field: 'languageID'
    }
},{
    freezeTableName: true,
    timestamps: false
});

termlanguagesModel.hasOne(languagesModel, {as: 'language', foreignKey: 'uuid', sourceKey: 'languageID'});



module.exports=termlanguagesModel;