<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Category::create([
            'name' => 'Classic'
        ]);
        Category::create([
            'name' => 'Romantic'
        ]);
        Category::create([
            'name' => 'Horror'
        ]);
        Category::create([
            'name' => 'Religion'
        ]);
        Category::create([
            'name' => 'Fantasy'
        ]);
        Category::create([
            'name' => 'Historic'
        ]);
    }
}
