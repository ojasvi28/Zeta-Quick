let fs = require("fs")
const zip = require('zip-a-folder').zip;
var cloudinary = require('cloudinary').v2;
let { cloud_name, api_key, api_secret } = require("../config")
cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

const publish = async () => {
    try {
        let file_data = JSON.parse(fs.readFileSync(process.cwd() + "/zeta_init.json", { encoding: "utf-8" }))
        console.log("Compressig source code......")
        await zip(process.cwd(), __dirname + "/zeta_source_code.zip");
        console.log("Code compressed")
        console.log("Uploading Source code....")
        let upload_res = await cloudinary.uploader.upload( __dirname + "/zeta_source_code.zip",{ resource_type: "raw" })
        console.log("source code uploaded")
        let readme_data = fs.readFileSync(process.cwd() + "/zeta_readme.md", { encoding: "utf-8" })
        let request_data = {
            ...file_data,
            readme: readme_data,
            zip_url: upload_res.secure_url,
        }
    } catch (error) {
        console.log(error)
        console.log("Make sure proj exist!")
        return;
    }

}

module.exports = publish