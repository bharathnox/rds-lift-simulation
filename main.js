function generate() {

    const simulation = document.getElementById("simulation");
    const liftsValue = document.getElementById("liftsInput").value;
    const floorsValue = document.getElementById("floorsInput").value;


    if (!liftsValue && !floorsValue) {
        alert("Please enter the number of lifts and floors required");
        return
    } else if (!liftsValue) {
        alert("Please enter the number of lifts required");
        return
    }  else if (liftsValue <= 0) {
        alert("Please enter a positive value at lifts input");
        return
    } else if (!floorsValue) {
        alert("Please enter the number of floors required");
        return
    } else if (floorsValue <= 0) {
        alert("Please enter a positive value at floors input");
        return
    }
    
    simulation.innerHTML = ''

    simulation.style.position = 'relative'

    const liftWidth = 50;
    const spacing = 60;

    for (let i = 1; i <= liftsValue; i++){

        const lift = document.createElement("div");
        lift.className = "lift"

        const txt = document.createTextNode("Lift - "+i);
        lift.appendChild(txt);
        lift.className = "lift";
        lift.id = "lift" + i;

        simulation.appendChild(lift);

        lift.style.display = 'flex';
        lift.style.flexDirection = 'row';
        lift.style.width = liftWidth + 'px';
        lift.style.height = '80px';
        lift.style.backgroundColor = 'blue';
        lift.style.position = 'absolute';
        lift.style.bottom = '0';
        lift.style.left = (i - 1) * (liftWidth + spacing) + 'px';
        lift.style.marginLeft = '130px'

    }

    let move = 102;

    for (let i = floorsValue; i >= 1; i--) {

        const floors = document.createElement("div");
        floors.className = "floors"
        floors.id = "floor"+i;
        const btns = document.createElement("div");
        btns.className = "btns"

        const up = document.createElement("button");
        up.className = "up"
        up.id = "up" + i;
        let upid = up.id;

        up.addEventListener('click', function () {
            moveLiftToFloor(i);
        });

        const down = document.createElement("button");
        down.className = "down"
        down.id = "down"+i;
        let downid = down.id;

        down.addEventListener('click', function () {
            moveLiftToFloor(i);
        });

        const para = document.createElement("p");
        const hr = document.createElement("hr");
        const upTxt = document.createTextNode("UP");
        const downTxt = document.createTextNode("DOWN");
        const floorTxt = document.createTextNode("Floor " + i);

        up.appendChild(upTxt)
        down.appendChild(downTxt)
        para.appendChild(floorTxt)
        btns.appendChild(up)
        btns.appendChild(down)
        floors.appendChild(btns)
        floors.appendChild(para)
        floors.appendChild(hr)

        hr.style.border = "1px solid black";

        floors.style.textAlign = 'right'

        btns.style.display = 'flex'
        btns.style.flexDirection = 'column'
        btns.style.width = '100px'

        simulation.appendChild(floors)
    }

    const delUp = document.getElementById("up" + floorsValue);
    delUp.disabled = true;
    const delDown = document.getElementById("down" + 1);
    delDown.disabled = true;

    function moveLiftToFloor(targetFloor) {
        const lifts = [];
        for (let i = 1; i <= liftsValue; i++) {
            const lift = document.getElementById('lift' + i);
            lifts.push(lift);
        }

        const targetPosition = (targetFloor - 1) * move;
        let closestLift = null;
        let minDistance = Infinity;

        lifts.forEach(lift => {
            const currentPosition = parseInt(lift.style.bottom);
            const distance = Math.abs(targetPosition - currentPosition);
            if (distance < minDistance) {
                minDistance = distance;
                closestLift = lift;
            }
        });

        if (closestLift) {

        const currentFloor = parseInt(closestLift.style.bottom) / move + 1;
        const floorsToMove = Math.abs(targetFloor - currentFloor);
        const duration = floorsToMove * 2;

        closestLift.style.transition = `bottom ${duration}s ease`;
        closestLift.style.bottom = targetPosition + 'px';
        }
    }
}
