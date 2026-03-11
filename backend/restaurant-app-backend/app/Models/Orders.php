<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Orders extends Model
{
    public $timestamps = false;
    use HasFactory;
    protected $table = "orders";
    protected $fillable = ['id','restaurant_id','order_amount','order_time' ];
}
