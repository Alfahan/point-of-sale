<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'cashier_id',
        'customer_id',
        'invoice',
        'cash',
        'change',
        'discount',
        'grand_total'
    ];
}
