const axios = require('axios');
const Dev = require('../models/Dev')
const stringParser = require('../utils/parseStringAsArray')

module.exports = {
    async store(req, res) {
            const { github_username, techs, latitude, longitude } = req.body;
            const techsArray = stringParser(techs);

            let dev = await Dev.findOne({github_username})
        
           if(!dev){
            try {
                const response = await axios.get(`https://api.github.com/users/${github_username}`);
                const { name = login, avatar_url, bio } = response.data;
               
        
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                }
        
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
        
                })
        
                return res.send(dev);
            } catch(err) {
                console.log(err)
                return res.err(err)
            }
           }
           return res.send(dev);
        
    },

    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    }
}