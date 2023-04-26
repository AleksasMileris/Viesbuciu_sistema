import AppLayout from "@/Layouts/AppLayout";

import {useState} from "react";
import {router, useForm} from "@inertiajs/react";

export default function Create(props){


    const {data,setData, errors, setError, clearErrors}=useForm({
        name:'',
        country_id:props.country_id,
        price:'',
        photo:'',
        trip_time:'',


    })
    const [isDirtyField, setDirtyField]=useState({
        name:false,
        price:false,

    })
    const validate=()=>{
        if(isDirtyField.name) {
            if (data.name.length >= 3) {
                clearErrors("name")
            } else {
                setError("name", "Vardas yra Privalomas laukas ir ne trumpesnis nei 3 simb")
            }
        }

            if(isDirtyField.price) {
                if (data.price.length >= 3) {
                    clearErrors("price")
                } else {
                    setError("price", "Kaina yra privalomas laukas ir ne trumpesnis nei 3 simb")
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
        router.post(route("hotels.store"),data);

    }

    return(
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Prideti Viesbutį
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
                                <label className="form-label">Kaina</label>
                                <input className={"form-control "+(errors.price!=null?"is-invalid":"")} type="text" id="price" onChange={handleChange} onBlur={handleBlur} value={data.price}/>
                                <div className="invalid-feedback">
                                    {errors.price}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Nuotrauka</label>
                                <input className="form-control" type="file" id="photo" onChange={(event)=>{
                                    setData({
                                        ...data,
                                        photo: event.target.files[0]
                                    })}
                                } />

                            </div>

                            <div className="mb-3">
                                <label className="form-label">Keliones trukmė</label>
                                <input className={"form-control "+(errors.trip_time!=null?"is-invalid":"")} type="text" id="trip_time" onChange={handleChange} onBlur={handleBlur} value={data.trip_time}/>
                                <div className="invalid-feedback">
                                    {errors.trip_time}
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
