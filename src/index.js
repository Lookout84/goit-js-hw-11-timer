import css from "./css/styles.css";
import refs from "./js/refs.js";

class CountdownTimer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    const startTime = Date.now();

    this.intervalId = setInterval(() => {
      const currentTime = new Date("Jul 17, 2021");
      const deltaTime = currentTime - startTime;
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
  targetDate: new Date("Jul 17, 2021"),
  onTick: updateClockface,
});

console.log(timer.targetDate);

function updateClockface({ days, hours, mins, secs }) {
  refs.timerDays.textContent = `${days}`;
  refs.timerHours.textContent = `${hours}`;
  refs.timerMins.textContent = `${mins}`;
  refs.timerSecs.textContent = `${secs}`;
}
