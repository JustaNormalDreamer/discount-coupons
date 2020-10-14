<?php

namespace App\Http\Requests;

use App\Rules\CodeClaimedRule;
use App\Rules\CodeExpiredRule;
use App\Rules\CouponAmountRule;
use Illuminate\Foundation\Http\FormRequest;

class CouponCodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'voucher_code' => ['bail', 'required' , 'string', 'exists:codes,code', new CodeClaimedRule, new CodeExpiredRule, new CouponAmountRule(request()->product)]
        ];
    }
}
