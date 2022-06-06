var termusagesmodel = require('../Mapper/TermusagesModel');

const {Sequelize} = require("sequelize");


var TermusagesFunctions = {

    deleteTermusage: async function (body, callback) {
        var termusageid = body.termusageid;

        termusagesmodel.destroy({
            where: {
                uuid: termusageid
            }
        }).then(value => {
            return callback('deleted');
        });
    },

    addNewTermusage: async function (body, callback) {

        var termusage = JSON.parse(body.newTermusage);

        termusagesmodel.create({
            applicationsID: termusage.applicationsID,
            termsID: termusage.termsID,
            textvariable: termusage.textvariable
        }).then(value => {
            var result = value;

            return callback(result.dataValues.uuid);

        });
    }


};




module.exports = TermusagesFunctions;
