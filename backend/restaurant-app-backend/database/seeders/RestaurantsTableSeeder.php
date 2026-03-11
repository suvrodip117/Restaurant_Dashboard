<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = file_get_contents(storage_path('app/restaurants.json'));
        
        $restaurants=json_decode($json, true);
        foreach ($restaurants as $restaurant) {
            Restaurant ::query()->updateOrCreate(['id'=>$restaurant['id'], 'name'=>$restaurant['name'], 'location'=>$restaurant['location'],'cuisine'=>$restaurant['cuisine'] ]); 
        }
    }
}
