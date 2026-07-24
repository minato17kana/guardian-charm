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
            scoreText.innerText = "🏀 " + score + " 点";

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
