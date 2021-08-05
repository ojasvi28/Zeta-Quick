let prompt = require('prompt');
let fs = require("fs");
const path = require('path');
const init = () => {

    try {
        let file_data = fs.readFileSync(`${process.cwd()}/zeta_init.json`, { encoding: "utf-8" })
        file_data = JSON.parse(file_data)
        if (!file_data.userId) {
            console.log("Please login first using command : zeta-quick login")
            return;
        }
        if (file_data.projectId) {
            console.log("Project already exist")
            return;
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
            file_data.title = result.title;
            file_data.description = result.description
            file_data.author = result.author
            file_data.logo = result.logo
            file_data.verson = result.verson
            file_data.projectId = require('short-uuid').generate();
            fs.writeFileSync(process.cwd() + "/zeta_init.json", JSON.stringify(file_data))
            fs.copyFileSync(path.join(__dirname, "../README.md"), `${process.cwd()}/zeta_readme.md`)
            console.log("Project Created Successful!")
        });
    } catch (error) {
        console.log("Please login first using command : zeta-quick login")
        return;
    }
}
module.exports = init;