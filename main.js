window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audioPlayer");
  const playBtn = document.querySelector(".play-button");
  const progressBar = document.querySelector(".playbaract");
  const progressContainer = document.querySelector(".playbar2");

  const currentTimeText = document.querySelector(".div26"); // ⭐️ 현재 시간 (좌측)
  const totalTimeText = document.querySelector(".div27"); // ⭐️ 전체 시간 (우측)
  const playBtnDot = document.querySelector(".playbtn");
  const playIcon = playBtn.querySelector("img");

  let isPlaying = false;

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;

    // ✅ 버튼 위치 이동
    if (playBtnDot) {
      const containerWidth = progressContainer.offsetWidth;
      const newLeft = (containerWidth * percent) / 100;

      playBtnDot.style.left = `${newLeft - 6}px`; // 버튼 크기 반영 (12px → 절반 빼기)
    }
  });

  playBtn.addEventListener("click", () => {
    if (!audio) return;

    if (isPlaying) {
      if (playIcon) playIcon.src = "public/images/play-btn-2.svg";
      audio.pause();
    } else {
      audio.play();
      if (playIcon) playIcon.src = "public/images/Playing.svg";
    }

    isPlaying = !isPlaying;
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;

    // ⭐️ 시간 표시 갱신
    if (currentTimeText)
      currentTimeText.textContent = formatTime(audio.currentTime);
    if (totalTimeText) totalTimeText.textContent = formatTime(audio.duration);
  });

  progressContainer.addEventListener("click", (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clickX / width;
    const newTime = audio.duration * percent;
    audio.currentTime = newTime;
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }
});
