const settings = document.querySelector(".settings");
const start = document.querySelector(".start");
const seconds = document.querySelector(".seconds>input[type='text']");
const minutes = document.querySelector(".minutes>input[type='text']");
const ring = document.querySelector(".ring");

const standart = document.querySelector(".standart");
const longBreak = document.querySelector(".long");
const shortBreak = document.querySelector(".short");

const popup = document.querySelector(".settings_popup");
const popupClose = document.querySelector(".popup_close");

const blocked = document.querySelector(".popup_blocked");

let startTime = 0;
let timer = null;
let running = false;
let originalMinutes = 0;
let originalSeconds = 0;
let totalSeconds;

start.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else if (running) {
        pauseTimer();
    }
})

settings.addEventListener('click', () => {
    if (running) {
        pauseTimer();
    }
    seconds.disabled = false;
    minutes.disabled = false;
    popup.style.display = 'block';
    blocked.style.display = "block";
})

popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
    blocked.style.display = "none";
})

// Режими
standart.addEventListener('click', () => {
    standartMode();
})

longBreak.addEventListener('click', () => {
    longBreakMode();
})

shortBreak.addEventListener('click', () => {
    shortBreakMode();
})
// Режими

const startTimer = () => {
    seconds.disabled = true;
    minutes.disabled = true;
    running = true; // Статус таймера - запущений
    start.innerText = 'pause';
    startTime = Date.now();
    // Отримання значень хвилин та секунд
    const secondsValue = parseInt(seconds.value);
    const minutesValue = parseInt(minutes.value);
    totalSeconds = secondsValue + minutesValue * 60;
    // Встановлення інтервалу для обрахунку часу
    timer = setInterval(() => {
        const currentTime = Date.now();
        const diff = currentTime - startTime;
        const secondsLeft = totalSeconds - Math.floor(diff / 1000);
        const minutesLeft = Math.floor(secondsLeft / 60);
        // Відображення часу на UI
        seconds.value = padNumber(secondsLeft % 60);
        minutes.value = padNumber(minutesLeft);
        if (secondsLeft === 0 && minutesLeft <= 0) {
            finishTimer();
        }
    }, 1000)
}
// Функція для додавання нулів до однозначних чисел
const padNumber = (num) => {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}
const finishTimer = () => {
    clearInterval(timer);
    setTimeout(() => {
        start.innerText = 'restart';
        if (start.innerText = 'restart') {
            setTimeout(() => {
                resetTimer();
            }, 1500)
        }

    }, 0)
}

const resetTimer = (min = "10", sec = "00") => {
    clearInterval(timer);
    seconds.value = sec;
    minutes.value = min;
    start.innerText = 'start';
    running = false;
}

const pauseTimer = () => {
    seconds.disabled = false;
    minutes.disabled = false;
    running = false;
    start.innerText = 'start';
    clearInterval(timer);
}

// Функція перемикання шрифтів
const font1 = document.getElementById("KumbhS");
const font2 = document.getElementById("RobotoS");
const font3 = document.getElementById("SpaceM");
font1.addEventListener('click', () => {
    font1.checked = true;
    font2.checked = false;
    font3.checked = false;
})
font2.addEventListener('click', () => {
    font2.checked = true;
    font1.checked = false;
    font3.checked = false;
})
font3.addEventListener('click', () => {
    font3.checked = true;
    font1.checked = false;
    font2.checked = false;
})
// Функція перемикання шрифтів


// Функція кольорів
const color1 = document.getElementById("redPink");
const color2 = document.getElementById("blue");
const color3 = document.getElementById("violet");
const btnActive = document.querySelector(".btnMode_active");
color1.addEventListener('click', () => {
    color1.checked = true;
    color2.checked = false;
    color3.checked = false;
})
color2.addEventListener('click', () => {
    color2.checked = true;
    color1.checked = false;
    color3.checked = false;
})
color3.addEventListener('click', () => {
    color3.checked = true;
    color1.checked = false;
    color2.checked = false;
})
// Функція кольорів

resetTimer();

const stp = document.getElementById("stp");
const sb = document.getElementById("sb");
const lb = document.getElementById("lb");
const allInputVal = document.querySelectorAll(".step_inner");

const timerSettings = {
    standart: stp.value,
    shortBreak: sb.value,
    longBreak: lb.value
};

