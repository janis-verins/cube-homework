<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class QuizQuestions
 */
class QuizQuestions extends Model
{
    use HasFactory;

    /**
     * Makes all properties on the model fillable
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'answers'
    ];

    /**
     * @param $currentAnswers
     * @return array
     */
    public function getAnswersAttribute($currentAnswers): array
    {
        return json_decode($currentAnswers);
    }

    /**
     * Get the associated quiz
     */
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }
}
