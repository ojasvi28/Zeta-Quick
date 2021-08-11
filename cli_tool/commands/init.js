let prompt = require('prompt');
let fs = require("fs");
const path = require('path');
let List = require('prompt-list');
const init = () => {

    try {
        if (fs.existsSync(process.cwd() + "/zeta_init.json")) {
            try {
                let data = JSON.parse(fs.readFileSync(process.cwd() + "/zeta_init.json", { encoding: "utf-8" }))
                if (data.projId) {
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
            name: 'version',
            default: '1.0',

        },
        ], (err, result) => {
            if (err) {
                console.log("Error! please try again!")
                return;
            }

            let techStackList = new List({
                name: 'techStack',
                message: 'Techstack',
                choices: [
                    'Android',
                    'Ios',
                    'Flutter',
                    'Nodejs',
                    'Php',
                    'Java',
                    'React',
                ]
            });
            techStackList.ask((tech) => {
                let file_data = {
                    title: result.title,
                    description: result.description,
                    author: result.author,
                    logo: require('../config').techStack[tech],
                    verson: result.version,
                    projId: require('short-uuid').generate(),
                    techStack: tech
                }
                fs.writeFileSync(process.cwd() + "/zeta_init.json", JSON.stringify(file_data))
                fs.copyFileSync(path.join(__dirname, "../zeta_readme.md"), `${process.cwd()}/zeta_readme.md`)
                console.log("Project Created Successful!")
            });

        });
    } catch (error) {
        console.log(error)
        console.log("Please login first using command : zeta-quick login")
        return;
    }
}
module.exports = init;