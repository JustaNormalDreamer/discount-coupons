<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'discount_rate', 'expires_at', 'greater_than'
    ];

     protected $casts = [
         'expires_at' => 'datetime',
     ];

    public function codes()
    {
        return $this->hasMany(Code::class);
    }

    public function is_valid() :bool
    {
        return $this->status === false && $this->expires_at > now();
    }
}
