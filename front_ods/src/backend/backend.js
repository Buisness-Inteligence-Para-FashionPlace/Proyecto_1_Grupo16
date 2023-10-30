
const BASE_URL = 'http://localhost:8000'

export const postPredict = async function (archivo, textos) {

    const requestPredict = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({'textos': textos,
                              'archivo': archivo}),
    };
    
    return fetch(BASE_URL + "/texts", requestPredict)

}

export const getHistory = async function (data) {

    const requestGetHistory = {
        method: "GET",
    };
    
    return fetch(BASE_URL + "/storic", requestGetHistory)
    
}

export const getPredicts = async function (archivo) {

    const requestGetHistory = {
        method: "GET",
    };
    
    return fetch(BASE_URL + "/storic/"+archivo, requestGetHistory)
    
}