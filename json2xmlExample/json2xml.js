if(process.argv.length != 3){
    console.log("Wrong schema invocation! \"node json2xml.js <instance.json>\"");
    return;
}else if(!require('fs').existsSync(process.argv[2])){
    console.log("File doesn't exist");
    return;
}

let parser = require('xml2json');

let filenameInstanceJSON = process.argv[2];
let jsonObj = JSON.parse(require('fs').readFileSync(filenameInstanceJSON, 'utf8'));

let xml = parser.toXml(jsonObj);

require('fs').writeFileSync(
    filenameInstanceJSON.substr(0, filenameInstanceJSON.lastIndexOf(".json"))+"_json2xml.xml",
    xml,
    'utf-8'
);
