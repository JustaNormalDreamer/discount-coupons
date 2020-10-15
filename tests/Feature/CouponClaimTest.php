<?php

namespace Tests\Feature;


use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;
use App\Models\User;
use App\Models\Code;
use App\Models\Coupon;

class CouponClaimTest extends TestCase
{
    use RefreshDatabase, DatabaseMigrations;

    /**
     * @test
     */
    public function test_it_is_able_to_claim_a_coupon()
    {
        $product = Product::factory()->create([
            'rate' => 1500
        ]);
        $coupons = Coupon::factory()->create([
            'greater_than' => 1000
        ])->each(function($coupon) {
            Code::factory()->create([
                'coupon_id' => $coupon->id,
                'code' => 'abcde12345'
            ]);
        });

        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson("/api/users/{$user->id}/{$product->id}", [
            'voucher_code' => 'abcde12345'
        ])->assertStatus(200)->assertJson([
            "data" => [
                "message" => "The coupon has been claimed successfully."
            ]
        ]);

        $this->assertDatabaseHas('coupon_product_user', [
            'id' => 1,
            'product_id' => 1,
            'user_id' => 1,
            'code_id' => 1
        ]);
    }

    /**
     * @test
     */
    public function test_it_increases_the_counter_of_used_codes_in_the_db()
    {
        $product = Product::factory()->create([
            'rate' => 1500
        ]);
        $coupons = Coupon::factory()->create([
            'greater_than' => 1000
        ])->each(function($coupon) {
            Code::factory()->create([
                'coupon_id' => $coupon->id,
                'code' => 'abcde12345'
            ]);
        });

        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson("/api/users/{$user->id}/{$product->id}", [
            'voucher_code' => 'abcde12345'
        ])->assertStatus(200)->assertJson([
            "data" => [
                "message" => "The coupon has been claimed successfully."
            ]
        ]);

        $this->assertDatabaseHas('coupon_product_user', [
            'id' => 1,
            'product_id' => 1,
            'user_id' => 1,
            'code_id' => 1
        ]);

        $this->assertDatabaseHas('coupons', [
            'id' => 1,
            'used_codes' => 1
        ]);
    }

    /**
     * @test
     */
    public function test_it_returns_coupon_expired_when_a_expired_coupon_is_claimed()
    {
        $product = Product::factory()->create([
            'rate' => 1500
        ]);
        $coupons = Coupon::factory()->create([
            'greater_than' => 1000,
            'expires_at' => now()->subDays(2),
        ])->each(function($coupon) {
            Code::factory()->create([
                'coupon_id' => $coupon->id,
                'code' => 'abcde12345'
            ]);
        });

        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson("/api/users/{$user->id}/{$product->id}", [
            'voucher_code' => 'abcde12345'
        ])->assertStatus(422)->assertJson([
                'errors' => [
                    'voucher_code' => ["The voucher code has expired."]
                ]
        ]);

        $this->assertDatabaseMissing('coupon_product_user', [
            'id' => 1,
            'product_id' => 1,
            'user_id' => 1,
            'code_id' => 1
        ]);
    }

    /**
     * @test
     */
    public function test_it_returns_coupon_has_been_claimed_when_trying_to_claim_a_claimed_coupon()
    {
        $product = Product::factory()->create([
            'rate' => 1500
        ]);

        $coupons = Coupon::factory()->create([
            'greater_than' => 1000,
            'expires_at' => now()->subDays(2),
        ])->each(function($coupon) {
            Code::factory()->create([
                'coupon_id' => $coupon->id,
                'code' => 'abcde12345',
                'status' => true
            ]);
        });

        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson("/api/users/{$user->id}/{$product->id}", [
            'voucher_code' => 'abcde12345'
        ])->assertStatus(422)->assertJson([
            'errors' => [
                'voucher_code' => ["The voucher code has been claimed."]
            ]
        ]);

        $this->assertDatabaseMissing('coupon_product_user', [
            'id' => 1,
            'product_id' => 1,
            'user_id' => 1,
            'code_id' => 1
        ]);
    }

    /**
     * @test
     */
    public function test_it_returns_product_should_be_greater_rate_when_trying_to_claim_a_coupon_at_lower_rate_products()
    {
        $product = Product::factory()->create([
            'rate' => 1500
        ]);

        $coupons = Coupon::factory()->create([
            'greater_than' => 2000,
        ])->each(function($coupon) {
            Code::factory()->create([
                'coupon_id' => $coupon->id,
                'code' => 'abcde12345',
                'status' => false
            ]);
        });

        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson("/api/users/{$user->id}/{$product->id}", [
            'voucher_code' => 'abcde12345'
        ])->assertStatus(422)->assertJson([
            'errors' => [
                'voucher_code' => ["The voucher code can only be applied to products having greater rate."]
            ]
        ]);

        $this->assertDatabaseMissing('coupon_product_user', [
            'id' => 1,
            'product_id' => 1,
            'user_id' => 1,
            'code_id' => 1
        ]);
    }
}
