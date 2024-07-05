<?php

use App\Http\Controllers\DailyListController;
use App\Http\Controllers\DailyTaskController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post("/register", [UserController::class, "register"]);

Route::post("/generate-token", [UserController::class, "generateToken"]);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get("/auth-check", function (Request $request) {
        return new UserResource($request->user());
    });

    Route::group(['prefix' => 'daily-lists'], function () {
        Route::get('/', [DailyListController::class, 'index']);
        Route::get('/{id}', [DailyListController::class, 'show']);
        Route::put('/{id}', [DailyListController::class, 'update']);
        Route::post('/', [DailyListController::class, 'store']);
        Route::delete('/{id}', [DailyListController::class, 'destroy']);

        Route::get('/tasks', [DailyTaskController::class, 'index']);
        Route::get('/tasks/{id}', [DailyTaskController::class, 'show']);
        Route::post('/tasks', [DailyTaskController::class, 'store']);
        Route::put('/tasks/{id}', [DailyTaskController::class, 'update']);
        Route::delete('/tasks/{id}', [DailyTaskController::class, 'delete']);
    });


    Route::post("/destroy-token", [UserController::class, "destroyToken"]);
});
