yaml = require('js-yaml');
fs   = require('fs');

const path = '/../config/yt.yml';

function Config(){
    try {
        const file = fs.readFileSync(__dirname + path,'utf8');
        const doc = yaml.safeLoad(file);
  
        return doc;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
  Google: Config()
}
