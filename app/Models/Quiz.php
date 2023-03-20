<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Services\NumbersApiService;

/**
 * Class Quiz
 */
class Quiz extends Model
{
    use HasFactory;

    public const ANSWERS_TO_WIN = 20;

    private NumbersApiService $numbersApiService;

    /**
     * @param array $attributes
     */
    public function __construct(
        array $attributes = []
    ) {
        parent::__construct($attributes);

        $this->numbersApiService = new NumbersApiService();
    }

    /**
     * Setting name of the table to avoid plural form
     *
     * @var string
     */
    protected $table = 'quiz';

    /**
     * Makes all properties on the model fillable
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Get all questions on this quiz
     */
    public function questions(): HasMany
    {
        return $this->hasMany(QuizQuestions::class);
    }

    /**
     * @return Model
     * @throws Exception
     */
    public function getQuestion(): Model
    {
        // Request a fact until we get one which does not exist in the current quiz
        do {
            $fact = $this->numbersApiService->getRandomFact();
        } while ($this->questions()->where('correct_answer', $fact['number'])->exists());

        $question = $fact['text'];
        $answer = $fact['number'];

        return $this->questions()->create([
            'question' => $question,
            'correct_answer' => $answer,
            'answers' => json_encode($this->getAnswers($answer))
        ]);
    }

    /**
     * @return Model|HasMany|null
     */
    public function getLastQuestion(): Model|HasMany|null
    {
        return $this->questions()->whereNull('answered')->first();
    }

    /**
     * @return string
     */
    public function getQuizResults(): string
    {
        $correctlyAnsweredQuestions = $this
            ->questions()
            ->whereColumn('correct_answer', '=', 'answered')
            ->count();

        return "{$correctlyAnsweredQuestions} / " . self::ANSWERS_TO_WIN;
    }

    /**
     * @param $correctAnswer
     * @return array
     */
    private function getAnswers($correctAnswer): array
    {
        $answers[] = $correctAnswer;
        for ($i = 0; $i < 3; $i++) {
            // Make the fake answers almost in the same range to not make the right answer obvious
            $answers[] = rand(1, (int) $correctAnswer + 100);
        }
        shuffle($answers);

        return $answers;
    }
}
