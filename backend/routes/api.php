<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


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

// login and connexion
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/test', [AuthController::class, 'index'])->name('test');
Route::post('/logout', [AuthController::class, 'logout'])->name(('logout'));

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
