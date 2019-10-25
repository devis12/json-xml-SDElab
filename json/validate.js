if(process.argv.length != 4){
    console.log("Wrong schema invocation! \"node validate.js <instance.json> <schema.json>\"");
    return;
}else if(!require('fs').existsSync(process.argv[2]) || !require('fs').existsSync(process.argv[3])){
    console.log("File(s) don't exist");
    return;
}

const Validator = require('jsonschema').Validator;

let filenameInstanceJSON = process.argv[2];
let filenameSchemaJSON = process.argv[3];
try{
    let instance = JSON.parse(require('fs').readFileSync(filenameInstanceJSON, 'utf8'));
    let schema = JSON.parse(require('fs').readFileSync(filenameSchemaJSON, 'utf8'));

    let v = new Validator();
    let result = v.validate(instance, schema);
    if(result.errors.length == 0)
        console.log("JSON instance successfully validated!");
    else{
        console.log("Sorry, your JSON instance has NOT passed the validation!\n\nErrors:\n");
        for(let err of result.errors)
            console.log("\t-", err.stack? err.stack:err, "\n");
    }
}catch(SyntaxError){
    console.log("JSON instance NOT well formed!");
}
