<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'total_codes' => 'required|numeric|min:1',
            'expires_at' => 'required|date',
            'discount_rate' => 'required|numeric|between:1,100',
            'greater_than' => 'required|numeric',
        ];
    }
}
