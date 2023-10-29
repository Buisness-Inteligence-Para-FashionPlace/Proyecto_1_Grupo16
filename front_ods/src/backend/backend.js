
const BASE_URL = 'http://localhost:8000'

export const getPredict = async function (data) {

    const requestPredict = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    
    return fetch(BASE_URL + "/predict", requestPredict).then(async (response) => {
        if (response.status === 412) {
            throw new Error("Error: " + (await response.text()));
        } else {
            return response.json();
        }
    });

}

export const getHistory = async function (data) {

    const requestGetHistory = {
        method: "GET",
    };
    
    return fetch(BASE_URL + "/storic", requestGetHistory)
    
}

export const postHistory = async function (data) {

    const requestPostHistory = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    
    return fetch(BASE_URL + "/history", requestPostHistory).then(async (response) => {
        if (response.status === 412) {
            throw new Error("Error: " + (await response.text()));
        } else {
            return response.json();
        }
    });

}