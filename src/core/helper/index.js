import { API } from "../../backend";

export const createFeedback = user => {
    
    return fetch(`${API}feedback/feedback/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}