/*global $*/

//ボタンの活性・非活性を制御
$(document).ready(function() {
  //STARTを押したときの外部挙動
  $('#start').mousedown(function() {
    $(this).prop('disabled', true);
    $('#stop').prop('disabled', false);
    $('#reset').prop('disabled', false);
  });
  
  //STOPを押したときの外部挙動
  $('#stop').mousedown(function() {
    $('#start').prop('disabled', false);
    $(this).prop('disabled', true);
  });
  
  //RESETを押したとき外部の挙動
  $('#reset').mousedown(function() {
    $('#start').prop('disabled', false);
    $('#stop').prop('disabled', true);
    $(this).prop('disabled', true);
  });
});

//timerの変数定義
const timer = document.getElementById('timer');

//各ボタンの変数定義
const start  = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

//経過時間を、現在時間からstartを押したときの時刻を減算して算出する変数
let elapsedTime = 0;

//setIntervalを扱うための変数
let intervalId;

//elapsedTimeを各単位に変換
const updateTime = () => {
  //ミリ秒の先頭2文字を算出
  const ms = Math.floor((elapsedTime % 1000) / 10);
  
  //秒の算出（まず1000で割ってミリ秒を秒に直し、60で割った余りが秒）
  const s = Math.floor(elapsedTime / 1000) % 60;
  
  //分の算出（まず1000で割ってミリ秒を秒に直し、60で割ったら分）
  const m = Math.floor(elapsedTime / 60000) % 60;
  
  //時の算出（まず1000で割ってミリ秒を秒に直し、60で2回割ったら時）
  const h = Math.floor(elapsedTime / 60000 / 60);
  
  //0埋め処理
  const msStr = ms.toString().padStart(2, '0');
  const sStr = s.toString().padStart(2, '0');
  const mStr = m.toString().padStart(2, '0');
  const hStr = h.toString().padStart(2, '0');
  
  //html側のtimerに表示する
  timer.innerHTML = `${hStr}:${mStr}:${sStr}.${msStr}`;
};

//startを押したときの内部挙動
start.addEventListener('mousedown', () => {
  let startTime = new Date(); //startを押したときの時刻を記録する変数に時刻を記録
  intervalId = setInterval( () => {
    const now = new Date(); //setIntervalするたびの時刻を記録する変数に時刻を記録
    elapsedTime += now - startTime; //現在時刻からstartを押した時刻を減算し、elapsedTimeに加算
    startTime = now;
    updateTime(); //関数updateTimeの呼び出し
  }, 10); //10ミリ秒(1/100秒)ごとに行う
});

//stopを押したときの内部挙動
stop.addEventListener('mousedown', () => {
  clearInterval(intervalId);
});
  
//resetを押したときの内部挙動
reset.addEventListener('mousedown', () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  timer.innerHTML = `00:00:00.00`;
});