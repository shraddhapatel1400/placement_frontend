import { API } from '../../backend';

export const signinp = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}placementco/signin/`,{
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
        localStorage.setItem("placement-jwt",JSON.stringify(data));
        next();
    }
}

export const isAuthenticatedP = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("placement-jwt")) {
      return JSON.parse(localStorage.getItem("placement-jwt"));
      //TODO: compare JWT with database json token
    } else {
      return false
    }
};

export const signoutp = next => {
    const userId = isAuthenticatedP() && isAuthenticatedP().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("placement-jwt")
        return fetch(`${API}placementco/signout/${userId}`,{
            method: "GET"
        })
        .then(response => {
            console.log("Signout Success")
            next()
        })
        .catch(err => console.log(err))
    }

}

export const resetPass = (userId,val) => {
    const formData = new FormData()

    formData.append("password", val)

    return fetch(`${API}placementco/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updatePlacement = (userId,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}placementco/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateStudent = (userId,val) => {
    const formData = new FormData()
    
    formData.append("status", val);

    return fetch(`${API}student/personal/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateCompany = (userId,val) => {
    const formData = new FormData()
    
    formData.append("status", val);

    return fetch(`${API}companyhr/company/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const deleteStudent = sid => {
    return fetch(`${API}student/personal/${sid}`, {method: "DELETE"})
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const deleteCompany = cid => {
    return fetch(`${API}companyhr/company/${cid}`, {method: "DELETE"})
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const invite_mail = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}companyhr/invitemail/`,{
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const createTech = user => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}feedback/technology/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateTech = (userId,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}feedback/technology/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const sendMess = user => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}placementco/sendmess/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}
