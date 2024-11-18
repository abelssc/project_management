<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $casts=[
        'create_at'=>'datetime',
        'updated_at'=>'datetime',
        'due_date'=>'datetime'
    ];

    public function project(): BelongsTo{
        return $this->belongsTo(Project::class);
    }

    public function assignedUser(): BelongsTo{
        return $this->BelongsTo(User::class,'assigned_user_id','id');
    }

    public function createdBy(): BelongsTo 
    {
        return $this->belongsTo(User::class,'created_by','id');
    }
    public function updatedBy(): BelongsTo 
    {
        return $this->belongsTo(User::class,'updated_by','id');
    }
}
