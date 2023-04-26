<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'season',

    ];
    public function hotels(){
        return $this->hasMany(Hotel::class);
    }


    public function scopeFilter(Builder $query,$filter){
        if ($filter->name !=null){
            $query->where('name','like',"%$filter->name%");
        }
    }

    public function scopeOrder(Builder $query,$order){
        if ($order->field !=null){
            if ($order->dir !=null){
                $query->orderBy($order->field,$order->dir);
            }else{
                $order->orderBy($order->field);
            }

        }
    }
}
