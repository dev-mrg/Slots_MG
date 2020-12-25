const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
let w = canvas.width;
let h = canvas.height;
let imagesOK = 0;
let imgs1 = [],
    imgs2 = [],
    imgs3 = [];
let reelLength = 1344;
let card = 84;
let spinning = false;

var imageURLs = [];

function loadUrl() {

    imageURLs.push("./img/p10.png");
    imageURLs.push("./img/p11.png");
    imageURLs.push("./img/p12.png");
    imageURLs.push("./img/p13.png");
    imageURLs.push("./img/p14.png");
    imageURLs.push("./img/p15.png");
    imageURLs.push("./img/p16.png");
    
    loadAllImages(start);
}


loadUrl();



function loadAllImages(callback) {
    for (var i = 0; i < imageURLs.length; i++) {
        var img = new Image();
        imgs1.push(img);
        imgs2.push(img);
        imgs3.push(img);
        img.onload = function () {
            imagesOK++;
            if (imagesOK >= imageURLs.length) {
                callback();
            }
        };
        img.onerror = function () {
            alert("image load failed");
        }
        img.crossOrigin = "anonymous";
        img.src = imageURLs[i];
 
    }
}




function Card(img){
    this.img = img;
    this.src = this.img;
}



function start() {
    
    for (let i in imageURLs) {
        ctx.drawImage(imgs1[random(0, imageURLs.length)], 50, card * i, 140, 80);
        ctx.drawImage(imgs2[random(0, imageURLs.length)], 195, card * i, 140, 80);
        ctx.drawImage(imgs3[random(0, imageURLs.length)], 340, card * i, 140, 80);
    }
    !spinning ? animate() : stop();
}


let r1 = new Reel(imgs1, 50)
let r2 = new Reel(imgs2, 195)
let r3 = new Reel(imgs3, 340)

function Reel(arr, x) {
    this.arr = arr;
    this.spin = function () {
        for (let i in imageURLs) {
             this.x = x;
             this.y = card * i;
            this.arr[i].x = this.x;
            this.arr[i].y = this.y;
            ctx.drawImage(this.arr[random(0, imageURLs.length)], this.x, this.y, 140, 80)
        }
    }

}


let spin;
$('#spin').on('click', function () {
       event.cancelBubble = true;
        event.stopPropagation();
    !spinning ? animate() : stop();
    spinning = true;
})


$('#stop').on('click', function () {
       event.cancelBubble = true;
        event.stopPropagation();
    stop()

})


function animate() {

    clearInterval(spin)
    spin = setInterval(function () {

        r1.spin()
        r2.spin()
        r3.spin()
 
     
    }, 40);
r1.arr.push(card); 

    setTimeout(function () {
              console.log(r1.arr[1]);
        stop()
    }, 1500)
    event.cancelBubble = true;
}


function stop() {

    setTimeout(function () {
        spinning = false;
        clearInterval(spin);
    }, 200)

}


function random(min, max, deci) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    deci === true ? withDec(num) : num = num;
    min < 0 ? pong(num) : num = num

    function withDec(x) {
        return x = x + (x / max);
    }

    function pong(x) {
        let arr = [-1, 1];
        let num = random(0, 1);
        return arr[num] * x;
    }

    return num;
}
