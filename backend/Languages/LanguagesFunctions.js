
const {Sequelize} = require("sequelize");
var applicationsmodel = require('../Mapper/ApplicationsModel');
var languagesmodel = require('../Mapper/LanguagesModel');
const termlanguagesmodel = require("../Mapper/TermlanguagesModel");
const applicationlanguagesmodel = require("../Mapper/ApplicationlanguagesModel");
const termusagesmodel = require("../Mapper/TermusagesModel");
const termsmodel = require("../Mapper/TermsModel");




var LanguagesFunctions = {

    getAllLanguages: async function (body, callback) {

        var languages = await languagesmodel.findAll({
            order: [['favourite', 'DESC']]
        });
        return callback(languages);
    },


    updateLanguage: async function (body, callback) {
        var language = JSON.parse(body.language);
        languagesmodel.update({ language: language.language, endonym: language.endonym, isocode: language.isocode, favourite: language.favourite }, {
            where: {
                uuid: language.uuid
            }
        }).then(value => {
            var result = value;

            return callback('updated');

        });
    },


    addNewLanguage: async function (body, callback) {

        var language = JSON.parse(body.language);


        languagesmodel.create({
            language: language.language,
            endonym: language.endonym,
            isocode: language.isocode,
            favourite: language.favourite
        }).then(value => {
            var result = value;

            return callback('language_created');

        });

    },


    deleteLanguage: async function (body, callback) {
        var languageid = body.languageid;

        languagesmodel.destroy({
            where: {
                uuid: languageid
            }
        }).then(value2 => {

            termlanguagesmodel.destroy({
                where: {
                    languageID: languageid
                }
            }).then(value1 => {

                applicationlanguagesmodel.destroy({
                    where: {
                        languageID: languageid
                    }
                }).then(value => {

                    return callback('language_deleted');

                });

            })

        })

    },



};




module.exports = LanguagesFunctions;
