<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use Database\Factories\BookFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Book::factory()->count(50)->create();
        // Author::factory()->count(50)->create();

        $books = Book::all();
        $categories = Category::all();

        //seeding pivot author_book
        Author::all()->each(function ($author) use ($books) {
            $author->books()->attach(
                $books->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

        //seeding pivot category_book
        $books->each(function ($book) use ($categories) {
            $book->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
