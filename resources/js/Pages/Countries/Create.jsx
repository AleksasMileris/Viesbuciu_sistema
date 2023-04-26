import AppLayout from "@/Layouts/AppLayout";

import {useState} from "react";
import {router, useForm} from "@inertiajs/react";

export default function Create(props){


    const {data,setData, errors, setError, clearErrors}=useForm({
        name:'',
        season:'',


    })
    const [isDirtyField, setDirtyField]=useState({
        name:false,
        season:false,


    })
    const validate=()=>{
        if(isDirtyField.name) {
            if (data.name.length >= 3) {
                clearErrors("name")
            } else {
                setError("name", "Vardas yra Privalomas laukas ir ne trumpesnis nei 3 simb")
            }
        }

            if(isDirtyField.season) {
                if (data.season.length >= 3) {
                    clearErrors("season")
                } else {
                    setError("season", "Miestas yra privalomas laukas ir ne trumpesnis nei 3 simb")
                }
            }
        }

    const handleBlur=(event)=>{
        isDirtyField[event.target.id]=true;
        setDirtyField({
            ...isDirtyField,
            [event.target.id]:true
        });
        validate()

    }



    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })

    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post(route("countries.store"),data);

    }

    return(
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Prideti šalį
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Pavadinimas</label>
                                <input className={"form-control "+(errors.name!=null?"is-invalid":"")} type="text" id="name" onChange={handleChange} onBlur={handleBlur} value={data.name}/>
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            </div>


                            <div className="mb-3">
                                <label className="form-label">Sezoniškumas</label>
                                <input className={"form-control "+(errors.season!=null?"is-invalid":"")} type="text" id="season" onChange={handleChange} onBlur={handleBlur} value={data.season}/>
                                <div className="invalid-feedback">
                                    {errors.season}
                                </div>
                            </div>





                            <button className="btn btn-success">Prideti</button>
                        </form>

                    </div>
                </div>
            </div>




        </AppLayout>
    )
}