allInputVal.forEach((numb) => {
    const inputVal = numb.querySelector(".step_input");
    const btnUp = numb.querySelector(".btnUp");
    const btnDown = numb.querySelector(".btnDown");

    btnUp.addEventListener("click", () => {
        inputVal.stepUp();
    });

    btnDown.addEventListener("click", () => {
        inputVal.stepDown();
    });
});

const applyButton = document.querySelector(".popup_apply");

applyButton.addEventListener("click", () => {
    timerSettings.standart = stp.value;
    timerSettings.shortBreak = sb.value;
    timerSettings.longBreak = lb.value;
    applyTimerSettings(timerSettings);;
});

function applyTimerSettings(timerSettings) {
    standartMode();
    if (font1.checked) {
        document.body.classList.add("fontKS");
        document.body.classList.remove("fontRS");
        document.body.classList.remove("fontSM");
        font1.checked = false;
    } else if (font2.checked) {
        document.body.classList.add("fontRS");
        document.body.classList.remove("fontKS");
        document.body.classList.remove("fontSM");
        font2.checked = false;
    } else if (font3.checked) {
        document.body.classList.add("fontSM");
        document.body.classList.remove("fontKS");
        document.body.classList.remove("fontRS");
        font3.checked = false;
    }
    if (color1.checked == true) {
        ring.classList.add(".redPink");
        ring.classList.remove("blue");
        ring.classList.remove("violet");
        start.classList.add("redPink");
        start.classList.remove("blue");
        start.classList.remove("violet");
        color2.checked = false;
        color3.checked = false;
        document.querySelectorAll(".btnMode").forEach(btn => {
            btn.classList.add("redPink");
            btn.classList.remove("blue", "violet");
            btn.addEventListener("click",(e)=>{
                btn.classList.add("redPink");
                btn.classList.remove("blue", "violet");

            })
        });
    } else if (color2.checked == true) {
        ring.classList.remove("redPink");
        ring.classList.add("blue");
        ring.classList.remove("violet");
        start.classList.remove("redPink");
        start.classList.add("blue");
        start.classList.remove("violet");
        color3.checked = false;
        color1.checked = false;

        document.querySelectorAll(".btnMode").forEach(btn => {
            btn.classList.add("blue");
            btn.classList.remove("violet", "redPink");
            btn.addEventListener("click",(e)=>{
                btn.classList.add("blue");
                btn.classList.remove("violet", "redPink");
            })
        });

    } else if (color3.checked == true) {
        ring.classList.remove("redPink");
        ring.classList.remove("blue");
        ring.classList.add("violet");
        start.classList.remove("redPink");
        start.classList.remove("blue");
        start.classList.add("violet");
        color1.checked = false;
        color2.checked = false;

        document.querySelectorAll(".btnMode").forEach(btn => {
            btn.classList.add("violet");
            btn.classList.remove("blue", "redPink");
            btn.addEventListener("click",(e)=>{
                btn.classList.add("violet");
                btn.classList.remove("blue", "redPink");
            })
        });
    }
    popup.style.display = 'none';
    blocked.style.display = "none";
}
// Функції включення режимів
const standartMode = (standartValue = timerSettings.standart, sec = "00") => {
    clearInterval(timer);
    seconds.value = sec;
    if (standartValue < 10) {
        minutes.value = '0' + standartValue;
    } else {
        minutes.value = standartValue;
    }
    start.innerText = 'start';
    standart.classList.add("btnMode_active");
    longBreak.classList.remove("btnMode_active");
    shortBreak.classList.remove("btnMode_active");
    running = false;
}

const shortBreakMode = (shortBreakValue = timerSettings.shortBreak, sec = "00") => {
    clearInterval(timer);
    seconds.value = sec;
    if (shortBreakValue < 10) {
        minutes.value = '0' + shortBreakValue;
    } else {
        minutes.value = shortBreakValue;
    }
    start.innerText = 'start';
    standart.classList.remove("btnMode_active");
    longBreak.classList.remove("btnMode_active");
    shortBreak.classList.add("btnMode_active");
    running = false;
}

const longBreakMode = (longBreakValue = timerSettings.longBreak, sec = "00") => {
    clearInterval(timer);
    seconds.value = sec;
    if (longBreakValue < 10) {
        minutes.value = '0' + longBreakValue;
    } else {
        minutes.value = longBreakValue;
    }
    start.innerText = 'start';
    standart.classList.remove("btnMode_active");
    longBreak.classList.add("btnMode_active");;
    shortBreak.classList.remove("btnMode_active");
    running = false;
}
// Функції включення режимів