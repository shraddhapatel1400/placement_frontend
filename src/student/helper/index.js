import { API } from '../../backend';


export const signups = user => {
    
    return fetch(`${API}student/personal/`, {
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

export const signins = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}student/signin/`,{
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
        localStorage.setItem("student-jwt",JSON.stringify(data));
        next();
    }
}

export const isAuthenticatedS = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("student-jwt")) {
      return JSON.parse(localStorage.getItem("student-jwt"));
      //TODO: compare JWT with database json token
    } else {
      return false
    }
};

export const signouts = next => {
    const userId = isAuthenticatedS() && isAuthenticatedS().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("student-jwt")
        //next()

        return fetch(`${API}student/signout/${userId}`,{
            method: "GET"
        })
        .then(response => {
            console.log("Signout Success")
            next()
        })
        .catch(err => console.log(err))
    }
}

export const updateStudent = (userId,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}student/personal/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const createStudentSum = (user,studentId) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    formData.append("student",studentId)
    return fetch(`${API}student/job/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateStudentSum = (sId,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}student/job/${sId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const createStudentEdu = (user,studentId) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    formData.append("student",studentId)
    return fetch(`${API}student/education/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateStudentEdu = (sId,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}student/education/${sId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const deleteStudentEdu = (sId) => {

    return fetch(`${API}student/education/${sId}/`, {
        method: "DELETE"
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const createStudentSkill = (user,studentId) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    formData.append("student",studentId)
    return fetch(`${API}student/skills/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateStudentSkill = (sId,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}student/skills/${sId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const deleteStudentSkill = (sId) => {

    return fetch(`${API}student/skills/${sId}/`, {
        method: "DELETE"
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const createStudentProject = (user,studentId) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    formData.append("student",studentId)
    return fetch(`${API}student/projects/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateStudentProject = (sId,user) => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}student/projects/${sId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const deleteStudentProject = (sId) => {

    return fetch(`${API}student/projects/${sId}/`, {
        method: "DELETE"
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const editVacancy = (id,val) => {
    const formData = new FormData()
    formData.append("vacancy", val)
    
    return fetch(`${API}companyhr/companyJob/${id}/`,{
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const applyJob = user => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}companyhr/applyJob/`, {
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

    return fetch(`${API}student/personal/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const applyquiz = user => {
    
    return fetch(`${API}quiz/quizscore/`, {
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

export const sendMessage = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}student/sendsms/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const reset_password = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}student/resetpass/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}
