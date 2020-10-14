<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Code;

class CodeExpiredRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        return ($code->coupons->expires_at > now());
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute has expired.';
    }
}
