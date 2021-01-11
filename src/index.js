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
  targetDate: new Date("dec 31, 2021"),
  onTick: updateClockface,
});

function updateClockface({ days, hours, mins, secs }) {
  refs.timerDays.textContent = `${days}`;
  if (days <= 1) {
    refs.days.textContent = "Day";
  } else refs.days.textContent = "Days";
  refs.timerHours.textContent = `${hours}`;
  if (hours <= 1) {
    refs.hours.textContent = "Hour";
  } else refs.hours.textContent = "Hours";
  refs.timerMins.textContent = `${mins}`;
  if (mins <= 1) {
    refs.minutes.textContent = "Minute";
  } else refs.minutes.textContent = "Minutes";
  refs.timerSecs.textContent = `${secs}`;
  if (secs <= 1) {
    refs.seconds.textContent = "Second";
  } else refs.seconds.textContent = "Seconds";
}

timer.start();
