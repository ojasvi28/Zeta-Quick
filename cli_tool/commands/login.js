let prompt = require('prompt');
let axios = require('axios')
let fs = require("fs")

const login = () => {
    prompt.get([{
        name: 'email',
        required: true
    }, {
        name: 'password',
        hidden: true,
        conform: function (value) {
            return true;
        }
    }], (err, result) => {
        axios.post(`${require("../config").BASE_URL}/login`, {
            email: result.email,
            password: result.password
        }).then((res) => {
            if (res.data.error) {
                console.log(res.data.error);
                return;
            }
            try {
                let data = fs.readFileSync(process.cwd() + "/zeta_init.json", { encoding: "utf-8" })
                try {
                    data = JSON.parse(data)
                    data.userId = res.data.success
                    fs.writeFileSync(process.cwd() + "/zeta_init.json", JSON.stringify(data))
                    console.log("Login Successful!")
                } catch (error) {
                    data = {
                        userId: res.data.success
                    }
                    fs.writeFileSync(process.cwd() + "/zeta_init.json", JSON.stringify(data))
                    console.log("Login Successful!")
                }
            } catch (error) {
                let data = {
                    userId: res.data.success
                }
                fs.writeFileSync(process.cwd() + "/zeta_init.json", JSON.stringify(data))
                console.log("Login Successful!")
            }
            
        }).catch((err) => {
            console.log("Error Please Try again!");

        })
    });
}

module.exports = login