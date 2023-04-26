<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {


        return inertia("Hotels/Create",[
            'country_id'=>$id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'=>'required|min:3',
                'price'=>'required|min:3',

            ]);
        $hotel= new Hotel();
        $hotel->name=$request->name;
        $hotel->country_id=$request->country_id;
        $hotel->price=$request->price;
        $hotel->trip_time=$request->trip_time;

        if ($request->file("photo")!=null){
            $request->file("photo")->store("/public/hotels");
            $hotel->photo=$request->file("photo")->hashName();
        }

        $hotel->save();

        return to_route('countries.show',$request->country_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hotel $hotel)
    {
        return inertia("Hotels/Edit",[
                'hotel'=>$hotel,

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hotel $hotel)
    {
        $hotel->name=$request->name;
        $hotel->country_id=$request->country_id;
        $hotel->price=$request->price;
        $hotel->trip_time=$request->trip_time;
        if ($request->file("photo")!=null){
            if ($hotel->photo!=null){
                unlink(storage_path()."/app/public/hotels/".$hotel->photo);
            }
            $request->file("photo")->store("/public/hotels");
            $hotel->photo=$request->file("photo")->hashName();
        }
        $hotel->save();

        return to_route('countries.show',$request->country_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        $hotel->delete();
        return redirect()->back();
    }
}
