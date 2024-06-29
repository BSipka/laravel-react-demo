<?php

namespace App\Policies;

use App\Models\DailyList;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DailyListPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function show(User $user, DailyList $dailyList)
    {
        return $user->id === $dailyList->user_id;
    }

    public function edit(User $user, DailyList $dailyList)
    {
        return $user->id === $dailyList->user_id;
    }

    public function delete(User $user, DailyList $dailyList)
    {
        return $user->id === $dailyList->user_id;
    }

    public function update(User $user, DailyList $dailyList)
    {
        return $user->id === $dailyList->user_id;
    }

    public function store(User $user, DailyList $dailyList)
    {
        return $user->id === $dailyList->user_id;
    }
}
