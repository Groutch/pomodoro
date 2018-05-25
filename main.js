
var sound =document.createElement("audio");
sound.src = "quack.mp3";

function Pomodoro() {
    this.timer=15;
    var intervalID;
    var that = this;
    var paused=false;
    displayTime = function (timerSeconds) {
        var sec = timerSeconds%60;
        var min = Math.trunc(timerSeconds/60);
        if (min < 10)
        {
            min='0'+min;
        }
        if (sec < 10)
        {
            sec='0'+sec;
        }
        $("#timerfield").html(min+":"+sec);
    };
    displayTime(that.timer);
    this.playpo = function(){
        $(".btplay").prop("disabled",true);
        //On ajoute la tache si le compteur n'était pas en pause
        if (!paused)
        { 
            var tasktxt = $('#textfield').val();
            $("#taskdone").append(`<li class="taskno small">${tasktxt}</li>`);
        }else
        {
            paused=false;
        }
        intervalID = setInterval(function(){
            if (that.timer > 0){
        //si le timer n'est pas à zero on continue à décrémenter        
        that.timer--; 
    }else{
        //Si on arrive à zero on arrete tout
        $(".btplay").prop("disabled",false);
        clearInterval(intervalID);
        that.timer = 15;
        sound.play();
        //on barre la dernière tache
        var vtaskno=$(".taskno").last().html();
        $(".taskno").last().html("<strike>"+vtaskno+"</strike>");

    }
    displayTime(that.timer);
    console.log(that.timer);
}, 1000);
    };
    this.stoppo = function(){
        paused=false;
        $(".btplay").prop("disabled",false);
        //si on arrete il faut penser à effacer la tache
        //Qu'on a terminé si on a un compteur en cours
        console.log("intervalID: "+intervalID);
        if(that.timer!=15){
            var vtaskno=$(".taskno").last().html();
            $(".taskno").last().remove();
        }
        clearInterval(intervalID);
        that.timer = 15;
        displayTime(that.timer);

    };
    this.pausepo = function(){
        paused=true;
        $(".btplay").prop("disabled",false);
        clearInterval(intervalID);
        displayTime(that.timer);

    }
};

$(document).ready(function () {

    var pomo = new Pomodoro();
    $(".btplay").click(pomo.playpo);
    $(".btpause").click(pomo.pausepo);
    $(".btstop").click(pomo.stoppo);
});
