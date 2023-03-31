<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    protected $table = 'documents';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'size',
        'contentType',
        'base64',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
