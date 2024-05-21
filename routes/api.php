<?php

use App\Http\Controllers\Api\TaskApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(TaskApiController::class)->group(function () {
    Route::post('/save-task',  'store');
    Route::get('/task-list', 'show');
    Route::put('/mark-as-done/{id}', 'update');
    Route::delete('/delete-task/{id}', 'destroy');
});
