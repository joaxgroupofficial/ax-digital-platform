<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class HeyzineService
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.heyzine.base_url');
        $this->apiKey  = config('services.heyzine.api_key');

        if (!$this->apiKey) {
            throw new \Exception('Heyzine API key is missing.');
        }
    }

    public function listFlipbooks(): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Accept'        => 'application/json',
        ])->get($this->baseUrl . '/flipbook-list');

        if ($response->failed()) {
            throw new \Exception('Heyzine API error: ' . $response->body());
        }

        return $response->json();
    }
}
