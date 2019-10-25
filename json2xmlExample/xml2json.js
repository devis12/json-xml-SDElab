if(process.argv.length != 3){
    console.log("Wrong schema invocation! \"node xml2json.js <instance.xml>\"");
    return;
}else if(!require('fs').existsSync(process.argv[2])){
    console.log("File doesn't exist");
    return;
}

let parser = require('xml2json');

let filenameInstanceXML = process.argv[2];
let xml = (require('fs').readFileSync(filenameInstanceXML, 'utf8'));

let jsonObj = parser.toJson(xml);

require('fs').writeFileSync(
    filenameInstanceXML.substr(0, filenameInstanceXML.lastIndexOf(".xml"))+"_xml2json.json",
    jsonObj,
    'utf-8'
);
