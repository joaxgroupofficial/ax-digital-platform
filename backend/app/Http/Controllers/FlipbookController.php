<?php

namespace App\Http\Controllers;

use App\Services\HeyzineService;

class FlipbookController extends Controller
{
    protected HeyzineService $heyzine;

    public function __construct(HeyzineService $heyzine)
    {
        $this->heyzine = $heyzine;
    }

    public function index()
    {
        $data = $this->heyzine->listFlipbooks();

        return response()->json([
            'success' => true,
            'source' => 'heyzine',
            'count' => count($data),
            'data' => $data,
        ]);
    }
}
