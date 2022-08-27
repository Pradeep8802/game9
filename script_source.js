var can=document.querySelector('canvas');
// can.width=window.innerWidth;
// can.height=window.innerHeight;
var c=can.getContext('2d');


// GAME STARTING CREDENTIALS
const XSTARTINGOFGAME=100;
const YSTARTINGOFGAME=100;


var playerLastLocation=[];

// BOARD CONTRAINTS
const NOOFROWS=4;
const NOOFCOLUMNS=4;
const WIDTHOFEACHBLOCK=60;
const HEIGTHOFEACHBLOCK=60;



function drawRows(){
    for(let i=0;i<NOOFCOLUMNS+1;i++){
        c.beginPath();
        c.moveTo(XSTARTINGOFGAME,YSTARTINGOFGAME+i*HEIGTHOFEACHBLOCK);
        c.lineTo(XSTARTINGOFGAME+WIDTHOFEACHBLOCK*NOOFROWS,YSTARTINGOFGAME+i*HEIGTHOFEACHBLOCK);
        c.strokeStyle='black';
        c.stroke();}
}

function drawColumns(){
    for(let i=0;i<NOOFROWS+1;i++){
        c.beginPath();
        c.moveTo(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME);
        c.lineTo(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME+HEIGTHOFEACHBLOCK*NOOFCOLUMNS);
        c.strokeStyle='black';
        c.stroke();}
}

function drawBackGround(){
    drawRows();
    drawColumns();
}



const NUMBEROFEATERS=1;
var eaters=[[XSTARTINGOFGAME,YSTARTINGOFGAME],[XSTARTINGOFGAME+(NOOFROWS-1) * WIDTHOFEACHBLOCK,YSTARTINGOFGAME]];




const WIDTHOFEACHENEMY=60;
const HEIGTHOFEACHENEMY=60;

function drawEater(i){
    c.fillStyle="red";
    c.fillRect(eaters[i][0],eaters[i][1],WIDTHOFEACHENEMY,HEIGTHOFEACHENEMY);

}


function drawEaters(){

    for(let i=0;i<eaters.length;i++){
        drawEater(i);

    }
}

const WIDTHOFPLAYER=60;
const HEIGTHOFPLAYER=60;


var playerLocation=[XSTARTINGOFGAME+NOOFCOLUMNS/2 * WIDTHOFEACHBLOCK,YSTARTINGOFGAME+NOOFROWS/2 * HEIGTHOFEACHBLOCK];
function drawPlayer(){
    c.fillStyle="pink";
    c.fillRect(playerLocation[0],playerLocation[1],WIDTHOFPLAYER,HEIGTHOFPLAYER);
}

function draw(){
drawBackGround();
drawEaters();
drawPlayer();


}
draw();

var eaterTurn=true;
var playerTurn=false;
// addEventListener("mousedown",);



function findCenter(a,b){
    var x=XSTARTINGOFGAME+a*WIDTHOFEACHBLOCK+WIDTHOFEACHBLOCK/2;
    var y=YSTARTINGOFGAME+b*HEIGTHOFEACHBLOCK+HEIGTHOFEACHBLOCK/2;
    return [x,y];
}

function findCenterOfEater(i){
    var x=eaters[i][0]+WIDTHOFEACHBLOCK/2;
    var y=eaters[i][1]+HEIGTHOFEACHBLOCK/2;

    return [x,y];
}



function together(cube1,cube2){

    if(cube1[1]==cube2[1] && Math.abs(cube1[0]-cube2[0])==WIDTHOFEACHENEMY/2+WIDTHOFEACHBLOCK/2){
        return true;
    }
    else if(cube1[0]==cube2[0] && Math.abs(cube1[1]-cube2[1])==HEIGTHOFEACHBLOCK/2+HEIGTHOFEACHENEMY/2){
        return true;
    }
    return false;
}

function validPosition(a,b,i){
// eater
//console.log("hi");

var cube1=findCenterOfEater(i);
var cube2=findCenter(a,b);
if(together(cube1,cube2)==true){
   return true;
}
return false;
}

function movementOfEnemy(i,a,b){
    //console.log("hello");
    //console.log(eaters);
    var cube2=findCenter(a,b);
    c.clearRect(eaters[i][0],eaters[i][1],WIDTHOFEACHENEMY,HEIGTHOFEACHENEMY);
    console.log(cube2[0]-WIDTHOFEACHBLOCK/2,cube2[1]-HEIGTHOFEACHBLOCK/2);
    eaters[i][0]=cube2[0]-WIDTHOFEACHBLOCK/2;
    eaters[i][1]=cube2[1]-HEIGTHOFEACHBLOCK/2;
    console.log(eaters);

}


function validMovementForEnemy(i){
    
    //if(clicked==1){
        for(var a=0;a<NOOFCOLUMNS+1;a++){
            for(var b=0;b<NOOFROWS+1;b++){
                
                if(insideBlock(a,b)==true){
                    if(validPosition(a,b,i)==true){
                        movementOfEnemy(i,a,b);
                    //     console.log("helloe");

                    }

                    
                   // console.log(a,b);
                    
                    break;
                }
    
            }

        //}
}
}

function insideBlock(a,b){
   //console.log(move);
   //console.log(XSTARTINGOFGAME+a*WIDTHOFEACHBLOCK,move[0],XSTARTINGOFGAME+(a+1)*WIDTHOFEACHBLOCK);
   
    if(move[0]>(XSTARTINGOFGAME+a*WIDTHOFEACHBLOCK) && (XSTARTINGOFGAME+a*WIDTHOFEACHBLOCK+WIDTHOFEACHBLOCK)>move[0]){
       // console.log("hell");
        
        if(move[1]>(YSTARTINGOFGAME+b*HEIGTHOFEACHBLOCK) && YSTARTINGOFGAME+b*HEIGTHOFEACHBLOCK+HEIGTHOFEACHENEMY>move[1]){
          //  console.log(a,b);
            return true;
        }
        }
    return false;
    }



function inside(i){
    if(move[0]>eaters[i][0] && eaters[i][0]+WIDTHOFEACHENEMY>move[0]){
        
    if(move[1]>eaters[i][1] && eaters[i][1]+WIDTHOFEACHENEMY>move[1]){
        return true;
    }
    }
return false;
}

var move=[undefined,undefined];
var clicked=0;
var enemySelected=false;
var selectedEnemy=undefined;

// addEventListener('mousedown', function(event){
//     move[0]=event.clientX
//     move[1]=event.clientY;
//     //console.log(move);
    
// });
// addEventListener("mousedown",(event)=>{
//     {

// move[0]=event.clientX
// move[1]=event.clientY

// })
function onMouseClick(event){
move[0]=event.clientX
move[1]=event.clientY
//console.log(move);
if(eaterTurn==true){
    for(let i=0;i<eaters.length;i++){

        //if(inside(i)==true){
            console.log(i," enemy is selected");
            enemySelected=true;
            selectedEnemy=i;
            clicked=1;
            validMovementForEnemy(i);
           // console.log("hello");
            // if(validMovementForEnemy(i)==true){
            //     console.log("he");
            // }
            break;
        //}
        }
    }
}

function refresh(){
    c.clearRect(0,0,can.width,can.height);


}

function main(){
    requestAnimationFrame(main);
    draw();
    // refresh();
}
main();