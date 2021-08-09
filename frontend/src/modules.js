import axios from "axios"
// const BASE_URL = process.env.BASE_URL || ""
const BASE_URL = "http://localhost:7000"
const fetchData = (URL, DATA = {}, METHOD = 'GET') => {
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