import axios from "axios"
let currentHost = window.location.hostname
const BASE_URL = currentHost.includes("localhost") ? "http://localhost:7000" : "https://zeta-marketplace.herokuapp.com"

const fetchData = (URL, DATA = {}, METHOD = 'GET') => {
    console.log(BASE_URL)
    return new Promise((resolve, reject) => {
        METHOD == "POST" ? axios.post(BASE_URL + URL, DATA, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((res) => resolve(res.data)).catch((err) => reject(err)) :
            axios.get(BASE_URL + URL, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then((res) => resolve(res.data)).catch((err) => reject(err))

    })

}
export {
    fetchData,
    BASE_URL
}