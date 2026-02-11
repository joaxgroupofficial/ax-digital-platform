<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\FlipbookController;

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $plainToken = Str::random(60);

    DB::table('api_tokens')->insert([
        'user_id'     => $user->id,
        'token_hash'  => hash('sha256', $plainToken),
        'name'        => 'login',
        'expires_at'  => now()->addDays(7),
        'created_at'  => now(),
        'updated_at'  => now(),
    ]);

    return response()->json([
        'user' => [
            'id'    => $user->id,
            'email' => $user->email,
            'role'  => $user->role,
        ],
        'token' => $plainToken,
    ])->withCookie(
        cookie(
            'api_token',
            $plainToken,
            60 * 24 * 7,
            '/',
            null,
            false,
            true
        )
    );
});

Route::middleware('api.token')->group(function () {

    Route::get('/me', function (Request $request) {
        return response()->json([
            'user' => $request->get('auth_user'),
        ]);
    });

    Route::post('/logout', function (Request $request) {

        $plainToken = null;

        $authHeader = $request->header('Authorization');
        if ($authHeader && str_starts_with($authHeader, 'Bearer ')) {
            $plainToken = substr($authHeader, 7);
        }

        if (!$plainToken) {
            $plainToken = $request->cookie('api_token');
        }

        if ($plainToken) {
            DB::table('api_tokens')
                ->where('token_hash', hash('sha256', $plainToken))
                ->delete();
        }

        return response()->json([
            'message' => 'Logged out'
        ])->withCookie(
            cookie()->forget('api_token')
        );
    });
});

    Route::get('/flipbooks', [FlipbookController::class, 'index']);
