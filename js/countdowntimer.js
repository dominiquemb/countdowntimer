jQuery(document).ready(function() {
  window.DigitalTimer = function(settings) {
    this.timerSettings = settings;
    this.firstSecond = true;

    this.getTimeElapsed = function() {
        this.timerMinutesElapsed = Math.floor((((new Date().getTime() - new Date(this.pastTime.getTime())) % 86400000) % 3600000) / 60000);
        this.timerHoursElapsed = Math.floor(((new Date().getTime() - new Date(this.pastTime.getTime())) % 86400000) / 3600000);
        this.timerSecondsElapsed = Math.floor(((((new Date().getTime() - new Date(this.pastTime.getTime())) % 86400000) % 3600000) % 60000) / 1000);
        this.elapsedInterval = setTimeout(this.getTimeElapsed.bind(this), 1000);
    };

    this.getTimeRemaining = function() {
      if (!this.checkIfTimerDone()) {
        this.timerSecondsRemaining = Math.floor(((((new Date(this.futureTime.getTime()) - new Date().getTime()) % 86400000) % 3600000) % 60000) / 1000);
        this.timerMinutesRemaining = Math.floor((((new Date(this.futureTime.getTime()) - new Date().getTime()) % 86400000) % 3600000) / 60000);
        this.timerHoursRemaining = Math.floor(((new Date(this.futureTime.getTime()) - new Date().getTime()) % 86400000) / 3600000);

        this.timeRemainingInterval = setTimeout(this.getTimeRemaining.bind(this), 1000);
      }

      this.handleTimerUI();
    };

    this.handleTimerUI = function() {
      if (this.timerSettings.tickHandler && !this.firstSecond) {
        settings.tickHandler();
      }

      jQuery(this.timerSettings.selector + ' .hours-remaining').html(this.timerHoursRemaining);
      if (this.timerHoursRemaining == 1) {
        jQuery(this.timerSettings.selector + ' .hours-remaining-container .label').html(" hour");
      }
      else {
        jQuery(this.timerSettings.selector + ' .hours-remaining-container .label').html(" hours");
      }

      jQuery(this.timerSettings.selector + ' .minutes-remaining').html(this.timerMinutesRemaining);
      if (this.timerMinutesRemaining == 1) {
        jQuery(this.timerSettings.selector + ' .minutes-remaining-container .label').html(" minute");
      }
      else {
        jQuery(this.timerSettings.selector + ' .minutes-remaining-container .label').html(" minutes");
      }

      jQuery(this.timerSettings.selector + ' .seconds-remaining').html(this.timerSecondsRemaining);
      if (this.timerSecondsRemaining == 1) {
        jQuery(this.timerSettings.selector + ' .seconds-remaining-container .label').html(" second");
      }
      else {
        jQuery(this.timerSettings.selector + ' .seconds-remaining-container .label').html(" seconds");
      }

      // Solution for weird bug where seconds remaining is 0 at the very beginning of a countdown
      if (this.timerSecondsRemaining !== 0) {
        this.firstSecond = false;
      }
    };

    this.setTimer = function() {
      this.pastTime = new Date();
      this.getTimeElapsed();
    };

    this.setCountdown = function(obj) {
      this.curTime = new Date().getTime();
      this.futureTime = new Date();

      // Temporary values
      this.timerMinutesRemaining = 59;
      this.timerHoursRemaining = 99;
      this.timerSecondsRemaining = 59;

      if (this.timerSettings.hours) {
        this.timerSettings.hours = parseInt(this.timerSettings.hours);
        this.curHour = new Date().getHours();
        this.futureTime.setHours(this.curHour + this.timerSettings.hours);
        if (this.curTime >= this.futureTime.getTime()) {
          console.log('cannot set countdown to time in the past');
          return false;
        }
        this.futureHour = this.futureTime.getHours();
      }
      if (this.timerSettings.minutes) {
        this.timerSettings.minutes = parseInt(this.timerSettings.minutes);
        this.curMin = new Date().getMinutes();
        this.futureTime.setMinutes(this.curMin + this.timerSettings.minutes);
        if (this.curTime >= this.futureTime.getTime()) {
          console.log('cannot set countdown to time in the past');
          return false;
        }
        this.futureMin = this.futureTime.getMinutes();
      }
      if (this.timerSettings.seconds) {
        this.timerSettings.seconds = parseInt(this.timerSettings.seconds);
        this.curSec = new Date().getSeconds();
        this.futureTime.setSeconds(this.curSec + this.timerSettings.seconds);
        if (this.curTime >= this.futureTime.getTime()) {
          console.log('cannot set countdown to time in the past');
          return false;
        }
        this.futureSec = this.futureTime.getSeconds();
      }

      this.getTimeRemaining();
      this.refreshUI();
    };

    this.resetTimer = function() {
      clearTimeout(this.elapsedInterval);
    };

    this.resetCountdown = function() {
      clearTimeout(this.timeRemainingInterval);
    };

    this.getTimerMinutesElapsed = function() {
      return this.timerMinutesElapsed;
    };

    this.getTimerHoursElapsed = function() {
      return this.timerHoursElapsed;
    };

    this.getTimerSecondsElapsed = function() {
      return this.timerSecondsElapsed;
    };

    this.getTimerMinutesRemaining = function() {
      return this.timerMinutesRemaining;
    }

    this.getTimerHoursRemaining = function() {
      return this.timerHoursRemaining;
    }

    this.getTimerSecondsRemaining = function() {
      return this.timerSecondsRemaining;
    }

    this.handleTimerDone = function() {
      this.resetCountdown();
      this.resetTimer();
      if (this.timerSettings.callback) {
        try {
          this.timerSettings.callback();
        }
        catch (err) {
          console.log("Timer error: " + err);
        }
      };
    }

    this.checkIfTimerDone = function() {
      if (new Date().getTime() >= this.futureTime.getTime()) {
        this.handleTimerDone();
        return true;
      }
      return false;
    }

    this.countdownTimerStart = function() {
      this.resetCountdown();
      this.setCountdown(this.timerSettings);
    };

    this.refreshUI = function() {
      if (!this.timerSettings.seconds || !this.timerSettings.showSeconds) {
        jQuery(this.timerSettings.selector).addClass('no-seconds');
      }

      if (this.timerSettings.showSeconds) {
        jQuery(this.timerSettings.selector).removeClass('no-seconds');
      }

      if (!this.timerSettings.hours && !this.timerSettings.showHours) {
        jQuery(this.timerSettings.selector + ' .hours-remaining').hide();

        if (!this.timerSettings.minutes && !this.timerSettings.showMinutes) {
          jQuery(this.timerSettings.selector + ' .minutes-remaining').hide();

        }
      }
    };
  };
});


