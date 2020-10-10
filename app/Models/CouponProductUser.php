<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CouponProductUser extends Model
{
    use HasFactory;

    protected $table = "coupon_product_user";

    protected $fillable = [
        'user_id', 'product_id', 'code_id'
    ];

    public $timestamps = false;

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function products()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function codes()
    {
        return $this->belongsTo(Code::class, 'code_id');
    }
}
