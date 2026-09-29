const settingsForm = document.getElementById("settings-form");
const minutesInput = document.getElementById("timer-minutes");
const saveButton = document.getElementById("save-button");
const saveMessage = document.getElementById("save-message");

function validateInput() {
  const valid = TimerSettings.isValid(minutesInput.value);
  saveButton.disabled = !valid;
  minutesInput.setAttribute("aria-invalid", String(!valid));
  saveMessage.textContent = valid ? "" : "1~60 사이의 정수를 입력해 주세요.";
  return valid;
}

minutesInput.value = TimerSettings.load();
minutesInput.oninput = validateInput;
settingsForm.onsubmit = (event) => {
  event.preventDefault();
  if (!validateInput()) return;

  try {
    TimerSettings.save(minutesInput.value);
  } catch {
    saveMessage.textContent = "설정을 저장하지 못했어요. 브라우저의 저장소 설정을 확인해 주세요.";
    return;
  }
  window.location.href = "index.html";
};

validateInput();
