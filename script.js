let GRID_SIZE = 16;


function createGrid(){
    const gridContainer = document.querySelector(".grid-container");
    for(let i=0; i<GRID_SIZE; i++){
        for(let j=0; j<GRID_SIZE; j++){
            let slot = document.createElement("div");
            slot.classList.add("grid-slot");
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

createGrid();
addHoverEvents();

