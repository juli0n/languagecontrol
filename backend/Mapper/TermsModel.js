var Sequelize = require('sequelize');
var sequelize = require('./sequelizeconfig');

var termlanguagesModel = require('./TermlanguagesModel');


var termsModel = sequelize.define('terms', {
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'uuid',
        defaultValue: Sequelize.UUIDV4
    },
    defaultterm:{
        type: Sequelize.STRING,
        field: 'defaultterm'
    }
},{
    freezeTableName: true,
    timestamps: false
});

termsModel.hasMany(termlanguagesModel, {as: 'languages', foreignKey: 'termID', sourceKey: 'uuid'});

module.exports=termsModel;