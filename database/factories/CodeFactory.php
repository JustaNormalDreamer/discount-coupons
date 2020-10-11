<?php

namespace Database\Factories;

use App\Models\Code;
use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CodeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Code::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $coupons = collect(Coupon::all()->modelKeys());

        return [
            'coupon_id' => $this->faker->randomElement($coupons),
            'code' => Str::random(10),
            'status' => $this->faker->boolean(false),
        ];
    }
}
