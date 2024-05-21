<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Validation\Validator;
use Illuminate\Http\Request;

class TaskApiController extends Controller
{



    public function store(TaskRequest $request)
    {
        $data = $request->validated();
        if ($data) {
            Task::create($data);
            return response()->json([
                'message' => 'Task created successfully',
            ], 201);
        }
    }

    public function show()
    {
        $tasks = Task::where('completed', false)->orderby('created_at', 'desc')->get();

        return response()->json([
            'tasks' => $tasks,
        ], 200);
    }

    public function update($id)
    {
        $task = Task::find($id);

        if ($task) {
            $task->completed = true;
            $task->save();
            return response()->json([
                'message' => 'Task marked as done',
            ], 200);
        }
        return response()->json([
            'error' => 'Failed to update task status',
        ], 422);
    }

    public function destroy($id)
    {

        $task = Task::find($id);
        $task->delete();
        return response()->json([
            'message' => 'Task deleted successfully',
        ], 200);
    }
}
