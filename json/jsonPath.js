if(process.argv.length != 4){
    console.log("Wrong schema invocation! \"node jsonPath.js <instance.json> <jsonPath query>\"");
    return;
}else if(!require('fs').existsSync(process.argv[2])){
    console.log("File doesn't exist");
    return;
}

const jp = require('jsonpath');
const beautify = require("json-beautify");

let filenameInstanceJSON = process.argv[2];
let jsonPathQuery = process.argv[3];

let instance;

try{
    instance = JSON.parse(require('fs').readFileSync(filenameInstanceJSON, 'utf8'));
}catch(SyntaxError){
    console.log("JSON instance NOT well formed!");
}

try{
    let result = jp.query(instance, jsonPathQuery);
    
    console.log(beautify(result, null, 2, 100));

}catch(SyntaxError){
    console.log("Wrong query syntax!", SyntaxError);
}


 
