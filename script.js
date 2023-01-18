let WIDTH = "700px";

function createGrid(size=16){
    // Define grid total width
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.width = WIDTH;

    // Remove previous grid if existing
    let children = document.querySelectorAll(".grid-container > .grid-slot");
    if (children){
        children.forEach(child => gridContainer.removeChild(child));
    }
    
    // Create grid
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            let slot = document.createElement("div");
            slot.classList.add("grid-slot");
            
            
            let newStr = "calc(("+WIDTH+"/"+String(size)+"))";
            console.log(newStr);

            slot.style.width = newStr;
            gridContainer.appendChild(slot);
        }
    }
}

function colorOnHover(e){
    const slot = e.target;
    slot.classList.add("colored-slot");
}

function addHoverEvents(){
    const slots = document.querySelectorAll(".grid-slot");
    slots.forEach(sl => sl.addEventListener('mouseover', colorOnHover));
}

function promptNewGrid(){
    console.log("New Grid");
    let newSize = Number(prompt("New grid size (max. 100)"));
    console.log(newSize);
    createGrid(newSize);
    addHoverEvents();
}

createGrid();
addHoverEvents();

