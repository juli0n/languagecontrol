var termsmodel = require('../Mapper/TermsModel');
var termusagesmodel = require('../Mapper/TermusagesModel');
var termlanguagesmodel = require('../Mapper/TermlanguagesModel');



const {Sequelize} = require("sequelize");


var TermsFunctions = {

    getAllTerms: async function (body, callback) {

        var terms = await termsmodel.findAll({
            include: [{all: true, nested: true}]
        });
        return callback(terms);
    },


    getAllNotActivatedLanguages: async function (body, callback) {
        var application = body.applicationid;

        var terms = await termsmodel.findAll({
            include: [{all: true, nested: true}],
            where: {
                uuid: {
                    [Sequelize.Op.notIn]: Sequelize.literal(`(
                    select termsID from termusages where applicationsID = '${application}'
                )`)
                }
            }
        });

        return callback(terms);
    },



    deleteTerm: async function (body, callback) {
        var termid = body.termid;

        termusagesmodel.destroy({
            where: {
                termsID: termid
            }
        }).then(value2 => {

            termlanguagesmodel.destroy({
                where: {
                    termID: termid
                }
            }).then(value1 => {

                termsmodel.destroy({
                    where: {
                        uuid: termid
                    }
                }).then(value => {

                    return callback('term_and_links_deleted');

                });

            })

        })

    },



    addNewTerm: async function (body, callback) {

        var term = JSON.parse(body.newterm);

        termsmodel.create({
            defaultterm: term.defaultterm
        }).then(value => {
            var result = value;

            if (term.languages.length != 0){

                term.languages.forEach(element => {
                    termlanguagesmodel.create({
                        termID: result.dataValues.uuid,
                        termtext: element.termtext,
                        languageID: element.languageID
                    })
                });
            }

            return callback('term_created');

        });
    }



};




module.exports = TermsFunctions;
