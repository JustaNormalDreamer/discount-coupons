<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'status',
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    public function coupons()
    {
        return $this->belongsTo(Coupon::class);
    }
}
