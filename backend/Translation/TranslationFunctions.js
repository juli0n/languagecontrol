var applicationsmodel = require('../Mapper/ApplicationsModel');
const {Sequelize} = require("sequelize");


var TranslationFunctions = {


    getAllApplicationTerms: async function (body, callback) {

        var application = body.applicationname;
        var languageiso = body.languageiso;

        var applicationTerms = await applicationsmodel.findAll({
            include: [{all: true, nested: true}],
            where: [{
                'applicationname':application,
                '$usedterms.term.languages.language.isocode$': languageiso
            }]
        });
        return callback(applicationTerms);
    },


    getAllLanguages: async function (body, callback) {

        var application = body.applicationname;

        var applicationTerms = await applicationsmodel.findAll({
            include: [{all: true, nested: true}],
            where: [{
                'applicationname':application
            }]
        });
        return callback(applicationTerms);
    },




};




module.exports = TranslationFunctions;
