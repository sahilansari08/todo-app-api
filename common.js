const fs = require("fs");

const readFile = (filename)=>{
    return JSON.parse(fs.readFileSync(`database/${filename}.json`, 'utf8'))
}

const writeFile = (filename,data)=>{
    return  fs.writeFileSync(`database/${filename}.json`, JSON.stringify(data, null, 4))

}

module.exports = {readFile,writeFile}