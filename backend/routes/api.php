<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'API\AuthController@register');

Route::post('login', 'API\AuthController@login')->name('login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    // API route for logout user
    Route::get('profile', 'API\AuthController@profile');
    Route::post('logout', 'API\AuthController@logout');
    Route::resource('roles', 'API\RoleController');
    Route::resource('users', 'API\UserController');
    Route::resource('doctor', 'API\DoctorsController');
    Route::resource('schedule', 'API\SchedulesController');
    Route::resource('users', 'API\DoctorsController');
    Route::resource('schedules', 'API\ScheduleController');
    Route::resource('categories','API\CategoryController');
    Route::resource('medicines','API\MedicineController');
    //Patient
    Route::resource('patient','API\PatientsController');
    Route::resource('patient-group','API\PatientGroupController');
    Route::get('patient-search', 'API\PatientsController@index');
    Route::resource('units','API\UnitController');
});