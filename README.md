# countdowntimer
JQuery countdown timer

Basic usage:

    var timeobj = {
      seconds: 10,
      // minutes: 5,
      // hours: 1
     };

    var countdown = new DigitalTimer({
     selector: '#digital-timer',
     hours: timeobj.hours,
     minutes: timeobj.minutes,
     seconds: timeobj.seconds,
     /* showSeconds can be either true or false */
     showSeconds: false
    });
    
  
Advanced usage:

    var timeobj = {
     seconds: 10,
     // minutes: 5,
     // hours: 1
     };
  
     var countdown = new DigitalTimer({
      selector: '#digital-timer',
      hours: timeobj.hours,
      minutes: timeobj.minutes,
      seconds: timeobj.seconds,
      /* showSeconds can be either true or false */
      showSeconds: false,
      /* The callback defined below runs when the countdown timer has ended */
      callback: function() {
       var modal = jQuery("#time-limit-reached");
       // Find the modal's <div class="modal-body"> so we can populate it
       var modalBody = jQuery('#time-limit-reached .modal-body');

       modal.find('.dismiss').click(function() {
       modal.modal('hide');
     });

     //render away
     modal.modal();

     jQuery('#time-limit-reached').css({
      width : '35%', //probably not needed
      height : '35%', //probably not needed
      display : 'table', //important
      'overflow-y' : 'auto',
      'overflow-x' : 'auto',
      'top': '25%',
      'bottom': '25%',
      'margin': 'auto'
     });

     jQuery('.modal-title').html('Time Limit Reached');
    },
      /* This function runs every second. It is optional. */
    tickHandler: function() {
      /* When the number of hours remaining is 0, add a class so that the timer can be styled */
      /* This is optional and customizable */
      if (countdown.getTimerHoursRemaining() == 0) {
        jQuery('#digital-timer').addClass('no-hours');
      }
      // If the number of minutes remaining is 0 and the number of hours is also 0, add class 'no-minutes' for custom styling
      /* This is optional and customizable */
      if (countdown.getTimerMinutesRemaining() == 0 && countdown.getTimerHoursRemaining() == 0) {
        jQuery('#digital-timer').addClass('no-minutes');
      }
      /* If minutes remaining is less than 2 and number of hours remaining is 0, add class 'almost-done' for custom styling */
      /* This is optional and customizable */
      if (countdown.getTimerMinutesRemaining() <= 2 && countdown.getTimerHoursRemaining() == 0) {
        jQuery('.digital-timer').addClass('almost-done');
        /* Force seconds to show */
        countdown.timerSettings.showSeconds = true;
        countdown.refreshUI();
      }
    }
    });
