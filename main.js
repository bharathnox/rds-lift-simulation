function generate() {

    const simulation = document.getElementById("simulation");
    const liftsValue = document.getElementById("liftsInput").value;
    const floorsValue = document.getElementById("floorsInput").value;

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
        up.id = i;
        let upid = up.id;

        up.addEventListener('click', function () {
            moveLiftToFloor(i);
        });

        const down = document.createElement("button");
        down.className = "down"
        down.id = i;
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
            closestLift.style.bottom = targetPosition + 'px';
            closestLift.style.transition = (targetPosition / move) * 2 + 's'
        }
    }
}

            // if (Math.abs(upid-floorsValue) < Math.abs(upid-1 )) {
            //     for (var j = upid; j <= floorsValue; j++){
            //         if (liftPosi == j) {
            //             liftPosi = upid;
            //             for(var a=1; a<=liftsValue; a++){
            //                 const lift = document.getElementById('lift'+a);
            //                 lift.style.transition = '2s'
            //                 lift.style.bottom = (liftPosi - 1) * move + 'px'
            //             }
            //         }
            //     }
            // } else {
            //     for (var j = upid; j >= 1; j--){
            //         if (liftPosi == j) {
            //             liftPosi = upid;
            //             for(var a=1; a<=liftsValue; a++){
            //                 const lift = document.getElementById('lift'+a);
            //                 lift.style.transition = '2s'
            //                 lift.style.bottom = (liftPosi - 1) * move + 'px'
            //             }
            //         }
            //     }
            // }

            // for (var j = upid; j <= floorsValue; j++){
            //     for (var a = 1; a <= liftsValue; a++) {
            //         if (liftPosi > j) {
            //             const lift = document.getElementById('lift'+a);
            //             lift.style.transition = '2s'
            //             lift.style.bottom = (upid-1) * move + 'px'
            //             liftPosi -= j;
            //             a = liftPosi;
            //             console.log('if1')
            //         }
            //         if (liftPosi < j) {
            //             const lift = document.getElementById('lift'+a);
            //             lift.style.transition = '2s'
            //             lift.style.bottom = (upid-1) * move + 'px'
            //             liftPosi += j;
            //             a = liftPosi;
            //             console.log('if2')
            //         }
            //     }
            // }
            // for (var j = upid; j >= 1; j--){
            //     for (var a = 1; a <= liftsValue; a++) {
            //         if (liftPosi < j) {
            //             const lift = document.getElementById('lift'+a);
            //             lift.style.transition = '2s'
            //             lift.style.bottom = (upid-1) * move + 'px'
            //             liftPosi += j;
            //             a = liftPosi;
            //             console.log('if3')
            //         }
            //         if (liftPosi > 1) {
            //             const lift = document.getElementById('lift'+a);
            //             lift.style.transition = '2s'
            //             lift.style.bottom = (upid-1) * move + 'px'
            //             liftPosi -= j;
            //             a = liftPosi;
            //             console.log('if4')
            //         }
            //     }
            // }
            // for (var a = 1; a <= liftsValue; a++) {
            //     const lift = document.getElementById('lift'+a);
            //     lift.style.transition = '2s'
            //     lift.style.bottom = (upid-1) * move + 'px'
            //     liftPosi += move;
            // }