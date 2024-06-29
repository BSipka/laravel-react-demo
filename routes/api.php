<?php

use App\Http\Controllers\DailyListController;
use App\Http\Controllers\DailyTaskController;
use App\Http\Controllers\UserController;
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

    Route::post("/auth-check", function (Request $request) {
        return $request->user();
    });
    
    Route::get('/daily-lists', [DailyListController::class, 'index']);
    Route::get('/daily-list/{id}', [DailyListController::class, 'show']);
    Route::put('/daily-list/{id}', [DailyListController::class, 'update']);
    Route::post('/daily-list', [DailyListController::class, 'store']);
    Route::delete('/daily-list/{id}', [DailyListController::class, 'delete']);

    Route::get('/daily-task', [DailyTaskController::class, 'index']);
    Route::get('/daily-task/{id}', [DailyListController::class, 'show']);
    Route::post('/daily-task', [DailyTaskController::class, 'store']);
    Route::put('/daily-task/{id}', [DailyTaskController::class, 'update']);
    Route::delete('/daily-task/{id}', [DailyTaskController::class, 'delete']);

    Route::post("/destroy-token", [UserController::class, "destroyToken"]);
});
