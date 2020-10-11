<?php

namespace Tests\Feature;

use App\Models\Code;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Coupon;


class CouponTest extends TestCase
{
    use RefreshDatabase, DatabaseMigrations;

    /*
     * @test
     */
    public function test_it_returns_all_the_list_of_coupons()
    {
        $coupons = Coupon::factory(2)->create();
       Code::factory()->create([
            'coupon_id' => 1,
            'code' => 'abcde12345',
            'status' => false
        ]);

        $this->get('/api/coupons', [
            'Accept' => 'application/json',
        ])->assertOk()
        ->assertJson([
            'data' => [
                [
                    'id' => 1,
                    'name' => $coupons[0]->name,
                    'total_codes' => $coupons[0]->generated_codes,
                    'used_codes' => $coupons[0]->used_codes,
                    'discount_rate' => $coupons[0]->discount_rate,
                    'greater_than' => $coupons[0]->greater_than,
                    'expires_at' => $coupons[0]->expires_at->toJSON(),
                    'created_at' => $coupons[0]->created_at->toJSON(),
                    'updated_at' => $coupons[0]->updated_at->toJSON(),
                    'codes' => [
                        [
                            'id' => 1,
                            'code' => 'abcde12345',
                            'status' => false
                        ]
                    ]
                ],
                [
                    'id' => 2,
                    'name' => $coupons[1]->name,
                    'total_codes' => $coupons[1]->generated_codes,
                    'used_codes' => $coupons[1]->used_codes,
                    'discount_rate' => $coupons[1]->discount_rate,
                    'greater_than' => $coupons[1]->greater_than,
                    'expires_at' => $coupons[1]->expires_at->toJSON(),
                    'created_at' => $coupons[1]->created_at->toJSON(),
                    'updated_at' => $coupons[1]->updated_at->toJSON(),
                ],
            ]
        ]);
    }

    /**
     * @test
     */
    public function test_it_can_create_a_coupon_with_desired_number_of_codes()
    {
       $this->postJson('/api/coupons', $this->coupon_data())->assertStatus(201);

        //checking in the database
        $this->assertDatabaseHas('coupons', [
            'id' => 1,
            'name' => 'Dashain Offer',
            'expires_at' => now()->addDays(5),
            'discount_rate' => '15',
            'greater_than' => '1500',
            'generated_codes' => '2',
        ]);

        //checking the codes in the db
        $this->assertDatabaseHas('codes', [
                [
                    ['id' => 1], ['id' => 2]
                ]
        ]);
    }

    /**
     * @test
     */
    public function test_it_validates_whether_the_required_fields_are_given()
    {
        $this->postJson('/api/coupons', [])->assertStatus(422)
        ->assertJson([
            'errors' => [
                'name' => ["The name field is required."],
                'total_codes' => ["The total codes field is required."],
                'expires_at' => ["The expires at field is required."],
                'discount_rate' => ["The discount rate field is required."],
                'greater_than' => ["The greater than field is required."]
            ]
        ]);
    }

    /**
     * @test
     */
    public function test_it_validates_whether_the_total_codes_is_numeric()
    {
        $this->postJson('/api/coupons', array_merge($this->coupon_data(), ['total_codes' => 'abc']))->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'total_codes' => ["The total codes must be a number."],
                ]
            ]);
    }

    /**
     * @test
     */
    public function test_it_validates_whether_the_greater_than_is_numeric()
    {
        $this->postJson('/api/coupons', array_merge($this->coupon_data(), ['greater_than' => 'abc']))->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'greater_than' => ["The greater than must be a number."],
                ]
            ]);
    }

    /**
     * @test
     */
    public function test_it_validates_whether_the_discount_rate_is_numeric()
    {
        $this->postJson('/api/coupons', array_merge($this->coupon_data(), ['discount_rate' => 'abc']))->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'discount_rate' => ["The discount rate must be a number."],
                ]
            ]);
    }

    /**
     * @test
     */
    public function test_it_validates_whether_the_discount_is_between_1_to_100()
    {
        $this->postJson('/api/coupons', array_merge($this->coupon_data(), ['discount_rate' => '0']))->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'discount_rate' => ["The discount rate must be between 1 and 100."],
                ]
            ]);
    }

    /**
     * @test
     */
    public function test_it_validates_whether_the_total_codes_is_greater_than_one()
    {
        $this->postJson('/api/coupons', array_merge($this->coupon_data(), ['total_codes' => '0']))->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'total_codes' => ["The total codes must be at least 1."],
                ]
            ]);
    }

    private function coupon_data()
    {
        return [
            'name' => 'Dashain Offer',
            'expires_at' => now()->addDays(5),
            'discount_rate' => '15',
            'greater_than' => '1500',
            'total_codes' => '2',
        ];
    }
}
