<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query=Task::query();

        $query->when(request('project_name'), function ($q,$project_name) {
            $q->whereHas('project',function($query) use ($project_name){
                $query->where('name','like','%'. $project_name . '%');
            });
        });

        $query->when(request('name'), function ($q, $name) {
            $q->where('name', 'like', '%' . $name . '%');
        });
        
        $query->when(request('description'), function ($q, $description) {
            $q->where('description', 'like', '%' . $description . '%');
        });
    
        $query->when(request('status'), function ($q, $status) {
            $q->where('status', $status);
        });

        $query->when(request('priority'), function ($q, $priority) {
            $q->where('priority', $priority);
        });

        $query->when(request('created_from'), function($q,$created_from){
            $q->where('created_at','>=',$created_from);
        });

        $query->when(request('created_until'), function($q,$created_until){
            $q->where('created_at','<=',$created_until);
        });

        $query->when(request('sort_column'), function($q,$sort_column) {
            $q->orderBy($sort_column,request('sort_direction','asc'));
        });

        $queryParams=request()->query();
        $tasks=TaskResource::collection($query->paginate(10)->appends($queryParams));
        //query params can be [] when the page is loaded for the first time
        $queryParams= (object) $queryParams;
        return Inertia::render('Task/Index',compact('tasks','queryParams'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
