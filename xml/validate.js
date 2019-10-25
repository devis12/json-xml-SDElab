var libxml = require("libxmljs");
if(process.argv.length != 4){
    console.log("Wrong schema invocation! \"node validate.js <filename.xml> <filename.xsd>\"");
    return;
}else if(!require('fs').existsSync(process.argv[2]) || !require('fs').existsSync(process.argv[3])){
    console.log("File(s) don't exist");
    return;
}

let filenameXML = process.argv[2];
let filenameXSD = process.argv[3];

let xml = require('fs').readFileSync(filenameXML, 'utf8');
let xsd = require('fs').readFileSync(filenameXSD, 'utf8');

let xmlDoc, xsdDoc, wf = true;
try{
    xmlDoc = libxml.parseXml(xml);
}catch(error){
    console.log("XML file not well-formed!");
    wf = false;
}

try{
    xsdDoc = libxml.parseXml(xsd);
}catch(error){
    console.log("XSD file not well-formed!");
    wf = false;
}

if(wf){
    if(xmlDoc.validate(xsdDoc))
        console.log("XML file well formed and validated!");
    else{
        console.log("XML file has NOT successfully passed the validation!");

        console.log("\nErrors:\n");
        for(let msgErr of xmlDoc.validationErrors){
            console.log(msgErr);
        }
    }
}

