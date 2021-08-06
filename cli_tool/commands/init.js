let prompt = require('prompt');
let fs = require("fs");
const path = require('path');
const init = () => {

    try {
        let login_data = fs.readFileSync(path.join(__dirname ,"../zeta_init.json"), { encoding: "utf-8" })
        login_data = JSON.parse(login_data)
        if (!login_data.userId) {
            console.log("Please login first using command : zeta-quick login")
            return;
        }
        if (fs.existsSync(process.cwd()+"/zeta_init.json")) {
            try {
                let data = JSON.parse(fs.readFileSync(process.cwd()+"/zeta_init.json",{encoding:"utf-8"}))
                if(data.projectId){
                    console.log("Project already exist")
                    return;
                }
            } catch (error) {
                
            }
        }
        prompt.get([{
            name: 'title',
            required: true,
            description: "Project Title"
        }, {
            name: 'description',
            required: true,
            description: "Project Description"
        },
        {
            name: 'author',
            required: true,
        },
        {
            name:'version',
            default:'1.0',

        },
        {
            name: 'logo',
            required: false,
            description: "Logo path (relative)",
            default: "",
        }
        ], (err, result) => {
            if (err) {
                console.log("Error! please try again!")
                return;
            }
            let file_data = {
                title:result.title,
                description : result.description,
                author : result.author,
                logo : result.logo,
                verson :result.verson,
                projId : require('short-uuid').generate(),
                techStack:"randomTechStack"
            }
            fs.writeFileSync(process.cwd() + "/zeta_init.json", JSON.stringify(file_data))
            fs.copyFileSync(path.join(__dirname, "../README.md"), `${process.cwd()}/zeta_readme.md`)
            console.log("Project Created Successful!")
        });
    } catch (error) {
        console.log(error)
        console.log("Please login first using command : zeta-quick login")
        return;
    }
}
module.exports = init;