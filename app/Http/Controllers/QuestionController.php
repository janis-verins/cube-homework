<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuizQuestionsAnswerRequest;
use App\Http\Resources\QuizQuestionResource;
use App\Models\Quiz;
use App\Models\QuizQuestions;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class QuestionController
 */
class QuestionController extends Controller
{
    /**
     * @param Request $request
     * @return RedirectResponse|Response
     * @throws Exception
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $question = $this->getRequestSessionData($request, 'question');

        if ($question) {
            $quiz = $question->quiz()->first();
        } else {
            $quiz = $this->getQuiz($request);
            $lastQuestion = $quiz->getLastQuestion();

            try {
                $question = $lastQuestion ?? $quiz->getQuestion();
            } catch (Exception $e) {
                return redirect()->back()->with('error', $e->getMessage());
            }
        }

        $results = $this->getRequestSessionData($request, 'results');
        $playerId = $quiz->player_id;

        if ($results) {
            $quiz->delete();
        }

        return Inertia::render('Question', [
            'question' => new QuizQuestionResource($question),
            'player_id' => $playerId,
            'results' => $results,
            'correct_answer' => $this->getRequestSessionData($request, 'correct_answer')
        ]);
    }


    /**
     * @param QuizQuestionsAnswerRequest $request
     * @param QuizQuestions $current
     * @return RedirectResponse
     */
    public function update(QuizQuestionsAnswerRequest $request, QuizQuestions $current): RedirectResponse
    {
        $validated = $request->validated();
        $correctAnswer = $current->correct_answer;
        $answer = (string) $validated['answer'];
        $sessionRequestData = ['question' => $current];
        $quiz = $current->quiz()->first();

        if ($correctAnswer !== $answer) {
            $sessionRequestData['results'] = $quiz->getQuizResults();
            $sessionRequestData['correct_answer'] = $current->correct_answer;

            return redirect()->back()->with($sessionRequestData);
        }

        $current->update(['answered' => $answer]);

        $correctlyAnsweredQuestions = $quiz->questions()->whereNotNull('answered')->count();
        if ($correctlyAnsweredQuestions >= Quiz::ANSWERS_TO_WIN) {
            $sessionRequestData['results'] = $quiz->getQuizResults();
        }

        return redirect()->back()->with($sessionRequestData);
    }

    /**
     * @param $request
     * @return Quiz
     */
    private function getQuiz($request): Quiz
    {
        $playerId = $request->player_id;
        $quiz = Quiz::where('player_id', $playerId)->first();

        if (!$quiz) {
            return Quiz::create([
                'player_id' => Str::random(12)
            ]);
        }

        return $quiz;
    }

    /**
     * @param Request $request
     * @param string $key
     * @return mixed
     */
    private function getRequestSessionData(Request $request, string $key): mixed
    {
        return $request->session()->get($key);
    }
}
