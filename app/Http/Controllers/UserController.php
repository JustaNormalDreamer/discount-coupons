<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index($user)
    {
        //get the user id via a get request i.e. from the url parameter
        $currentUser = User::findOrFail($user);

        return response()->json([
           'data' =>  $currentUser->coupons->map(function($coupon) {
                   return [
                       'id' => $coupon->id,
                       'product' => [
                           'name' => $coupon->products->name,
                           'rate' => $coupon->products->rate,
                           'discount_amt' => ($coupon->codes->coupons->discount_rate * $coupon->products->rate) / 100,
                       ],
                       'code' => $coupon->codes->code,
                   ];
               })
            ]);
    }
}
