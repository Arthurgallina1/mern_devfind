const Dev = require('../models/Dev')
const stringParser = require('../utils/parseStringAsArray')

module.exports = {
    /*
    @Get all devs within a range
    @Filter by tech
    **/
    async index(req, res){
        const { latitude, longitude, techs } = req.query;

                
        const techsArray = stringParser(techs);
        // console.log(techsArray)
        const devs = await Dev.find({
            techs: {
                $in: techsArray,

            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates : [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 10000,
                }, 
            }
        });
        
        return res.send({devs});
    }
}