import { API } from '../../backend';

export const signupcm = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}companyhr/company/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const signincm = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}companyhr/signin/`,{
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem("hr-jwt",JSON.stringify(data));
        next();
    }
}

export const isAuthenticatedC = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("hr-jwt")) {
      return JSON.parse(localStorage.getItem("hr-jwt"));
      //TODO: compare JWT with database json token
    } else {
      return false
    }
};

export const signoutc = next => {
    const userId = isAuthenticatedC() && isAuthenticatedC().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("hr-jwt")
        return fetch(`${API}companyhr/signout/${userId}`,{
            method: "GET"
        })
        .then(response => {
            console.log("Signout Success");
            next()
        })
        .catch(err => console.log(err))
    }

}

export const createjob = user => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}companyhr/companyJob/`,{
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const editjob = (id,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}companyhr/companyJob/${id}/`,{
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const confirmstd = (id,value) => {
    const formData = new FormData()
    
    formData.append("status", value)

    return fetch(`${API}companyhr/applyJob/${id}/`,{
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const confirm_mail = (id,jid,cid) => {

    return fetch(`${API}companyhr/confirmmail/${id}/${jid}/${cid}/`,{
        method: "GET"
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const reject_mail = (id,jid,cid) => {

    return fetch(`${API}companyhr/rejectmail/${id}/${jid}/${cid}/`,{
        method: "GET"
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const send_mail = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}companyhr/sendmail/`,{
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const resetPass = (userId,val) => {
    const formData = new FormData()

    formData.append("password", val)

    return fetch(`${API}companyhr/company/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const editProfile = (id,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}companyhr/company/${id}/`,{
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const createQuiz = user => {
    
    return fetch(`${API}quiz/quizhome/`, {
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

export const editQuiz = (id,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}quiz/quizhome/${id}/`,{
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}