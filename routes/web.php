<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


/*
Route::get('reset', function () {
    return Redirect::to("reset.html");
});

Route::get('reset2', function () {
    return Redirect::to("reset2.html");
})->name('reset.public');

Route::get('login',function(){
	return Redirect("login.html");
});

Route::get('verify', function(){
	return Redirect('changepassword.html');
})->name('verify');

Route::get('dashboard',function(){
	return Redirect('index.html');
})->name('dashboard');


Route::get('user/verify/{verification_code}', 'AuthController@verifyUser');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.request');
Route::post('password/reset', 'Auth\ResetPasswordController@postReset')->name('password.reset');
*/