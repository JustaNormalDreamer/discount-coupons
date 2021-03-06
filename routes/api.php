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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('coupons', 'CouponController@index')->name('coupons.index');

Route::post('coupons', 'CouponController@store')->name('coupons.store');

Route::get('coupons/{coupon}', 'CouponController@show')->name('coupons.show');

Route::get('users/{user}', 'UserController@index')->name('users.index');

Route::post('users/{user}/{product}', 'ClaimCouponController@index')->name('coupon.claim');
