let fs = require("fs")
const zip = require('zip-a-folder').zip;
var cloudinary = require('cloudinary').v2;
let axios = require('axios')
const path = require('path');
let { cloud_name, api_key, api_secret } = require("../config")
cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

const publish = async () => {
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
        let upload_res = await cloudinary.uploader.upload( __dirname + "/zeta_source_code.zip",{ resource_type: "raw" })
        console.log("Source code uploaded")
        let readme_data = fs.readFileSync(process.cwd() + "/zeta_readme.md", { encoding: "utf8" })
        let request_data = {
            ...file_data,
            userId:login_data.userId, 
            readme: readme_data,
            zipUrl: upload_res.secure_url,
        }
        console.log("Publishing project...")
        axios.post(`${require("../config").BASE_URL}/submit-proj`,request_data).then((res) => {
            try {
                if (res.data.error) {
                    console.log(res.data.error);
                    return;
                }
                console.log(res.data.success)

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

module.exports = publish