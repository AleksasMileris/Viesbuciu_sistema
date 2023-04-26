<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountryHotel extends Model
{
    use HasFactory;

    public function users(){
        return $this->hasMany(User::class,'id','user_id');
    }

    public function hotels(){
        return $this->hasMany(Hotel::class,'id','hotel_id');
    }
}
