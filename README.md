# Restaurant_Dashboard
## Installation Guide

A. Install XAMPP and Composer from https://www.apachefriends.org/ and https://getcomposer.org/download/ respectively.
Or user can also install PHP and Composer only.

B. Install Nodejs

C. INSTALL LARAVEL:
1. go to the folder where you want to install backend.
2. Open VSCode terminal and paste the following command: "composer global require laravel/installer" to install laravel globally on your machine
3. If the above command doesnt work add php and composer installation directories to environment variables inside User Variables->Path
4. Restart vs code and rerun the above command provided in point 2

D. composer require fruitcake/laravel-cors  ----- handles cors

E. php artisan vendor:publish --provider="Fruitcake\Cors\CorsServiceProvider" ---- Handling cors

F. If seeds and tables are not there in database folder, run seed to migrate "restaurant" and "orders" json into sqlite table
using commands such as "php artisan migrate" and "php artisan db:seed".

H. Run the command "php artisan serve" inside directory "restaurant-app-backend" to start the backend server.

FRONTEND INSTALLATION:
H. Run "npm install axios bootstrap chart.js react-bootstrap react-chartjs-2 react-data-table-component react-dom" in VSCode terminal
to download the dependencies for the frontend.

I. Run "npm init -y"

J. Start frontend server using "npm run dev" in VSCode terminal. 
