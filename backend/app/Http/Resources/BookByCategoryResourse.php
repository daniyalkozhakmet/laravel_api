<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookByCategoryResourse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $per_page = 5;
        $books = $this->books()->paginate($per_page);
        $total_page = ceil($this->books()->count() / $per_page);
        if ($request->page && $request->page > $total_page) {
            $books = $this->books()->paginate($per_page, ['*'], 'page', $total_page);
        }
        return [
            'id' => (string)$this->id,
            'name' => $this->name,
            'books' => BookWithoutCategoryResourse::collection($books),
            'links' => [
                'current_page' => $books->currentPage(),
                'per_page' => $books->perPage(),
                'total_page' => $total_page,
                // 'total_record' => $this->books()->count(),
                'options' => $books->getUrlRange(1, $total_page),
            ]
        ];
    }
}
