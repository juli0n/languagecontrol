var Sequelize = require('sequelize');
var sequelize = require('./sequelizeconfig');


var languagesModel = sequelize.define('languages', {
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'uuid',
        defaultValue: Sequelize.UUIDV4
    },
    language:{
        type: Sequelize.STRING,
        field: 'language'
    },
    endonym:{
        type: Sequelize.STRING,
        field: 'endonym'
    },
    isocode:{
        type: Sequelize.STRING,
        field: 'isocode'
    },
    favourite:{
        type: Sequelize.STRING,
        field: 'favourite'
    }
},{
    freezeTableName: true,
    timestamps: false
});


module.exports=languagesModel;