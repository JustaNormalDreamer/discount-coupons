<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
       return [
        'id' => $this->id,
        'name' => $this->name,
        'total_codes' => $this->generated_codes,
        'used_codes' => $this->used_codes,
        'discount_rate' => $this->discount_rate,
        'greater_than' => $this->greater_than,
        'expires_at' => $this->expires_at,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
        'codes' => $this->codes->map(function($code) {
            return [
                'id' => $code->id,
                'code' => $code->code,
                'status' => $code->status,
                'created_at' => $code->created_at,
                'updated_at' => $code->updated_at,
            ];
        })
    ];
    }
}
