<?php

use App\Http\Controllers\OrdersController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/getallrestaurants', [RestaurantController::class,'getAllRestaurants']);
Route::get('/api/gettopthreerestaurants',[OrdersController::class,'getTopThreeRestaurants']);
Route::get('/api/getdailyorderdetails',[OrdersController::class,'getDailyOrderDetails']);
Route::get('/api/getpeakorderhours',[OrdersController::class,'getPeakOrderHourPerDay']);