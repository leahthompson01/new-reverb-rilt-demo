<?php

use App\Http\Controllers\CounterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/counter', [CounterController::class, 'get'])->name('counter.get');
Route::post('/counter/increment', [CounterController::class, 'increment'])->name('counter.increment');
Route::post('/counter/decrement', [CounterController::class, 'decrement'])->name('counter.decrement');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
