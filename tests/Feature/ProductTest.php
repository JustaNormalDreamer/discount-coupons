<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase, DatabaseMigrations;

    /**
     * @test
     */
    public function it_returns_products_collection()
    {
        $products = Product::factory(2)->create();

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJson([
                'data' => [
                    [
                        'id' => 1,
                        'name' => $products[0]->name,
                        'rate' => $products[0]->rate,
                        'quantity' => $products[0]->quantity,
                        'created_at' => $products[0]->created_at->toJSON(),
                        'updated_at' => $products[0]->updated_at->toJSON(),
                    ],
                    [
                        'id' => 2,
                        'name' => $products[1]->name,
                        'rate' => $products[1]->rate,
                        'quantity' => $products[1]->quantity,
                        'created_at' => $products[1]->created_at->toJSON(),
                        'updated_at' => $products[1]->updated_at->toJSON(),
                    ]
                ]
        ]);
    }

    /**
     * @test
     */
    public function it_is_able_to_create_a_new_product()
    {
        $this->postJson('/api/products', $this->productData())->assertStatus(201);

        $this->assertDatabaseHas('products', [
           'id' => 1,
            'name' => 'First product',
            'quantity' => 15,
            'rate' => 1500
        ]);
    }

    /**
     * @test
     */
    public function it_is_able_to_able_to_update_a_new_product()
    {
        $product = Product::factory()->create();

        $this->patchJson('/api/products/1', $this->productData())->assertStatus(200);

        $this->assertDatabaseHas('products', [
            'id' => 1,
            'name' => 'First product',
            'quantity' => 15,
            'rate' => 1500
        ]);
    }

    /**
     * @test
     */
    public function it_is_able_to_delete_a_product()
    {
        $product = Product::factory()->create();

        $this->deleteJson('/api/products/1')->assertStatus(204);

        $this->assertDatabaseMissing('products', [
            'id' => 1,
            'name' => $product->name
        ]);
    }

    private function productData()
    {
        return [
          'name' => 'First product',
          'quantity' => 15,
          'rate' => 1500
        ];
    }
}
