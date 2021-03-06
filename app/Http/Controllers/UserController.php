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
           'data' => [
               'code' => $currentUser->coupons->map(function($coupon) {
                   return [
                       'id' => $coupon->id,
                       'product' => $coupon->products->name,
                       'code' => $coupon->codes->code
                   ];
               })
           ]
        ]);
    }
}
