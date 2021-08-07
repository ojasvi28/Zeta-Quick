let prompt = require('prompt');
let axios = require('axios')
let fs = require("fs");
const path = require('path');
const loading =  require('loading-cli');

const login = () => {
    let load = ""
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

        load = loading({
        "text":"Verifying details.....",
        "color":"yellow",
        "interval":400,
        "stream": process.stdout,
        "frames":["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"]
      }).start()

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

        }).finally(()=>load.stop())
    });
}

module.exports = login