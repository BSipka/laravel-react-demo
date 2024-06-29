<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class DailyReminderEmail extends MailMessage
{
    use Queueable, SerializesModels;

    public $notifiable;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($notifiable)
    {
        $this->notifiable = $notifiable;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('daily-email')->with(['notifiable' => $this->notifiable]);
    }
}
