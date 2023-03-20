<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\HigherOrderCollectionProxy;

/**
 * Class QuizQuestionCollection
 */
class QuizQuestionCollection extends ResourceCollection
{
    /**
     * {@inheritdoc}
     */
    public function toArray($request): array|HigherOrderCollectionProxy|\JsonSerializable|Arrayable
    {
        return $this->collection->map->only('question', 'answers', 'correct_answer', 'answered');
    }
}
