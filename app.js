
var myGamePiece;
var myObstacles = [];
var myScore;
var flappy = "https://www.pngitem.com/pimgs/b/184-1842507_flappy-bird-png.png";

function startGame(){
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.height = 600;
        this.canvas.width = 370;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function(){
        this.canvas.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type){
    this.type=type;
    if (type=="image"){
    this.image= new Image ();
    this.image.src= color;
    }
    this.width=width;
    this.height=height;
    this.speedX=0;
    this.speedY=0;
    this.x=x;
    this.y=y;
    this.update= function(){
    ctx= myGameArea.context;
    if(this.type=="text"){
    ctx.font=this.width+" "+this.height;
    ctx.fillStyle=color;
    ctx.fillText(this.text, this.x, this.y);
    }else {
    ctx.fillStyle=color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    if(type=="image"){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }else{
    ctx.fillStyle=color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }
    this.newPos=function(){
    this.x+=this.speedX;
    this.y+= this.speedY;
    }
    this.crashWith=function(otherobj){
    var myleft=this.x;
    var myright=this.x+(this.width);
    var mytop=this.y;
    var mybottom=this.y + (this.height);
    var otherleft=otherobj.x;
    var otherright=otherobj.x+ (otherobj.width);
    var othertop=otherobj.y;
    var otherbottom=otherobj.y+ (otherobj.height);
    var crash= true;
    if((mybottom<othertop) || (mytop>otherbottom) || (myright<otherleft) || (myleft>otherright)){
    crash=false;
    }
    return crash;
    }
    }
    
    function updateGameArea(){
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (i=0; i<myObstacles.length; i+=1){
        if(myGamePiece.crashWith(myObstacles[i])){
        myGameArea.stop();
        return;
        }
        }
        myGameArea.clear();
        myGameArea.frameNo+=1;
        if(myGameArea.frameNo==1 || everyinterval(150)){
        x=myGameArea.canvas.width;
        minHeight=20;
        maxHeight=200;
        height=Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap=50;
        maxGap=200;
        gap=Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "black", x, 0));
        myObstacles.push(new component(10, x-height-gap, "black", x,height+gap));
        }
        for(i=0; i<myObstacles.length; i+=1){
        myObstacles[i].speedX=-1;
        myObstacles[i].newPos();
        myObstacles[i].update();
        }
        myScore.text="SCORE: " + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update();
        }
        
        function everyinterval(n){
        if((myGameArea.frameNo/n)%1==0){return true;}
        return false;
        }
        
        function moveup(){
            myGamePiece.speedY=-1;
        }
        
        function movedown(){
            myGamePiece.speedY=-1;
        }

        function moveleft(){
            myGamePiece.speedY=-1;
        }

        function moveright(){
            myGamePiece.speedY=-1;
        }
        
        function clearmove(){
            myGamePiece.speedY=0;
            myGamePiece.speedY=0;
        }