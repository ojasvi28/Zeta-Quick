let fs = require("fs")
const zip = require('zip-a-folder').zip;
var cloudinary = require('cloudinary').v2;
let axios = require('axios')
const path = require('path');
var markdown = require( "markdown" ).markdown;
var readMarkdown = require('read-markdown')
let { cloud_name, api_key, api_secret,BASE_URL } = require("../config")
cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

const update = async () => {
    try {
        let login_data = {}
        try {
            login_data = fs.readFileSync(path.join(__dirname ,"../zeta_init.json"), { encoding: "utf-8" })
            login_data = JSON.parse(login_data)
            if (!login_data.userId) {
                console.log("Please login first using command : zeta-quick login")
                return;
            }
        } catch (error) {
            console.log(error)
            console.log("Please login first using command : zeta-quick login")
            return;
        }
        let file_data = JSON.parse(fs.readFileSync(process.cwd() + "/zeta_init.json", { encoding: "utf-8" }))
        console.log("Compressig source code......")
        await zip(process.cwd(), __dirname + "/zeta_source_code.zip");
        console.log("Code compressed")
        console.log("Uploading Source code....")
        let stats = fs.statSync(__dirname + "/zeta_source_code.zip")
        let fileSizeInBytes = stats.size;
        let inKb = fileSizeInBytes / 1024
        if(inKb > (1024*5)){
            console.log("File too large maximum limit is 5mb")
            return
        }
        let fileSize = `${Number(inKb.toString().split(".")[0])}Kb`
        let upload_res = await cloudinary.uploader.upload( __dirname + "/zeta_source_code.zip",{ resource_type: "raw" })
        console.log("Source code uploaded")
        let readme_data = fs.readFileSync(process.cwd() + "/zeta_readme.md", { encoding: "utf8" })
        let request_data = {
            ...file_data,
            userId:login_data.userId, 
            readme: readme_data,
            zipUrl: upload_res.secure_url,
            fileSize
        }
        console.log("Upadating project")
        axios.post(`${require("../config").BASE_URL}/update-proj`,request_data).then((res) => {
            try {
                if (res.data.error) {
                    console.log(res.data.error);
                    return;
                }
                console.log(res.data.success)
                console.log(`${BASE_URL}/#/project/${request_data.projId}`)

            } catch (error) {
                console.log("Server Error")
            }

        }).catch((err) => {
            console.log("Server Error")

        })
    } catch (error) {
        console.log(error)
        console.log("Make sure proj exist!")
        return;
    }

}

module.exports = update