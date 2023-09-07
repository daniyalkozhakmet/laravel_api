<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Route::middleware('adminRole')->get('/admin', function (Request $request) {
//     return 'Hello';
// });

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/admin', [AuthController::class, 'admin'])->middleware('restrictRole:ADMIN');
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/books', [BookController::class, 'get_all_books']);
    Route::get('/books/search', [BookController::class, 'search_books']);
    Route::get('/authors', [BookController::class, 'get_all_authors']);
    Route::post('/books/edit/{id}', [BookController::class, 'update_book_by_id'])->where('id', '[0-9]+')->middleware('restrictRole:ADMIN');
    Route::get('/books/{id}', [BookController::class, 'get_book_by_id'])->where('id', '[0-9]+');
    Route::post('/books', [BookController::class, 'create_book'])->middleware('restrictRole:ADMIN');
    Route::delete('/books/{id}', [BookController::class, 'delete_book_by_id'])->where('id', '[0-9]+')->middleware('restrictRole:ADMIN');
    Route::get('/books/category/{id}', [BookController::class, 'get_books_by_category'])->where('id', '[0-9]+');
    Route::get('/books/author/{id}', [BookController::class, 'get_books_by_author'])->where('id', '[0-9]+');
});
