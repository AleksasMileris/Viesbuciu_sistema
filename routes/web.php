<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\CountryHotelController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return to_route('countries.index');
});

Route::get('/dashboard', function () {
    return to_route('countries.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/countries/filter',[CountryController::class,"filter"])->name("countries.filter");
Route::post('/hotels/filter',[CountryController::class,"filterHotels"])->name("hotels.filter");

Route::get('/countries/order/{field}/{dir}',[CountryController::class,"order"])->name("countries.order");


Route::resource('countries', CountryController::class);

Route::resource('hotels', HotelController::class);

Route::get('hotels/create/{id}', [HotelController::class,'create'])->name('hotels.create');
Route::resource('hotels_country', CountryHotelController::class);
Route::get('hotels_country/store/{user_id}/{hotel_id}',[CountryHotelController::class,'store'])->name('hotels_country.store');
Route::get('hotel_country/myTrips/{user_id}',[CountryHotelController::class,'myTrips'])->name('country_hotel.myTrips');


require __DIR__.'/auth.php';
