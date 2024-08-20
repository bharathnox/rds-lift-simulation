let objPosition = 0;
const moveDistance = 150;

function moveToFloor(floorIndex) {
    const newPosition = -floorIndex * moveDistance;
    
    if (newPosition <= 0 && newPosition >= -(3 * moveDistance)) {
        objPosition = newPosition;

        const obj = document.getElementById('obj');
        obj.style.transform = `translateY(${objPosition}px)`;
    }
}

function up(currentFloor) {
    const newFloorIndex = currentFloor - 1;
    moveToFloor(newFloorIndex);
}

function down(currentFloor) {
    const newFloorIndex = currentFloor - 1;
    moveToFloor(newFloorIndex);
}

function liftsInput(){
    var liftsinput = document.getElementById('liftsInput');
    var liftsValue = liftsinput.value;
    console.log("no.of lifts are ",liftsValue)

    const rm = document.getElementById("lInput")
    rm.remove();

    for(var i=liftsValue; i>=1; i--){
        const txt = document.createTextNode("Lift " + i);
        const para = document.createElement("p");
        para.appendChild(txt);
        const lifts = document.getElementById("lifts");
        lifts.appendChild(para);
    }
}

function floorsInput(){

    var floorsinput = document.getElementById('floorsInput');
    var floorsValue = floorsinput.value;
    console.log("no.of floors are ",floorsValue)

    const rm = document.getElementById("fInput")
    rm.remove();


    for(var i=floorsValue; i>=1; i--){

        const up = document.createElement("button");
        up.textContent = 'UP';
        const down = document.createElement("button");
        down.textContent = 'DOWN';
        const hr = document.createElement("hr")
        const txt = document.createTextNode("Floor " + i)
        const para = document.createElement("p")
        para.appendChild(txt);

        const floors = document.getElementById("floors");
        const floor = document.getElementById("floor");
        floor.appendChild(up);
        floor.appendChild(down);
        floor.appendChild(hr);
        floor.appendChild(para);
        // floor.style.border = '2px solid red'
        // floor.style.padding = '50px'

        floors.appendChild(floor);
        // floors.style.marginLeft = '300px'
        // floors.style.marginRight = '300px'
        // floors.style.marginTop = '10%'
        // floors.style.border = '2px solid black'
        // floors.style.padding = '50px'
        // floors.style.gap = '50px'
    }
}