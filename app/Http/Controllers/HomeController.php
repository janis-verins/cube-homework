<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class HomeController
 */
class HomeController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $quiz = $this->getQuiz($request);
        $newGame = !$quiz;

        return Inertia::render('Home', [
            'new_game' => $newGame
        ]);
    }

    /**
     * @param $request
     * @return Quiz|null
     */
    private function getQuiz($request): ?Quiz
    {
        $playerId = $request->player_id;

        return Quiz::where('player_id', $playerId)->first();
    }
}
