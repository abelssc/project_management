<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $query=Project::query();
        //1. conbinando if y request
        // if(request('name')){
        //     $query->where('name','like','%'.request('name').'%'); 
        // }
        // if(request('status')){
        //     $query->where('status',request('status'));
        // }
        //2. Aplicando filtros condicionalmente con when
        $query->when(request('name'), function ($q, $name) {
            $q->where('name', 'like', '%' . $name . '%');
        });
    
        $query->when(request('status'), function ($q, $status) {
            $q->where('status', $status);
        });

        $query->when(request('sort_column'), function($q,$sort_column) {
            $q->orderBy($sort_column,request('sort_direction','asc'));
        });

        $queryParams=request()->query();
        $projects=ProjectResource::collection($query->paginate(4)->appends($queryParams));
        return Inertia::render('Project/Index',compact('projects','queryParams'));
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
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
