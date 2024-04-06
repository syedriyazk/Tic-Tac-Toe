let boxes = document.querySelectorAll("#box");
let msgContainer= document.querySelector(".msg-container");
let newgame= document.querySelector(".newgame-btn");
let reset = document.querySelector(".reset-btn");
let msg = document.querySelector("#msg");

let turnO=true; //player O then player X
let count = 0;

// To track the winning posibilty Pattern 
const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; 

//Reset and newgame button triggered by addEventListener
const resetgame =() =>{
    turnO=true;
    count=0; 
    enableboxes(); //enable callback function
    msgContainer.classList.add("hide");
};

//Iterating each boxes (button)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.textContent ="O";
            box.style.color="#f72585";
            turnO=false;
        }
        else{
            box.textContent="X";
            box.style.color="#7209b7";
            turnO=true;
        }

        box.disabled = true; //disabled is a inbuilt function
        count++; //This count is for counting the no.of.boxes filling 

        //if no match occurs means game draw
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gamedraw(); //gamedraw calling
        }
    });
});

//gamedraw function
const gamedraw = () => {
    msg.innerText = "Game was a DRAW!!!";
    msgContainer.classList.remove("hide");
    disableboxes();
};

//This func is for, once the game over then all the button boxes must be disable
const disableboxes = () => {
    for(let box of boxes){
        box.disabled =true;
    }
};

/*This func is for, once game over by clicking new/reset button all the boxes must be empty
 that why innerText="" */
const enableboxes = () => {
    for(let box of boxes){
        box.disabled =false;
        box.innerText="";
    }
};

//Once the pattern matches means this func will declare who is the winner
const showWinner=(winner) => {
    if(winner)
    msg.innerText =`Congratulation and the Winner is "${winner}" `;
    msgContainer.classList.remove("hide");
    disableboxes(); //disable callback function
};

//Tracking each 2D-array 
const checkWinner =() => {
    for(let pattern of winPattern){
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;

            //To Win all three boxes should be equal
            if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
                //if all three boxes were equal and then check that box element were equal or not 
                if(pos1Val === pos2Val && pos2Val === pos3Val){
                    //if yes passing the value
                    showWinner(pos1Val);
                    return true;
                }
            }
            
    }
};

newgame.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);