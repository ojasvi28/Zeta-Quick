let fs = require("fs")
const zip = require('zip-a-folder').zip;
const publish = async() => {
    try {
        let file_data = JSON.parse(fs.readFileSync(process.cwd()+"/zeta_init.json",{encoding:"utf-8"}))
        console.log("Compressig source code......")
        await zip(process.cwd(), __dirname+"/zeta_source_code.zip");
        console.log("Code compressed")
                        
    } catch (error) {
        console.log("Make sure proj exist!")
        return;
    }

}

module.exports = publish