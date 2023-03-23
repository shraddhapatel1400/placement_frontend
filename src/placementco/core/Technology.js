import React, { useState,useEffect } from 'react';
import { API } from '../../backend';
import ImageUploader from 'react-images-upload';
import { createTech, updateTech } from '../helper';

const Technology = () => {

    const [tech,setTech] = useState([]);

    const [val,setVal] = useState({
        name : "",
        description : "",
        image : [],
        eid : "",
        edit : false,
        error : "",
        loading : false
    });

    const [per,setper] = useState([]);

    const {name,description,image,error,loading,eid,edit} = val;
    
    const handleChange = (name) => (event) => {
        setVal({...val, [name] : event.target.value});
        setper({...per,[name]: event.target.value})
        console.log(event.target.value)
    }

    const handlePhoto = (name) => (event) => {
        setVal({...val, [name] : event[0]});
        setper({...per,[name]: event[0]})
        console.log(event[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setVal({...val,loading:true,error:false});
        createTech({name,description,image})
        .then((data)=>{
            console.log("DATA",data)
            if (data.id) {
                setVal({...val,loading:false,error:false,name:"",description:"",image:[]});
                window.location.reload();
            } else {
                setVal({...val,
                    error:[data.name,data.description,data.image],
                })
            }
        })
    }

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

    const handleEdit = (id) => (event) =>{
        event.preventDefault();
        setVal({...val,edit:!edit,eid:id})
    };

    const onEditSubmit = (event) => {
        event.preventDefault();
        setVal({...val,loading:true,error:false})
        updateTech(eid,per)
        .then((data)=>{
            console.log("DATA",data)
            if (data.id) {
                setVal({...val,loading:false,error:false,name:"",description:"",image:[]})
                window.location.reload();
            } else {
                setVal({...val,error:[data.name,data.description,data.image]})
            }
        })
    }

    const handleDelete = (id) => (event) =>{
        event.preventDefault();
        fetch(`${API}feedback/technology/${id}/`,{method: "DELETE"})
        .then((response) => {
            window.location.reload();
            return response.json();
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}feedback/technology/`,{method: "GET"});
            const data1 = await response1.json();
            setTech(data1);
        };
        fetchData();
    }, []);

  return (
    <div>
        <section class="section" id="features">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                        <div class="section-heading">
                            <h2>Studied <em>Technology</em></h2>
                            <img src="assets/images/line-dec.png" alt="waves" />
                            <p>"Once a new technology rolls over you, if you're not part of the steamroller, you're part of the road."</p>
                        </div>
                    </div>
                    {edit ? tech.filter(t=>t.id == eid).map((t,i)=>(
                    <div className="col-lg-6" key={i}>
                        <div class="text-center">
                            <h1 class="text-success mb-4" style={{fontFamily:"fantasy"}}>Edit Technology</h1>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-xl-10 col-lg-12 col-md-12">
                                <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="card-body p-0">
                                    <div class="row">
                                    <div class="col-lg-12">
                                        <div class="p-5">
                                        <form class="user">
                                            {LoadingMess()}
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-user" id="techname" 
                                                    placeholder="Technology Name" defaultValue={t.name} onChange={handleChange("name")}  />
                                                <span className="text-danger">{error[0]}</span>
                                            </div>
                                            <div class="form-group">
                                                <textarea id="desc" class="form-control form-control-user" defaultValue={t.description}
                                                    placeholder="Description" onChange={handleChange("description")}></textarea>
                                                <span className="text-danger">{error[1]}</span>
                                            </div>
                                            <div class="form-group">
                                                <ImageUploader
                                                    withPreview="true"
                                                    withIcon={false}
                                                    value={image}
                                                    onChange={handlePhoto("image")}
                                                    imgExtension={[".jpg", ".jpeg", ".png"]}
                                                    maxFileSize={5242880}
                                                    singleImage="true"
                                                    buttonText="Choose image"
                                                />
                                                <p className="text-info" style={{fontSize:"9pt"}}>Current: {t.image}</p>
                                                <span className="text-danger">{error[2]}</span>
                                            </div>
                                            <span className="text-danger"></span>
                                            <button class="btn btn-primary btn-user btn-block" onClick={onEditSubmit}>Save</button>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div> )) :
                    <div className="col-lg-6">
                        <div class="text-center">
                            <h1 class="text-success mb-4" style={{fontFamily:"fantasy"}}>Create New Technology</h1>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-xl-10 col-lg-12 col-md-12">
                                <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="card-body p-0">
                                    <div class="row">
                                    <div class="col-lg-12">
                                        <div class="p-5">
                                        <form class="user">
                                            {LoadingMess()}
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-user" id="techname" 
                                                    placeholder="Technology Name" value={name} onChange={handleChange("name")}  />
                                                <span className="text-danger">{error[0]}</span>
                                            </div>
                                            <div class="form-group">
                                                <textarea id="desc" class="form-control form-control-user" value={description}
                                                    placeholder="Description" onChange={handleChange("description")}></textarea>
                                                <span className="text-danger">{error[1]}</span>
                                            </div>
                                            <div class="form-group">
                                                <ImageUploader
                                                    withPreview="true"
                                                    withIcon={false}
                                                    value={image}
                                                    onChange={handlePhoto("image")}
                                                    imgExtension={[".jpg", ".jpeg", ".png"]}
                                                    maxFileSize={5242880}
                                                    singleImage="true"
                                                    buttonText="Choose image"
                                                />
                                                <span className="text-danger">{error[2]}</span>
                                            </div>
                                            <span className="text-danger"></span>
                                            <button class="btn btn-primary btn-user btn-block" onClick={handleSubmit}>Create Technology</button>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    }
                    <div className="col-lg-6">
                        <div class="mb-5">
                            <div class="text-center">
                                <h1 class="text-secondary mb-4" style={{fontFamily:"fantasy"}}>Recent Technology</h1>
                            </div><br />
                            {tech.map((t,i)=>(
                                <div class="row align-items-start job-item border-bottom pb-3 mb-3 pt-3" key={i}>
                                    <div className="col-md-2">
                                        <img src={t.image ? t.image : "assets/images/null.jpg"} alt="logo" className="img-fluid" />
                                    </div>
                                    <div class="col-md-7">
                                        <h4 className="text-info">{t.name}</h4>
                                        <p style={{textAlign:"justify"}}><em>{t.description}</em></p>
                                    </div>
                                    <div class="col-md-1">
                                        <button className="btn btn-info" onClick={handleEdit(t.id)}>Edit</button> 
                                    </div>&nbsp;&nbsp;&nbsp;
                                    <div class="col-md-1">
                                        <button className="btn btn-danger" onClick={handleDelete(t.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </section>
    </div>
  );
}

export default Technology;
