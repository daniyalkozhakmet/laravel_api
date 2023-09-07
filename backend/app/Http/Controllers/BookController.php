<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBook;
use App\Http\Requests\UpdateBook;
use App\Http\Resources\AuthorResource;
use App\Http\Resources\BookByAuthorResourse;
use App\Http\Resources\BookByCategoryResourse;
use App\Http\Resources\BookResource;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Traits\HttpResponses;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;

class BookController extends Controller
{
    //
    use HttpResponses;
    public function get_all_books()
    {
        $books = Book::paginate(10);
        return BookResource::collection($books);
    }
    public function search_books(Request $request)
    {

        $search = $request->only('search');
        $books = Book::where('name', 'like', '%' . $search['search'] . '%')->orWhere('description', 'like', '%' . $search['search'] . '%')->orWhere('description', 'like', '%' . $search['search'] . '%')
            ->paginate(10);
        // $books = Book::where(function (Builder $query, Request $request) {
        //     $search = $request->only('search');
        //     $query->select('name')
        //         ->from('categories')
        //         ->whereColumn('categories.name', $search['search']);
        // }, 'Pro')->get();
        return BookResource::collection($books);
    }
    public function get_all_authors()
    {
        $authors = Author::paginate(10);
        return AuthorResource::collection($authors);
    }

    public function get_book_by_id($id)
    {
        $book = Book::where('id', $id)->first();
        if (!$book) {
            return $this->error(null, 'Record not found', 404);
        }
        return new BookResource($book);
    }
    public function create_book(StoreBook $book)
    {
        $book_created = Book::create([
            'name' => $book->name,
            'description' => $book->description,
        ]);
        $book_created->authors()->attach($book->author_id);
        $book_created->categories()->attach($book->category_id);
        return new BookResource($book_created);
    }
    public function delete_book_by_id($id)
    {
        $book = Book::where('id', $id)->first();
        if (!$book) {
            return $this->error(null, 'Record not found', 404);
        }
        $book->delete();
        return $this->success(null, 'Successfully deleted');
    }
    public function update_book_by_id(UpdateBook $update_book, $id)
    {

        $book = Book::where('id', $id)->first();
        if (!$book) {
            return $this->error(null, 'Record not found', 404);
        }

        $book->update([
            'name' => $update_book->name,
            'description' => $update_book->name,
        ]);

        $book->categories()->detach();
        $book->authors()->detach();

        $book->authors()->attach($update_book->author_id);
        $book->categories()->attach($update_book->category_id);
        return new BookResource($book);
    }
    public function get_books_by_category($id)
    {
        $category = Category::where('id', $id)->first();
        if (!$category) {
            return $this->error(null, 'Record not found', 404);
        }
        // return $category->books[0]->authors;
        return new BookByCategoryResourse($category);
    }
    public function get_books_by_author($id)
    {
        $author = Author::where('id', $id)->first();
        if (!$author) {
            return $this->error(null, 'Record not found', 404);
        }
        // return $category->books[0]->authors;
        return new BookByAuthorResourse($author);
    }
}
