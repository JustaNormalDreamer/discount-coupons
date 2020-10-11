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
        ])->assertStatus(201)->assertJson([
            "data" => "The coupon has been claimed successfully."
        ]);

        $this->assertDatabaseHas('coupon_product_user', [
            'id' => 1,
            'product_id' => 1,
            'user_id' => 1,
            'code_id' => 1
        ]);
    }
}
