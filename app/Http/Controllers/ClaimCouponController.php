<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponCodeRequest;
use App\Models\User;
use App\Models\Code;
use App\Models\Product;
use App\Models\Coupon;
use App\Models\CouponProductUser;
use Illuminate\Support\Facades\DB;

class ClaimCouponController extends Controller
{
    public function index(CouponCodeRequest $request, $user, $product)
    {
        // # initially a user, product id's are passed via a url get request
        // # then the user enters the voucher code in the input field using a post request
        // # the request so passed is validated inorder to find in the database and is made required
        $message = DB::transaction(function() use ($request, $product, $user) {
            //searching for the code and returning the fetched data in the variable
           $code = Code::where('code', $request->voucher_code)->first();

            //finding the coupon related to the code
            $coupon = Coupon::findOrFail($code->coupon_id);

            //find the product
            $chose_product = Product::findOrFail($product);

            if($code->status === false) {
                if($coupon->is_expired()) {
                    if ($coupon->is_greater_than($chose_product->rate)) {
                        //creating the user claimed instance in the database
                        CouponProductUser::create([
                            'user_id' => $user,
                            'product_id' => $product,
                            'code_id' => $code->id,
                        ]);

                        //changing the code status and updating the coupon status
                        $code->update([
                            'status' => true //here true means it is claimed
                        ]);

                        $coupon->update([
                            'used_codes' => $coupon->used_codes + 1
                        ]);

                        //calculating the amount
                        $discountAmt = ($chose_product->rate * $coupon->discount_rate)/100;
                        $newAmt = $chose_product->rate - $discountAmt;

                        return [
                            'message' => "The coupon has been claimed successfully.",
                            'discount_amount' => $discountAmt,
                            'new_amount' => $newAmt,
                            'status' => 200
                        ];
                    }
                    else {
                        return [
                            'message' => "The coupon should be applied to products greater than {$coupon->greater_than}.",
                            'status' => 406
                        ];
                    }
                } else {
                    return [
                        'message' => "The coupon has expired.",
                        'status' => 419
                    ];
                }
            } else {
                return [
                    'message' => "The coupon has been claimed.",
                    'status' => 409
                ];
            }
        });

        return response()->json([
            'data' => $message['message'],
            'discount_amount' => array_key_exists('discount_amount', $message) ? $message['discount_amount'] : '',
            'new_amount' => array_key_exists('new_amount', $message) ? $message['new_amount'] : '0',
        ], $message['status']);
    }
}
