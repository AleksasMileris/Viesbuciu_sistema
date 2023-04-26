import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index({ auth,orders}){

    const ordersList=[];


    const handleDelete=(event)=>{
        router.delete(route("countries.destroy",event.target.value));
    }



    orders.forEach((order)=>{
        const handleSubmit=(event)=>{
            event.preventDefault();
            router.put(route('hotels_country.update',order.id),order);

        }

if (order.approved==0){
        ordersList.push(<tr key={order.id}>
            <td>{order.users[0].name}</td>
            <td>{order.hotels[0].name}</td>







            {auth.user != null && auth.user.type == 1?
                <td>
<form onSubmit={handleSubmit}>
                    <button className="btn btn-success">Patvirtinti</button >
                </form> </td>:<td></td>

            }

        </tr>)}
    });




    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }











    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Šalys
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>

                            <tr>
                                <th>
                                    Užsakovo Vardas


                                </th>
                                <th>
                                    Viešbutis

                                </th>


                                {auth.user != null && auth.user.type == 1?
                                    <th >Veiksmai</th>:""}

                            </tr>
                            </thead>
                            <tbody>
                            {ordersList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
