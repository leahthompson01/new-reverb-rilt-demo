<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Counter extends Model
{
    protected $fillable = ['value'];

    public static function getValue(): int
    {
        return static::firstOrCreate(['id' => 1], ['value' => 0])->value;
    }

    public static function incrementValue(): int
    {
        $counter = static::firstOrCreate(['id' => 1], ['value' => 0]);
        $counter->increment('value');

        return $counter->fresh()->value;
    }

    public static function decrementValue(): int
    {
        $counter = static::firstOrCreate(['id' => 1], ['value' => 0]);
        $counter->decrement('value');

        return $counter->fresh()->value;
    }
}
