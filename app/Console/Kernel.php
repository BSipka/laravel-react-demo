<?php

namespace App\Console;

use App\Jobs\DailyReminderJob;
use App\Models\User;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $users = User::with('dailyLists')->get();
        foreach ($users as $user) {
            if (collect($user->dailyLists())->count() > 0) {
                $schedule->job(new DailyReminderJob($user))->everyMinute();
            }
        }
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
