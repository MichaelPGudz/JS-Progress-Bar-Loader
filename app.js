const progressBars = document.querySelectorAll('progress');
const buttonsAll = document.querySelectorAll('.button');
const textBtn = document.querySelector('.button-text');
const webpageBtn = document.querySelector('.button-webpage');
const musicBtn = document.querySelector('.button-music');
const programBtn = document.querySelector('.button-program');
const movieBtn = document.querySelector('.button-movie');
const speedInfo = document.querySelectorAll('.speed-info');
const int1GB = document.getElementById('prog-1GB');
const int500MB = document.getElementById('prog-500MB');
const int300MB = document.getElementById('prog-300MB');
const int150MB = document.getElementById('prog-150MB');

let isCompleted = false;

textData = [100, 100, 100, 100];
expectedTimeText = [0.01, 0.01, 0.01, 0.01];
webpageData = [1000, 100, 50, 20];
expectedTimeWebpage = [0.01, 0.02, 0.03, 0.06];
musicData = [15, 7, 3.9, 1.9];
expectedTimeMusic = [0.08, 0.16, 0.27, 0.54];
programData = [1.28, 0.63, 0.377, 0.1878];
expectedTimeProgram = [0.8, 1.6, 2.67, 5.34];
movieData = [0.1222, 0.06108, 0.03664, 0.018315 ];
expectedTimeMovie = [8.2, 16.39, 27.31, 54.62];

function frame(element, id, increment, timeStart, expectedTime) {
  element.nextElementSibling.textContent = `ok. ${expectedTime} sek.`
  const timeEnd = performance.now();
  const totalTime = (timeEnd-timeStart)/1000;
  if (element.value === element.max) {
    clearInterval(id);
    console.log(`${element.id} ${totalTime.toFixed(2)}`);
    isCompleted = false;
    element.nextElementSibling.classList.add('completed');
  } else {
    element.value += increment;
  }
}

function updateProgressBar(multiplier1, multiplier2, multiplier3, multiplier4, exp1, exp2, exp3, exp4) {
  if (!isCompleted) {
    isCompleted = true;
    for (const timeElement of speedInfo) {
      timeElement.classList.add('visible');
    }
    const timeStart = performance.now();
    let id1 = setInterval(() => frame(int1GB, id1, multiplier1, timeStart, exp1), 10);
    let id2 = setInterval(() => frame(int500MB, id2, multiplier2, timeStart, exp2), 10);
    let id3 = setInterval(() => frame(int300MB, id3, multiplier3, timeStart, exp3), 10);
    let id4 = setInterval(() => frame(int150MB, id4, multiplier4, timeStart, exp4), 10);
  }
}

function clearProgressBar() {
  for (const button of buttonsAll) {
    button.firstElementChild.classList.remove('active');
  }
  for (const barElement of progressBars) {
    barElement.value = 0;
    barElement.nextElementSibling.classList.remove('completed');
  }
}


const barProgressStart = (buttonType, multiplierCollection, expectedTimeData) => {
  clearProgressBar();
  buttonType.firstElementChild.classList.add('active');
  updateProgressBar(...multiplierCollection, ...expectedTimeData);
};

textBtn.addEventListener('click', barProgressStart.bind(null, textBtn, textData, expectedTimeText));
webpageBtn.addEventListener('click', barProgressStart.bind(null, webpageBtn, webpageData, expectedTimeWebpage));
musicBtn.addEventListener('click', barProgressStart.bind(null, musicBtn, musicData, expectedTimeMusic));
programBtn.addEventListener('click', barProgressStart.bind(null, programBtn, programData, expectedTimeProgram));
movieBtn.addEventListener('click', barProgressStart.bind(null, movieBtn, movieData, expectedTimeMovie));