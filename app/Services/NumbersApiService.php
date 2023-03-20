<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Class NumbersApiService
 */
class NumbersApiService
{
    private const BASE_URI = 'http://numbersapi.com/';

    private Client $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * @return mixed
     * @throws Exception
     */
    public function getRandomFact(): mixed
    {
        try {
            $response = $this->client->request('GET', self::BASE_URI . 'random', [
                'query' => [
                    'notfound' => 'floor',
                    'fragment' => true,
                    'json' => true,
                    'min' => 1,
                    'max' => mt_getrandmax()
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            $errorMessage = $e->getResponse() ? (string) $e->getResponse()->getBody() : $e->getMessage();

            throw new Exception($errorMessage);
        }
    }
}
