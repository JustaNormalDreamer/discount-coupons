<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'discount_rate', 'expires_at', 'greater_than', 'generated_codes', 'used_codes'
    ];

     protected $casts = [
         'expires_at' => 'datetime',
         'used_codes' => 'integer'
     ];

    public function codes()
    {
        return $this->hasMany(Code::class);
    }

    public function is_valid(bool $codeStatus) :bool
    {
        //if the status is false and the expires_at column is greater than current time
        // return true i.e. valid else invalid or expired
        return $codeStatus === false && $this->expires_at > now();
    }

    public function is_expired() :bool
    {
        return $this->expires_at > now();
    }

    public function is_greater_than($product_rate) :bool
    {
        return $product_rate >= $this->greater_than;
    }
}
