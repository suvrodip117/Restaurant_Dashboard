<?php

namespace Database\Seeders;

use App\Models\Orders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json=file_get_contents(storage_path("app/orders.json"));
        $orders=json_decode($json, true);
        foreach ($orders as $order) {
            Orders ::query()->updateOrCreate(['id'=>$order['id'], 'restaurant_id'=>$order['restaurant_id'], 'order_amount'=>$order['order_amount'],'order_time'=>$order['order_time'] ]); 

        }
    }
}
