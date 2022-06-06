const {Sequelize} = require("sequelize");
const applicationlanguagesmodel = require("../Mapper/ApplicationlanguagesModel");


var ApplicationlanguagesFunctions = {


    removeActiveLanguage: async function (body, callback) {
        var applicationID = body.applicationID;
        var languageID = body.languageID;

        applicationlanguagesmodel.destroy({
            where: {
                applicationID: applicationID,
                languageID: languageID
            }
        }).then(value => {
            return callback('language_deactivated');
        });
    },


    addActiveLanguage: async function (body, callback) {

        var language = JSON.parse(body.newlanguage);

        applicationlanguagesmodel.create({
            applicationID: language.applicationID,
            languageID: language.languageID
        }).then(value => {
            var result = value;

            return callback('language_activated');

        });
    },



};




module.exports = ApplicationlanguagesFunctions;
