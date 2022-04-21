import { encryptData } from "../utils/encrypt";

export const getService = async (url) => {
    const token = encryptData();

    const query = await fetch(url,{
        headers: {
             Authorization: token
        },
        method: 'GET'
    })
    .then(resp => resp.json())
    
    return query;
}

export const postService = async (url, data) => {
    const token = encryptData();
    const query = await fetch(url,{
        headers: {
           "Content-Type": "application/json",
            Authorization: token
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    
    return query;
}