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
            slot.style.width = newStr;
            gridContainer.appendChild(slot);
        }
    }
}

function colorOnHover(e){
    const slot = e.target;
    slot.classList.add("colored-slot");

    let randomColor = document.getElementById('remember').checked
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

function deselectOther(e){
    // Only allow one 
    if(e.target.checked){
        if(e.target.classList[0] == "shade"){
            const random = document.querySelector(".random-colors");
            random.checked = false;
        }else if(e.target.classList[0] == "random-colors"){
            const shade = document.querySelector(".shade");
            shade.checked = false;
        }
    }


}

function addCheckboxEvents(){
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(box => box.addEventListener('change',deselectOther));
}



createGrid();
addHoverEvents();
addCheckboxEvents();

