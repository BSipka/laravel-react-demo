<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskListRequest;
use App\Models\DailyList;
use Illuminate\Http\Request;
use Illuminate\Redis\RedisManager;

class DailyListController extends Controller
{

    public function __construct(private RedisManager $redis)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $dailyLists = $this->redis->get('daily_list_' . $request->user()->id);
        if (isset($dailyLists)) {
            $data = json_decode($dailyLists);
            return response($data, 200);
        }

        $dailyLists = DailyList::where('user_id', $request->user()->id)->get();

        $this->redis->set('all_users', $dailyLists, 'EX', 60);

        return response($dailyLists, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskListRequest $request)
    {
        $dailyList = DailyList::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description
        ]);
        $result = [
            'daily_list' => $dailyList
        ];
        return response($result, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $id)
    {
        $dailyList = DailyList::with('tasks')->findOrFail($id);

        if ($request->user()->cannot('show', $dailyList)) {
            return response(["message" => "Not allowed"], 403);
        }
        return response($dailyList, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $dailyList = DailyList::findOrFail($id);
        if ($request->user()->cannot('update', $dailyList)) {
            return response(403);
        }
        $dailyList->update($request->except(['_token']));

        return response($dailyList, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, int $id)
    {
        $dailyList = DailyList::findOrFail($id);

        if ($request->user()->cannot('delete', $dailyList)) {
            return response(["message" => "Not allowed"], 403);
        }

        $dailyList->delete();
        return response(200);
    }
}
