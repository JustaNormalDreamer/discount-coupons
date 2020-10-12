<?php

namespace App\Http\Controllers;

use App\Http\Resources\CouponResourceCollection;
use App\Models\Coupon;
use App\Models\Code;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Http\Requests\CouponRequest;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $coupons = Coupon::with('codes')->latest()->paginate(10);

        return new CouponResourceCollection($coupons);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CouponRequest $request)
    {
        DB::transaction(function() use ($request) {
            //create a coupon with title and more at first
            $coupon = Coupon::create([
                'name' => $request->name,
                'expires_at' => $request->expires_at,
                'discount_rate' => $request->discount_rate,
                'greater_than' => $request->greater_than,
                'generated_codes' => $request->total_codes,
            ]);

            //create an empty array
            $arr_of_codes = [];
            //push the total number of codes to be generated to the above array
            for($i=0; $i<$request->total_codes; $i++):
                array_push($arr_of_codes, [
                    'coupon_id' => $coupon->id,
                    'code' => $this->generateCode(),
                    'status' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            endfor;

            //inserting the codes in the database, it requires timestamps
            Code::insert($arr_of_codes);
        });

        return response()->json([
            'status' => 'ok'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function show($coupon)
    {
        return $this->codeExists($coupon);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function edit(Coupon $coupon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Coupon $coupon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Coupon  $coupon
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function destroy(Coupon $coupon)
    {
        //deleting both codes and the coupon
        DB::transaction(function() use ($coupon) {
            $coupon->delete();
            $coupon->codes()->delete();
        });

        return response(null, 204);
    }

    /**
     * @return string
     */
    private function generateCode()
    {
        $unique = true;
        do {
            $code = Str::random(10);
            $unique = $this->codeExists($code);
        } while ($unique === true);

        return $code;
    }

    /**
     * @param string $code
     * @return bool
     */
    private function codeExists(string $code) :bool
    {
        return Code::where('code', $code)->count() > 0;
    }
}
