var Sequelize = require('sequelize');
var sequelize = require('./sequelizeconfig');

var termsModel = require('./TermsModel');


var termusagesModel = sequelize.define('termusages', {
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'uuid',
        defaultValue: Sequelize.UUIDV4
    },
    applicationsID:{
        type: Sequelize.STRING,
        field: 'applicationsID'
    },
    termsID:{
        type: Sequelize.STRING,
        field: 'termsID'
    },
    textvariable:{
        type: Sequelize.STRING,
        field: 'textvariable'
    }
},{
    freezeTableName: true,
    timestamps: false
});

termusagesModel.hasOne(termsModel, {as: 'term', foreignKey: 'uuid', sourceKey: 'termsID'})

module.exports=termusagesModel;