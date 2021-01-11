import css from "./css/styles.css";
import refs from "./js/refs.js";

class CountdownTimer {
  constructor({ onTick, selector, targetDate }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    const endTime = this.targetDate;

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("jan 13, 2021"),
  onTick: updateClockface,
});

function updateClockface({ days, hours, mins, secs }) {
  refs.timerDays.textContent = `${days}`;
  if (days == 1) {
    refs.timerDays.nextElementSibling.textContent = "Day";
  } else refs.timerDays.nextElementSibling.textContent = "Days";
  refs.timerHours.textContent = `${hours}`;
  if (hours == 1) {
    refs.timerHours.nextElementSibling.textContent = "Hour";
  } else refs.timerHours.nextElementSibling.textContent = "Hours";
  refs.timerMins.textContent = `${mins}`;
  if (mins == 1) {
    refs.timerMins.nextElementSibling.textContent = "Minute";
  } else refs.timerMins.nextElementSibling.textContent = "Minutes";
  refs.timerSecs.textContent = `${secs}`;
  if (secs == 1) {
    refs.timerSecs.nextElementSibling.textContent = "Second";
  } else refs.timerSecs.nextElementSibling.textContent = "Seconds";
}

timer.start();
