<?php

namespace App\Http\Controllers;

use App\Models\DailyList;
use App\Models\DailyTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class DailyTaskController extends Controller
{

    public function index(Request $request)
    {
        $dailyList = DailyList::with('tasks')->where("user_id", $request->user()->id)->get();
        $response = [
            "daily_list" => $dailyList
        ];

        return response($response, 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dailyList = DailyList::with('tasks')->findOrFail($request->daily_list_id);
        if ($request->user()->cannot('store', $dailyList)) {
            return response(["message" => "Not allowed"], 403);
        }

        foreach ($request->tasks as $task) {
            $dailyList->tasks()->create(
                [
                    'daily_list_id' => $dailyList->id,
                    'title' => $task['title'],
                    'description' => $task['description'],
                    'deadline' => Date::now(),
                    'status' => 0
                ]
            );
        }
        $response = [
            "daily_list" => $dailyList
        ];

        return response($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $id)
    {
        $dailyTask = DailyTask::with("taskList")->findOrFail($id);
        if ($request->user()->cannot('show', $dailyTask->taskList)) {
            return response(["message" => "Not allowed"], 403);
        }
        return response($dailyTask, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $dailyTask = DailyTask::with("taskList")->findOrFail($id);

        if ($request->user()->cannot('update', $dailyTask->taskList)) {
            return response(["message" => "Not allowed"], 403);
        }
        $dailyTask->update($request->except('_token'));

        return response(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, int $id)
    {
        $dailyTask = DailyTask::with("taskList")->findOrFail($id);

        if ($request->user()->cannot('delete', $dailyTask->taskList)) {
            return response(["message" => "Not allowed"], 403);
        }

        $dailyTask->delete();
        return response(200);
    }
}
