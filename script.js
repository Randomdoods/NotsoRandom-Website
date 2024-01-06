const track = document.getElementById("image-track");


window.onmousemove = e => {
    if(track.dataset.mouseDownAt == "0") return; //mouseDownAt == 0 before mouse is pressed

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100, nextPercentage = Math.max(Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0), -100);
    //Math.max(nextPercentage, 0);
    //Math.min(nextPercentage, -100);

    //nextPercentage = Math.min(Math.max(nextPercentage, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")) {
        //image.style.objectPosition = `${nextPercentage + 100} 50%`
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, {duration:1200, fill: "forwards"});
    }
}

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}