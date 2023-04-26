import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index({ auth, countries,fil,ord}){

    const countriesList=[];


    const handleDelete=(event)=>{
        router.delete(route("countries.destroy",event.target.value));
    }
    countries.forEach((country)=>{


        countriesList.push(<tr key={country.id}>
            <td>{country.name}</td>
            <td>{country.season}</td>

            <td><Link className={"btn btn-info m-2"} href={route('countries.show',country.id)}>Viešbučiai</Link></td>





            {auth.user != null && auth.user.type == 1?
                <td><Link className="btn btn-primary m-2" href={route('countries.edit',country.id)}>Redaguoti</Link >

                <button className="btn btn-danger" onClick={handleDelete} value={country.id}>Trinti</button > </td>
                :<td></td>

            }

        </tr>)
    });


    const [filter,setFilter]=useState({
        name:fil.name,


    });

    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }
    const handleFilter=()=>{
        router.post(route("countries.filter"),filter);
    }



    const [order, setOrder]=useState({
        field:"name",
        dir:1
    });





    countries.sort(
        (a, b)=>{
            if(a[order.field]>b[order.field]){
                return 1* order.dir;
            }

            if(a[order.field]<b[order.field]){
                return -1*order.dir;
            }
            return 0
        }
    );
    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Šalys
                    </div>
                    <div className="card-body">
                        {auth.user != null && auth.user.type == 1 ?
                            <Link className="btn btn-success float-end" href={route("countries.create")}>Pridėti nauja šalį</Link>:""
                        }

                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <input type="text" id="name" className="form-control"  onChange={handleChange} value={filter.name}/>
                                </th>
                                <th><button className="btn btn-success" onClick={handleFilter}>Ieškoti</button></th>
                            </tr>
                            <tr>
                                <th>
                                    <Link href={route("countries.order",['name',ord.field=='name'&&ord.dir=="ASC"?"DESC":"ASC"])}>Šalis</Link>


                                </th>
                                <th>
                                    <Link href={route("countries.order",['name',ord.field=='name'&&ord.dir=="ASC"?"DESC":"ASC"])}>Sezoniškumas</Link>

                                </th>


                                {auth.user != null && auth.user.type == 1?
                                <th colSpan="2" className="text-center">Veiksmai</th>:""}

                            </tr>
                            </thead>
                            <tbody>
                            {countriesList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
