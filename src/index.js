import css from "./css/styles.css";
import refs from "./js/refs.js";

class CountdownTimer {
  constructor({ timer }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = timer;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.timer(time);
  }

  const startTime = Date.now();
  this.isActive = true;

  this.intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - startTime;
    const time = this.getTimeComponents(deltaTime);

    this.onTick(time);
  }, 1000);

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}


new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Feb 14, 2021"),
});

const timer = new Timer({
  onTick: updateClockface,
});

function updateClockface({ days, hours, mins, secs }) {
  refs.timerDays.textContent = `${days}`;
}

console.log(timerDays)
