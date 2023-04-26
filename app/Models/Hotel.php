<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    public function chotels(){
        return $this->belongsTo(CountryHotel::class);
    }
    public function country(){
        return $this->belongsTo(Country::class);
    }
}
