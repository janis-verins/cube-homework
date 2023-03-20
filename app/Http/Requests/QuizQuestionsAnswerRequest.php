<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class QuizQuestionsAnswerRequest
 */
class QuizQuestionsAnswerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'answer' => ['required']
        ];
    }
}
