let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
}
document.getElementById("myCanvas").style.background = "url('https://github.com/ssharma2303/Martial-Arts/blob/main/images/backgroundjpg')";

let myFunction = () => {
 var person = prompt("Please enter your name", "Harry Potter");

if (person != null) {
  document.getElementById("demo").innerHTML =
  "Hello " + person + "! Let's start. Click on the buttons below to learn some cool moves! ";
    }
}

let imagePath = (frameNumber, animation) => {
    return "https://github.com/ssharma2303/Martial-Arts/blob/main/images/"+ animation + "/" + frameNumber + ".png?raw=true";
}

let frames = {
    idle : [1, 2, 3, 4, 5, 6, 7, 8],
    kick : [1, 2, 3, 4, 5, 6, 7],
    punch : [1, 2, 3, 4, 5, 6, 7],
    backward : [1, 2, 3, 4, 5, 6],
    forward : [1, 2, 3, 4, 5, 6],
    block : [1, 2, 3, 4, 5, 6, 7, 8, 9]

};

let loadImages = (callback) => {
    let images = {idle:[], kick:[], punch:[], backward:[], forward:[], block:[]};
    let imagesToLoad = 0; 

    ["idle","kick","punch","backward","forward","block"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber,animation);

            loadImage(path, (image) => {
                images[animation][frameNumber - 1] = image;
                imagesToLoad = imagesToLoad - 1;    

                if(imagesToLoad === 0){
                    callback(images);
                }
            });
        });
    });
};


let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(()=>{
            ctx.clearRect(500, 50, 250, 300);
            ctx.drawImage(image, 500, 50, 250, 300);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images, ) => {
    let queuedAnimations = [];

    let aux = () => {
        let selectedAnimation;

        if(queuedAnimations.length === 0){
            selectedAnimation = "idle";
        }else{
            selectedAnimation = queuedAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    };
    aux();

    document.getElementById("kick").onclick = () => {
        queuedAnimations.push("kick");
    };
    document.getElementById("punch").onclick = () => {
        queuedAnimations.push("punch");
    };
    document.getElementById("backward").onclick = () => {
        queuedAnimations.push("backward");
    };
    document.getElementById("forward").onclick = () => {
        queuedAnimations.push("forward");
    };
    document.getElementById("block").onclick = () => {
        queuedAnimations.push("block");
    };

    document.addEventListener("keyup", (event)=>{
        const key = event.key;

        if(key === "ArrowLeft"){
            queuedAnimations.push("kick");
        }else if(key === "ArrowRight"){
            queuedAnimations.push("punch");
        }
        else if(key === "ArrowDown"){
            queuedAnimations.push("backward");
        }
        else if(key === "ArrowUp"){
            queuedAnimations.push("forward");
        }
        else if(key === "Space"){
            queuedAnimations.push("block");
        }
    });
});
