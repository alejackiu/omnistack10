const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, respose) {
        const devs = await Dev.find();
        return respose.json(devs);
    }, 
    async store(request, respose) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
    
        if (!dev) {
            const res = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = res.data;
        
            const techArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location
            });

            //Filtrar as conexões que estão há no máximo 10km de distância
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections({latitude, longitude}, techArray);

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return respose.json(dev);
    }
}