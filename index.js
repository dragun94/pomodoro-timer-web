let configuredMinutes = TimerSettings.load();
const timeDisplay = document.querySelector(".time");
const timerMessage = document.querySelector(".timer-message");

let remainingTime = configuredMinutes * 60 * 1000;
let endTime = null;
let intervalId = null;

function renderTime() {
  const totalSeconds = Math.ceil(remainingTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  timeDisplay.innerHTML = `${String(minutes).padStart(2, "0")}<span>:</span>${String(seconds).padStart(2, "0")}`;
  timeDisplay.setAttribute("aria-label", `${minutes}분 ${seconds}초`);
}

function clearTimer() {
  clearInterval(intervalId);
  intervalId = null;
  endTime = null;
}

function updateTimer() {
  // 콜백이 늦게 실행되어도 실제 경과 시간을 반영합니다.
  remainingTime = Math.max(0, endTime - Date.now());
  renderTime();

  if (remainingTime === 0) {
    clearTimer();
    timerMessage.textContent = "집중 완료! 잠시 쉬어 가세요.";
  }
}

function startTimer() {
  if (intervalId !== null || remainingTime === 0) return;

  endTime = Date.now() + remainingTime;
  intervalId = setInterval(updateTimer, 200);
  timerMessage.textContent = "좋아요, 지금은 집중하는 시간";
}

function stopTimer() {
  if (intervalId === null) return;

  updateTimer();
  clearTimer();
  if (remainingTime > 0) {
    timerMessage.textContent = "잠시 멈춤. 준비되면 다시 시작하세요.";
  }
}

function resetTimer() {
  clearTimer();
  remainingTime = configuredMinutes * 60 * 1000;
  renderTime();
  timerMessage.textContent = "지금, 나에게 집중할 시간";
}

document.getElementById("start-button").onclick = startTimer;
document.getElementById("stop-button").onclick = stopTimer;
document.getElementById("reset-button").onclick = resetTimer;

function syncSettings() {
  const savedMinutes = TimerSettings.load();
  if (savedMinutes !== configuredMinutes) {
    configuredMinutes = savedMinutes;
    resetTimer();
  }
  document.querySelector(".card-note").textContent = `${configuredMinutes}분의 몰입 뒤에는, 5분의 여유를.`;
}

window.addEventListener("storage", (event) => {
  if (event.key === TimerSettings.key || event.key === null) syncSettings();
});
window.addEventListener("pageshow", syncSettings);

syncSettings();
renderTime();
