<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBook extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules()
    {
        return  $this->store();
    }
    protected function store()
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'category_id' => ['required', 'digits_between:1,1000'],
            'author_id' => ['required', 'digits:1,1000'],

        ];
    }

    protected function update()
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'category_id' => ['required', 'digits_between:1,1000'],
            'author_id' => ['required', 'digits:1,1000'],
        ];
    }
}
