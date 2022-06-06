
const {Sequelize} = require("sequelize");
var termlanguagesmodel = require('../Mapper/TermlanguagesModel');



var TermlanguagesFunctions = {

    updateTermlanguages: async function (body, callback) {

        var term = JSON.parse(body.updatedTerm);

        term.languages.forEach(element => {

            if (element.uuid != ''){

                termlanguagesmodel.update({ termtext: element.termtext, languageID: element.languageID }, {
                    where: {
                        uuid: element.uuid
                    }
                });

            }else{

                termlanguagesmodel.create({
                    termID: term.uuid,
                    termtext: element.termtext,
                    languageID: element.languageID
                })

            }

        });

        return callback('updated');
    },




    addActiveLanguage: async function (body, callback) {

        var language = JSON.parse(body.newlanguage);

        termlanguagesmodel.create({
            applicationID: language.applicationID,
            languageID: language.languageID
        }).then(value => {
            var result = value;

            return callback('language_activated');

        });
    },






    deleteTermlanguage: async function (body, callback) {
        var termlanguageid = body.termlanguageid;

        termlanguagesmodel.destroy({
            where: {
                uuid: termlanguageid
            }
        }).then(value => {
            return callback('deleted');
        });
    }

};




module.exports = TermlanguagesFunctions;
