<?php

namespace App\Http\Controllers;

use App\Events\CounterUpdated;
use App\Models\Counter;
use Illuminate\Http\JsonResponse;

class CounterController extends Controller
{
    public function increment(): JsonResponse
    {
        $count = Counter::incrementValue();

        CounterUpdated::dispatch($count);

        return response()->json(['count' => $count]);
    }

    public function decrement(): JsonResponse
    {
        $count = Counter::decrementValue();

        CounterUpdated::dispatch($count);

        return response()->json(['count' => $count]);
    }

    public function get(): JsonResponse
    {
        $count = Counter::getValue();

        return response()->json(['count' => $count]);
    }
}
