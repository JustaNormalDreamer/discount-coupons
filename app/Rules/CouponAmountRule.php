<?php

namespace App\Rules;

use App\Models\Code;
use App\Models\Product;
use Illuminate\Contracts\Validation\Rule;

class CouponAmountRule implements Rule
{
    private $product;

    /**
     * Create a new rule instance.
     *
     * @param Product $product
     */
    public function __construct($product)
    {
        $this->product = Product::findOrFail($product);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $code = Code::where('code', $value)->first();
        return ($this->product->rate > $code->coupons->greater_than);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "The :attribute can only be applied to products having greater rate.";
    }
}
