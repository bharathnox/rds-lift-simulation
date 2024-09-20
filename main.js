function generate() {
    const simulation = document.getElementById("simulation");
    const liftsValue = document.getElementById("liftsInput").value;
    const floorsValue = document.getElementById("floorsInput").value;

    // Input validation
    if (!liftsValue && !floorsValue) {
        alert("Please enter the number of lifts and floors required");
        return;
    } else if (!liftsValue) {
        alert("Please enter the number of lifts required");
        return;
    } else if (liftsValue <= 0) {
        alert("Please enter a positive value at lifts input");
        return;
    } else if (!floorsValue) {
        alert("Please enter the number of floors required");
        return;
    } else if (floorsValue <= 0) {
        alert("Please enter a positive value at floors input");
        return;
    } else if(floorsValue == 1 && liftsValue > 1) {
        alert("Number of lifts cannot be greater than one if there is only one floor")
    }

    simulation.innerHTML = '';
    simulation.style.position = 'relative';
    const liftWidth = 50;
    const spacing = 60;

    const liftBusy = Array(liftsValue).fill(false);
    const queue = []; // Queue to hold requests

    // Create lifts
    for (let i = 1; i <= liftsValue; i++) {
        const lift = document.createElement("div");
        lift.className = "lift";
        lift.id = "lift" + i;

        const doorL = document.createElement("div");
        const doorR = document.createElement("div");
        doorL.className = "leftDoor";
        doorR.className = "rightDoor";
        doorL.id = "leftDoor" + i;
        doorR.id = "rightDoor" + i;

        lift.appendChild(doorL);
        lift.appendChild(doorR);
        simulation.appendChild(lift);
        lift.style.justifyContent = 'spaceEvenly';
        lift.style.display = 'flex';
        lift.style.flexDirection = 'row';
        lift.style.width = (liftWidth + 10) + 'px';
        lift.style.height = '80px';
        lift.style.backgroundColor = 'black';
        lift.style.color = 'white';
        lift.style.position = 'absolute';
        lift.style.bottom = '0px';
        lift.style.left = (i - 1) * (liftWidth + spacing) + 'px';
        lift.style.marginLeft = '130px';
    }

    // Create floors and buttons
    for (let i = floorsValue; i >= 1; i--) {
        const floors = document.createElement("div");
        floors.className = "floors";
        floors.id = "floor" + i;
        const btns = document.createElement("div");
        btns.className = "btns";

        const up = document.createElement("button");
        up.className = "up";
        up.id = "up" + i;
        up.addEventListener('click', function () {
            addToQueue(i, 'up', up);
        });

        const down = document.createElement("button");
        down.className = "down";
        down.id = "down" + i;
        down.addEventListener('click', function () {
            addToQueue(i, 'down', down);
        });

        const para = document.createElement("p");
        const hr = document.createElement("hr");
        const upTxt = document.createTextNode("UP");
        const downTxt = document.createTextNode("DOWN");
        const floorTxt = document.createTextNode("Floor " + i);

        up.appendChild(upTxt);
        down.appendChild(downTxt);
        para.appendChild(floorTxt);
        btns.appendChild(up);
        btns.appendChild(down);
        floors.appendChild(btns);
        floors.appendChild(para);
        floors.appendChild(hr);

        hr.style.border = "1px solid black";
        floors.style.textAlign = 'right';
        btns.style.display = 'flex';
        btns.style.flexDirection = 'column';
        btns.style.width = '100px';
        simulation.appendChild(floors);
    }

    document.getElementById("up" + floorsValue).disabled = true;
    document.getElementById("down" + 1).disabled = true;

    // Add request to queue and disable the button
    function addToQueue(targetFloor, direction, button) {
        queue.push({ targetFloor, direction, button });
        button.disabled = true; // Disable the button immediately
        processQueue();
    }

    // Process the queue
    function processQueue() {
        const lifts = [];
        for (let i = 1; i <= liftsValue; i++) {
            const lift = document.getElementById('lift' + i);
            lifts.push(lift);
        }

        for (let i = 0; i < lifts.length; i++) {
            if (!liftBusy[i] && queue.length > 0) {
                const request = queue.shift(); // Get the next request
                moveLiftToFloor(request.targetFloor, request.direction, request.button);
            }
        }
    }

    function moveLiftToFloor(targetFloor, direction, button) {
        const lifts = [];
        for (let i = 1; i <= liftsValue; i++) {
            const lift = document.getElementById('lift' + i);
            lifts.push(lift);
        }

        let closestLift = findAvailableLift(targetFloor, lifts);
        if (closestLift) {
            const currentFloor = parseInt(closestLift.style.bottom) / 102 + 1;
            const targetPosition = (targetFloor - 1) * 102;
            const floorsToMove = Math.abs(targetFloor - currentFloor);
            const duration = floorsToMove * 2;

            liftBusy[parseInt(closestLift.id.replace('lift', '')) - 1] = true;
            closestLift.style.transition = `bottom ${duration}s linear`;
            closestLift.style.bottom = targetPosition + 'px';

            setTimeout(() => {
                openDoors(closestLift, button);
            }, duration * 1000);
        }
    }

    function findAvailableLift(targetFloor, lifts) {
        const targetPosition = (targetFloor - 1) * 102;
        let closestLift = null;
        let minDistance = Infinity;

        lifts.forEach(lift => {
            const liftIndex = parseInt(lift.id.replace('lift', '')) - 1;
            if (!liftBusy[liftIndex]) {
                const currentPosition = parseInt(lift.style.bottom);
                const distance = Math.abs(targetPosition - currentPosition);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestLift = lift;
                }
            }
        });

        return closestLift;
    }

    function openDoors(lift, button) {
        const ld = lift.querySelector(".leftDoor");
        const rd = lift.querySelector(".rightDoor");
        ld.style.transform = 'translateX(-90%)';
        rd.style.transform = 'translateX(90%)';
        ld.style.transition = 'transform 2.5s ease-in-out';
        rd.style.transition = 'transform 2.5s ease-in-out';
        setTimeout(() => closeDoors(lift, button), 2500);
    }

    function closeDoors(lift, button) {
        const ld = lift.querySelector(".leftDoor");
        const rd = lift.querySelector(".rightDoor");
        ld.style.transform = 'translateX(0%)';
        rd.style.transform = 'translateX(0%)';
        ld.style.transition = 'transform 2.5s ease-in-out';
        rd.style.transition = 'transform 2.5s ease-in-out';
        setTimeout(() => {
            liftBusy[parseInt(lift.id.replace('lift', '')) - 1] = false;
            if (button) button.disabled = false; // Re-enable the button when served
            processQueue(); // Process the next request
        }, 2500);
    }
}
