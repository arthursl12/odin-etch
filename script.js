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

    let randomColor = document.querySelector('.random-colors').checked
    let shade = document.querySelector('.shade').checked

    if(!randomColor && !shade){
        // Simple coloring
        // slot.classList.add("colored-slot");
        slot.style["background-color"] = "black";
    }else if(randomColor){
        const randomBetween = (min, max) => 
                            min + Math.floor(Math.random() * (max - min + 1));
        const rgb = `rgb(`+
            `${randomBetween(0, 255)},`+
            `${randomBetween(0, 255)},`+
            `${randomBetween(0, 255)})`; 
        slot.style["background-color"] = rgb;
        console.log(rgb);
    }else if(shade){
        let currColor = window.getComputedStyle(slot).backgroundColor;
        if(currColor[0] == 'r'){
            console.log("RGB");
            let rgbColor = rgbString2Array(currColor);
            let hslColor = RGBToHSL(rgbColor[0], rgbColor[1], rgbColor[2]);
            
            // Darken 10%
            hslColor[2] -= 10;
            const hsl = `hsl(`+
                `${hslColor[0]},`+
                `${hslColor[1]}%,`+
                `${hslColor[2]}%)`; 

            slot.style["background-color"] = hsl;
        }
    }
}

const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
};

function rgbString2Array(rgbstr){
    rgb = rgbstr.replace(/[^\d,]/g, '').split(',');
    rgb = rgb.map(str => parseInt(str));
    return rgb;
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
    checkboxes.forEach(box => box.checked = false);
}



createGrid();
addHoverEvents();
addCheckboxEvents();

