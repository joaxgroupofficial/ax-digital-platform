<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class ApiTokenAuth
{
    public function handle(Request $request, Closure $next): Response
{
    $plainToken = null;

    $authHeader = $request->header('Authorization');
    if ($authHeader && str_starts_with($authHeader, 'Bearer ')) {
        $plainToken = substr($authHeader, 7);
    }

    if (!$plainToken) {
        $plainToken = $request->cookie('api_token');
    }

    if (!$plainToken) {
        return response()->json(['message' => 'Missing token'], 401);
    }

    $tokenHash = hash('sha256', $plainToken);

    $token = DB::table('api_tokens')
        ->where('token_hash', $tokenHash)
        ->where(function ($q) {
            $q->whereNull('expires_at')
              ->orWhere('expires_at', '>', now());
        })
        ->first();

    if (!$token) {
        return response()->json(['message' => 'Invalid token'], 401);
    }

    $user = User::find($token->user_id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 401);
    }

    $request->attributes->set('auth_user', $user);

    return $next($request);
}

}
