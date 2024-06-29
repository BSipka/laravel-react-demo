Finished tasks:
@foreach ($notifiable->dailyLists as $list)
@foreach($list->tasks as $task)
@if ($task->status != 1)
Task in progress
@else
{{$task->title}}
@endif

@endforeach
@endforeach