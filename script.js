const messages=[
"🏀 杜真くん♡\n\n今日も応援してるよ❤️",
"💕 大好き！試合楽しんできてね☺️",
"🍀 自分を信じて頑張ってね！",
"❤️ 今日も一番かっこいいよ！",
"🏆 終わったらいっぱい褒めるね🥰",
"💛 私はいつでも味方だよ。",
"🌈 笑顔でプレーしてね！",
"✨ 無理せず楽しんでね！",
"💕 頑張る杜真くんが大好き。",
"❤️ ファイト！！🏀"
];

let score=0;

ball.onclick=()=>{

    score++;

    document.getElementById("score").innerHTML=score+" / 3";

    ball.style.bottom="350px";

    setTimeout(()=>{
        ball.style.bottom="20px";
    },300);

    if(score==3){

        const random=Math.floor(Math.random()*messages.length);

        setTimeout(()=>{
            alert(messages[random]);
            score=0;
            document.getElementById("score").innerHTML="0 / 3";
        },400);

    }

}
