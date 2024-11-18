<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'description'=>$this->description,
            'image_path'=>$this->image_path,
            'status'=>$this->status,
            'priority'=>$this->priority,
            'due_date'=>$this->due_date->diffForHumans(),
            'assigned_user_id'=>$this->assignedUser,
            'createdBy'=> new UserResource($this->createdBy),
            'updatedBy'=> new UserResource($this->updatedBy),
            'project'=> new ProjectResource($this->project),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
