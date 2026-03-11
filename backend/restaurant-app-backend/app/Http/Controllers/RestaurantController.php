<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    //get all restaurants
    public function getAllRestaurants(){
        return response()->json(Restaurant::all());
    }
}
