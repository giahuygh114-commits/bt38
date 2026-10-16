(function(){
  var GAME_TIME = 30;      // tổng thời gian (giây)
  var MOVE_EVERY = 1000;   // mục tiêu tự đổi vị trí sau 1 giây (ms)

  var arena = document.getElementById('arena');
  var target = document.getElementById('target');
  var overlay = document.getElementById('overlay');
  var scoreEl = document.getElementById('score');
  var timeEl = document.getElementById('time');
  var finalEl = document.getElementById('finalScore');
  var startBtn = document.getElementById('startBtn');

  var score = 0, timeLeft = GAME_TIME, playing = false;
  var countdownId = null, moveId = null;

  // Đặt mục tiêu tại top/left ngẫu nhiên, luôn nằm trọn trong #arena
  function moveTarget(){
    var maxLeft = arena.clientWidth - target.offsetWidth;
    var maxTop = arena.clientHeight - target.offsetHeight;
    target.style.left = Math.floor(Math.random() * (maxLeft + 1)) + 'px';
    target.style.top = Math.floor(Math.random() * (maxTop + 1)) + 'px';
  }

  // Đặt lại bộ đếm 1 giây cho mục tiêu
  function restartMoveTimer(){
    clearInterval(moveId);
    moveId = setInterval(moveTarget, MOVE_EVERY);
  }

  function startGame(){
    score = 0; timeLeft = GAME_TIME; playing = true;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    overlay.style.display = 'none';
    startBtn.disabled = true;
    target.style.display = 'block';
    moveTarget();
    restartMoveTimer();

    countdownId = setInterval(function(){
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  function endGame(){
    playing = false;
    clearInterval(countdownId);
    clearInterval(moveId);
    target.style.display = 'none';          // khóa thao tác: ẩn mục tiêu
    finalEl.textContent = score;
    overlay.style.display = 'flex';          // hiển thị tổng điểm
    startBtn.disabled = false;
    startBtn.textContent = 'Chơi lại';
  }

  // Click trúng mục tiêu: +1 điểm, đổi vị trí ngay, tính lại 1 giây
  target.addEventListener('click', function(e){
    e.stopPropagation();
    if (!playing) return;                    // khóa khi hết giờ
    score++;
    scoreEl.textContent = score;
    moveTarget();
    restartMoveTimer();
  });

  startBtn.addEventListener('click', function(){ if (!playing) startGame(); });
})();
