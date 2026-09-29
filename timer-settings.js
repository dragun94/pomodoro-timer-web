const TimerSettings = {
  key: "pomodoro.timerMinutes",
  isValid(value) {
    const minutes = Number(value);
    return String(value).trim() !== "" && Number.isInteger(minutes) && minutes >= 1 && minutes <= 60;
  },
  load() {
    try {
      const value = localStorage.getItem(this.key);
      return this.isValid(value) ? Number(value) : 25;
    } catch {
      return 25;
    }
  },
  save(value) {
    if (!this.isValid(value)) throw new Error("Invalid timer duration");
    localStorage.setItem(this.key, String(Number(value)));
  },
};
