

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../../resources/data.env')
});
class EnvManager {

    static get(key) {
        return process.env[key];
    }

    static getOrDefault(key, defaultValue) {
        return process.env[key] || defaultValue;
    }
}

module.exports = EnvManager;