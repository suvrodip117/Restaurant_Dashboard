<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Request;
use App\Models\Orders;

class OrdersController extends Controller
{
    public function getTopThreeRestaurants(Request $request){
        //dd($request->all());
        $startDate=$request->startDate;
        $endDate=$request->endDate;
        
        $topThreeRestaurants = Orders::selectRaw( "restaurants.name, SUM(order_amount) as revenue")
            ->join('restaurants', 'orders.restaurant_id', '=', 'restaurants.id')
            ->whereBetween('order_time', [$startDate, $endDate])
            ->groupBy('restaurants.id')
            ->orderByRaw('revenue DESC')
            ->limit(3)
            ->get();
            //dd($topThreeRestaurants);  
        return $topThreeRestaurants; 
    }

    public function getDailyOrderDetails(Request $request){
        $restaurantID=$request->restaurantId;
        $startDate=$request->startDate;
        $endDate=$request->endDate;
        $response = Orders::selectRaw('DATE(order_time) as orderDate, 
                                                COUNT(*) as dailyOrdersCount, 
                                                SUM(order_amount) as dailyRevenue,
                                                SUM(order_amount)/COUNT(order_amount) as avgOrder')
            ->whereBetween('order_time', [$startDate, $endDate])
            ->where('restaurant_id', $restaurantID)
            ->groupBy(DB::raw('DATE(order_time)'))
            ->orderBy('order_time','asc')
            ->get();
        return $response;
    }

    public function getPeakOrderHourPerDay(Request $request){
        $restaurantID=$request->restaurantId;
        $startDate=$request->startDate;
        $endDate=$request->endDate;
        $response = Orders::selectRaw("DATE(order_time) as orderDate, SUM(order_amount) as dailyRevenue,strftime('%H',order_time) as hour")
            ->whereBetween('order_time', [$startDate, $endDate])
            ->where('restaurant_id', $restaurantID)
            ->groupBy(DB::raw('DATE(order_time)'),DB::raw("strftime('%H',order_time)"))
            ->orderBy('order_time','asc');
        $result = DB::query()
            ->fromSub($response, 't')
            ->selectRaw('orderDate, hour, MAX(dailyRevenue) as maxRevenue')
            ->groupBy('orderDate')
            ->get();
        return $result;
    }
}
