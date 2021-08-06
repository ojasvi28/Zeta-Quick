let prompt = require('prompt');
let axios = require('axios')
let fs = require("fs");
const path = require('path');

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
            try {
                if (res.data.error) {
                    console.log(res.data.error);
                    return;
                }
                let data = {
                    userId: res.data.success
                }
                fs.writeFileSync(path.join(__dirname ,"../zeta_init.json"), JSON.stringify(data))
                console.log("Login Successful")

            } catch (error) {
                console.log("Error Login User!")
            }

        }).catch((err) => {
            console.log("Error Please Try again!");

        })
    });
}

module.exports = login