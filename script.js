const supportMessages = [
`🏀💕
杜真くん♡

試合お疲れさま☺️
頑張ってる姿、本当にかっこいいよ。
ずっと応援してるからね❤️`,

`💛
杜真くんが頑張る姿を見るたびに
もっと好きになるよ🥰
今日も自信を持ってプレーしてね🏀`,

`🍀
どんな結果でも
私にとって一番かっこいいのは杜真くんだよ❤️`,

`🫶
無理しすぎないでね☺️
終わったらいっぱい褒めさせてね💕`,

`🏆
今日は絶対大丈夫✨
私はずっと杜真くんの味方だよ❤️`,

`🥰
大好きな杜真くんへ♡

笑顔で楽しんできてね🏀
応援してるよ❤️`,

`💖
緊張したら
『私は応援してくれてる』って思い出して☺️
きっと大丈夫🍀`,

`🌈
どんな試合になっても
今日も頑張る杜真くんが一番素敵だよ💕`,

`❤️
終わったらぎゅーってしたいな🥺💕
だから思いっきり楽しんできてね🏀`,

`✨
いつも頑張ってくれてありがとう☺️
そんな杜真くんが大好きです❤️`
];
const ballCenter = ballX;
const start = document.getElementById("start");
const game = document.getElementById("game");
const ball = document.getElementById("ball");
const goal = document.getElementById("goal");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

let score = 0;
let time = 30;
let gameRunning = false;
let goalX = 120;
let direction = 3;

start.onclick = () => {
    start.style.display = "none";
    game.style.display = "block";
    gameRunning = true;

    setInterval(moveGoal, 20);

    const timer = setInterval(() => {
        setInterval(moveBall,20);
        time--;
        timerText.innerText = time + " 秒";

        if (time <= 0) {

            clearInterval(timer);
            gameRunning = false;

            let message = "";

            if (score >= 20) {
                message =
`🏆 LEGEND!!

杜真！

最高のプレーだったよ！

試合頑張ってね🏀❤️`;
            } else if (score >= 10) {
                message =
`✨ MVP!!

杜真！

ここまで積み重ねた努力を
信じてプレーしてね🍀`;
            } else {
                message =
`😊 NICE TRY!!

最後まで頑張る杜真を
いつも応援しています❤️`;
            }

            setTimeout(() => {
                alert(message);
                location.reload();
            }, 300);

        }

    }, 1000);

}

function moveGoal(){

    if(!gameRunning) return;

    goalX += direction;

    if(goalX > 220 || goalX < 20){
        direction *= -1;
    }

    goal.style.left = goalX + "px";

}

ball.onclick = ()=>{

    if(!gameRunning) return;

    ball.style.transition=".25s";
    ball.style.bottom="360px";

    setTimeout(()=>{

        const ballCenter = 145;
        const goalCenter = goalX + 35;

        if(Math.abs(ballCenter-goalCenter)<40){

            score++;
            celebrate();
            scoreText.innerText = "🏀 " + score + " 点";

            if(score === 3){

             const random = Math.floor(Math.random()*supportMessages.length);

             setTimeout(()=>{
              alert(supportMessages[random]);
             },500);

            }

            document.getElementById("message").innerText="SWISH!! ✨";

        }else{

            document.getElementById("message").innerText="MISS";

        }

    },180);

    setTimeout(()=>{

        ball.style.bottom="25px";
        document.getElementById("message").innerText="";

    },350);

}
// ===== 紙吹雪 =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];

function celebrate() {

    for(let i=0;i<80;i++){

        particles.push({
            x:180,
            y:120,
            dx:(Math.random()-0.5)*8,
            dy:Math.random()*-6,
            size:Math.random()*6+4,
            life:60
        });

    }

}

function drawConfetti(){

    ctx.clearRect(0,0,360,520);

    particles.forEach((p,index)=>{

        p.x+=p.dx;
        p.y+=p.dy;

        p.dy+=0.15;

        p.life--;

        ctx.fillStyle=`hsl(${Math.random()*360},100%,60%)`;
        ctx.fillRect(p.x,p.y,p.size,p.size);

        if(p.life<=0){
            particles.splice(index,1);
        }

    });

    requestAnimationFrame(drawConfetti);

}

drawConfetti();

function moveBall(){

    if(!gameRunning) return;

    ball.style.left = ballX + "px";

}

function leftMove(){

    if(ballX > 20){
        ballX -= 20;
    }

}

function rightMove(){

    if(ballX < 290){
        ballX += 20;
    }

}

let dragging = false;

ball.addEventListener("touchstart", (e) => {
    dragging = true;
});

document.addEventListener("touchmove", (e) => {

    if (!dragging || !gameRunning) return;

    let x = e.touches[0].clientX;

    const court = document.getElementById("court");
    const rect = court.getBoundingClientRect();

    ballX = x - rect.left - 30;

    if(ballX < 10) ballX = 10;
    if(ballX > 300) ballX = 300;

    ball.style.left = ballX + "px";

});

document.addEventListener("touchend", () => {
    dragging = false;
});
