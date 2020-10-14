<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Code;

class CodeClaimedRule implements Rule
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
        return ($code->status === false);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute has been claimed.';
    }
}
