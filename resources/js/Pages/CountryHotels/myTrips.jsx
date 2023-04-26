import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index({ auth,trips}){

    const tripsList=[];


    const handleDelete=(event)=>{

        router.delete(route("hotels_country.destroy",event.target.value));
    }



    trips.forEach((trip)=>{



            tripsList.push(<tr key={trip.id}>
                <td>{trip.users[0].name}</td>
                <td>{trip.hotels[0].name}</td>
                <td>{ trip.approved != 0 ? 'Kelione patvirtinta':'Kelione nepatvirtinta'}</td>

                <td>
                <button className="btn btn-danger" onClick={handleDelete} value={trip.id}>Atšaukti Kelionę</button >
                 </td>

            </tr>)
    });



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
                                <th>Peržiūra</th>



                                    <th >Veiksmai</th>

                            </tr>
                            </thead>
                            <tbody>
                            {tripsList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
