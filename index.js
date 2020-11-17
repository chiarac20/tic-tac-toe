let player1;
let winnerClass='';
let winnerTris;
const boxesDom=[...document.getElementsByClassName('single-box')];
const boxesRow0=findBoxes('row', 0);
const boxesRow1=findBoxes('row', 1);
const boxesRow2=findBoxes('row', 2);
const boxesCol0=findBoxes('col', 0);
const boxesCol1=findBoxes('col', 1);
const boxesCol2=findBoxes('col', 2);
const boxRow0Col0 = boxesDom.find(box => box.dataset.row==='0' && box.dataset.col==='0')
const boxRow2Col0 = boxesDom.find(box => box.dataset.row==='2' && box.dataset.col==='0')
const boxRow1Col1 = boxesDom.find(box => box.dataset.row==='1' && box.dataset.col==='1')
const boxRow0Col2 = boxesDom.find(box => box.dataset.row==='0' && box.dataset.col==='2')
const boxRow2Col2 = boxesDom.find(box => box.dataset.row==='2' && box.dataset.col==='2')
const winnertris1=[boxRow2Col0, boxRow1Col1,boxRow0Col2];
const winnertris2=[boxRow0Col0, boxRow1Col1, boxRow2Col2];
const matchWinner=document.getElementById('match-winner');
const startNewMatchBtn=document.getElementById('start-new-game');
startNewMatch();

function startNewMatch(){
    boxesDom.forEach((box)=>{
        box.addEventListener('click', ()=>{
            const classToAdd=player1 ? 'colour-red':'colour-blue';
            box.classList.add(classToAdd);
            box.disabled=true;
            player1 = !player1;
            checkWinner(boxesRow0, 'colour-red','colour-blue');
            checkWinner(boxesRow1, 'colour-red','colour-blue');
            checkWinner(boxesRow2, 'colour-red','colour-blue');
            checkWinner(boxesCol0, 'colour-red','colour-blue');
            checkWinner(boxesCol1, 'colour-red','colour-blue');
            checkWinner(boxesCol2, 'colour-red','colour-blue');
            checkWinner(winnertris1, 'colour-red','colour-blue');
            checkWinner(winnertris2, 'colour-red','colour-blue');
            checkDraw();
        })
    })
}


function checkWinner(tris, classColourRed, classColourBlue){
    if (tris.every(box=>box.classList.contains(classColourRed))) {
        winnerClass=classColourRed;
        winnerTris=tris;
        tris.forEach(box=>{
            box.classList.add('colour-red-animation')
        })
    } else if (tris.every(box=>box.classList.contains(classColourBlue))) {
        winnerClass=classColourBlue;
        winnerTris=tris;
        tris.forEach(box=>{
            box.classList.add('colour-blue-animation')
        })
    } else {
        return;
    }
    if (winnerClass!=='') {
        setTimeout(()=> {
            matchWinner.innerText='Congratulations!!! ' + winnerClass + ' won this match!';
            if(winnerClass===classColourRed){
                matchWinner.classList.add('winner-red');
            } else if (winnerClass===classColourBlue){
                matchWinner.classList.add('winner-blue');
            }
            boxesDom.forEach(box=>{
                box.disabled=true;
            })
            setTimeout(()=>{
                startNewMatchBtn.classList.remove('display-none');
                startNewMatchBtn.addEventListener('click', restart);
            }, 300)
        }, 500) 
    } 
}

function restart(){
    boxesDom.forEach(box=>{
        box.classList.remove('colour-red', 'colour-red-animation', 'colour-blue', 'colour-blue-animation');
        box.disabled=false;
    })
    winnerClass='';
    matchWinner.classList.remove('winner-red', 'winner-blue');
    matchWinner.innerText='';
    startNewMatchBtn.classList.add('display-none');
}

function findBoxes(param, value) {
    return boxesDom.filter(box=> box.dataset[param]===''+value);
}

function checkDraw (){
    const result=boxesDom.every(box=>{
        return box.disabled;
    })
    if (result) {
        matchWinner.innerText='No winnner'
    }
}

