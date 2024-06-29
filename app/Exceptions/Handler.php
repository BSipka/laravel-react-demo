<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        [$message, $code] = match (true) {
            $e instanceof AuthenticationException => [['message' => "Not authenticated"], 401],
            $e instanceof NotFoundHttpException => [['message' => 'Not Found'], 404],
            $e instanceof ModelNotFoundException => [['message' => 'Resource Not Found'], 404],
            $e instanceof MethodNotAllowedHttpException => [['message' => 'Method not allowed'], 405],
            default => [['message' => $e->getMessage()], 500]
        };

        return response()->json($message, $code);
    }
}
