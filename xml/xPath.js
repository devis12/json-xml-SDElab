if(process.argv.length != 4){
  console.log("Wrong schema invocation! \"node validate.js <filename.xml> <xpath query>\"");
  return;
}else if(!require('fs').existsSync(process.argv[2])){
  console.log("File doesn't exist");
  return;
}

let filenameXML = process.argv[2];
let xpathExpr = process.argv[3];

const xpath = require('xpath')
  , dom = require('xmldom').DOMParser;

let xml = require('fs').readFileSync(filenameXML, 'utf8');
let doc = new dom().parseFromString(xml, 'text/xml');
//let nsResolver = document.createNSResolver( doc.ownerDocument == null ? doc.documentElement : doc.ownerDocument.documentElement );

var select = xpath.useNamespaces({"pkm":"pokemonNamespace"});
//let node = null;

// Parse XML with XPath:
 var childNodes = select(xpathExpr, doc);
console.log(childNodes.toString());
