import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import Alert from "bootstrap/js/src/alert";

export default function Index({country,auth,fil,hotelies}){

    // const {data,setData}=useForm({
    //     rating:'',
    //     restaurant_id:restaurant.id,
    //     dish_id:'',
    //
    //
    //
    // });


    // const handleSubmit=(event)=>{
    //
    //
    //
    //
    //     if (data.rating !=null){
    //         event.preventDefault();
    //         router.post(route("experiences.store"),data);
    //     }
    //
    // }


    const hotelsList=[];

    const handleDelete=(event)=>{
        router.delete(route("hotels.destroy",event.target.value));
    }

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })

    }


        // const rating=(id)=>{
        //         let score=0;
        //         let sum=0;
        //     experiences.forEach((exp)=>{
        //         if (exp.dish_id==id){
        //             score+=exp.rating;
        //             sum++;
        //         }
        //     })
        //
        //     let result=score/sum;
        //
        //     return <td className="text-center">{result}</td>;
        // }


    (hotelies!=null?hotelies:country.hotels).forEach((hotel)=>{



        hotelsList.push(

            <tr key={hotel.id}>

            <td>{hotel.name}</td>
            <td>{hotel.price}</td>

            <td>{hotel.photo && <img alt="foto" width="80px" src={"/storage/hotels/"+hotel.photo} />}</td>
                <td>{hotel.trip_time}</td>







            {auth.user != null && auth.user.type == 1?
                <td><Link className="btn btn-primary m-2" href={route('hotels.edit',hotel.id)}>Redaguoti</Link >

                    <button className="btn btn-danger" onClick={handleDelete} value={hotel.id}>Trinti</button > </td>
                :""

            }

            <td ><Link className='btn btn-info' href={route('hotels_country.store',[auth.user.id,hotel.id])}>Dalyvauti</Link ></td>








        </tr>)
    });



    const [order, setOrder]=useState({

        field:"price",
        dir:1
    });



    let hotels=hotelies!=null?hotelies:country.hotels

    hotels.sort(
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
    const [filter,setFilter]=useState({
        name:fil.name,
        country_id:country.id

    });

    const filterChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }

    const handleFilter=()=>{
      router.post(route("hotels.filter"),filter);
    }



    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Šalies: {country.name} viešbučiai
                    </div>
                    <div className="card-body">
                        {auth.user != null && auth.user.type == 1 ?
                            <Link className="btn btn-success float-end" href={route("hotels.create",country.id)}>Pridėti nauja viešbutį</Link>:""
                        }

                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <input type="text" id="name" className="form-control"  onChange={filterChange} value={filter.name}/>
                                </th>
                                <th><button className="btn btn-success" onClick={handleFilter}>Ieškoti</button></th>
                            </tr>
                            <tr>
                                <th>
                                   Pavadinimas



                                </th>
                                <th>
                                    <span onClick={ ()=>{setOrder({field:"price",dir:order.field=='price'&&order.dir==1?-1:1})}}>Kaina</span>
                                </th>

                                <th>Nuotrauka</th>
                                <th>Keliones Laikas</th>
                                {auth.user != null && auth.user.type == 1?
                                    <th  className="">Veiksmai</th>:""}
        <th></th>



                            </tr>
                            </thead>
                            <tbody>
                            {hotelsList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
