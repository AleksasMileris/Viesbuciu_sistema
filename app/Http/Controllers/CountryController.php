<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $emFilter=new \stdClass();
        $emFilter->name="";

        $filter=$request->session()->get("countries_filter",$emFilter);

        $emOrder=new \stdClass();
        $emOrder->field="";
        $emOrder->dir="";

        $order=$request->session()->get("countries_order",$emOrder);

        return Inertia::render('Countries/Index', [
            'countries'=>Country::filter($filter)->order($order)->with('hotels')->get(),
            'fil'=>$filter,
            'ord'=>$order
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Countries/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'=>'required|min:3',
                'season'=>'required|min:3',

            ],

        );
        $Country= new Country();
        $Country->create($request->all());

        return to_route('countries.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Country $country,Request $request)
    {
        $emFilter=new \stdClass();
        $emFilter->name="";

        $filter=$request->session()->get("hotel_filter",$emFilter);

        return Inertia::render('Countries/Show', [

            'country'=>Country::with('hotels')->where("id","like",$country->id)->first(),
            'hotelies'=>$filter->name!=""?$country->hotels()->where('name', 'like', "%$filter->name%")->get():null,

            'fil'=>$filter
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Country $country)
    {
        return inertia("Countries/Edit",[
                'country'=>$country,

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Country $country)
    {
        $country->fill($request->all());
        $country->save();
        return to_route('countries.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Country $country)
    {
        $country->delete();
        return to_route('countries.index');
    }

    public function filter(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("countries_filter",$filter);
        to_route('countries.index');
    }

    public function filterHotels(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("hotel_filter",$filter);
        to_route('countries.show',$request->country_id);
    }

    public function order($field,$dir,Request $request){
        $order=new \stdClass();
        $order->field=$field;
        $order->dir=$dir;
        $request->session()->put("countries_order",$order);

        to_route('countries.index');
    }
}
