<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$allowed_role): Response
    {
        $user = $request->user();
        $roles = $user->roles;
        $roles_arr = array();
        foreach ($roles as $obj) {
            array_push($roles_arr, $obj->name);
        }
        if (!$user || !in_array((string) $allowed_role[0], $roles_arr)) {
            abort(403, 'Access denied');
        }

        return $next($request);
    }
}
