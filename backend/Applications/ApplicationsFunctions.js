const {Sequelize} = require("sequelize");
var applicationsmodel = require('../Mapper/ApplicationsModel');
const termusagesmodel = require("../Mapper/TermusagesModel");
const applicationlanguagesmodel = require("../Mapper/ApplicationlanguagesModel");


var ApplicationsFunctions = {


    addNewApplication: async function (body, callback) {

        var application = body.applicationname;

        applicationsmodel.create({
            applicationname: application
        }).then(value => {
            var result = value;

            return callback('application_created');

        });
    },

    getAllApplications: async function (body, callback) {
        var languages = await applicationsmodel.findAll({
            include: [{all: true, nested: true}]
        });
        return callback(languages);
    },


    getAllApplicationTerms: async function (body, callback) {

        var application = body.applicationname;
        var languageiso = body.languageiso;

        var applicationTerms = await applicationsmodel.findAll({
            include: [{all: true, nested: true}],
            where: [{
                'applicationname':application,
                '$usedterms.term.languages.language$': languageiso
            }]
        });
        return callback(applicationTerms);
    },


    getAllApplicationsForTerm: async function (body, callback) {

        var termid = body.termid;

        var applist = await applicationsmodel.findAll({
            include: [{all: true, nested: true}],
            where: {
                '$usedterms.termsID$': termid
            }
        });
        return callback(applist);
    },




    deleteApplication: async function (body, callback) {
        var applicationid = body.applicationid;

        applicationlanguagesmodel.destroy({
            where: {
                applicationID: applicationid
            }
        }).then(value2 => {

            termusagesmodel.destroy({
                where: {
                    applicationsID: applicationid
                }
            }).then(value1 => {


                applicationsmodel.destroy({
                    where: {
                        uuid: applicationid
                    }
                }).then(value3 => {
                    return callback('deleted');
                })

            })

        })

    },


};




module.exports = ApplicationsFunctions;
