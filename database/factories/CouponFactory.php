<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CouponFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Coupon::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(),
            'discount_rate' => rand(1, 100),
            'greater_than' => rand(500, 1500),
            'generated_codes' => 1,
            'used_codes' => 0,
            'expires_at' => now()->addDays(15),
        ];
    }
}
