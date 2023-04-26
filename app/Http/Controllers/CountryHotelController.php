<?php

namespace App\Http\Controllers;

use App\Models\CountryHotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryHotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('CountryHotels/Orders', [
            'orders'=>CountryHotel::with('users','hotels')->get(),
            'count'=>CountryHotel::all()->where('approved','like',0)->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            if($request->user_id !=null && $request->hotel_id != null){
        $old=CountryHotel::all()->where('hotel_id','like',$request->hotel_id)->where('user_id','like',$request->user_id)->first();
        if($old!=null){
        $old->delete();
        }
            }
        $listing= new CountryHotel();
        $listing->user_id=$request->user_id;
        $listing->hotel_id=$request->hotel_id;
        $listing->save();
        return to_route('countries.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(CountryHotel $countryHotel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CountryHotel $countryHotel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CountryHotel $countryHotel)
    {
        $aproval=CountryHotel::find($request->id);
        $aproval->approved=1;
        $aproval->save();
        return to_route('hotels_country.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order=CountryHotel::find($id);
        $order->delete();
        return to_route('countries.index');
    }

        public function myTrips($id){

            return Inertia::render('CountryHotels/myTrips', [
                'trips'=>CountryHotel::with('users','hotels')->where('user_id','like',$id)->get(),

            ]);
        }
}
