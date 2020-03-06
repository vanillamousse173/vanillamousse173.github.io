let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();
let row = 7;
let col = 7;
img.onload = function() {
    let w = img.width / col;
    let h = img.height / row;
    let i = 0;
    let imgContents = [];
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            let x = -c * w;
            let y = -r * h;
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(this, x, y, w*col, h*row);
            let imgString = canvas.toDataURL('image/png');
            imgContents.push(imgString);
        }
    }
    let imgArray = document.querySelectorAll("#puzzle img");
    for (let i = 0; i < imgArray.length; i++) {
        imgArray[i].src = imgContents[i];
    }
} // end of onload

// 圖片的延遲時間  (秒)
let delay = 5;

// 置換圖片
function change_image_loop() {
    setTimeout(()=>{
        img.src = "img/images/puzz2.jpg";
    }, delay * 1 * 1000);
    setTimeout(()=>{
        img.src = "img/images/puzz3.jpg";
    }, delay * 2 * 1000);
    setTimeout(()=>{
        img.src = "img/images/puzz4.jpg";
    }, delay * 3 * 1000);
    setTimeout(()=>{
        img.src = "img/images/puzz5.jpg";
    }, delay * 4 * 1000);
    setTimeout(()=>{
        img.src = "img/images/puzz7.jpg";
    }, delay * 5 * 1000);
    setTimeout(()=>{
        img.src = "img/images/puzz6.jpg";
    }, delay * 6 * 1000);
    setTimeout(()=>{
        img.src = "img/images/puzz1.jpg";
    }, delay * 7 * 1000);
}

// 初始化
change_image_loop();
img.src = "img/images/puzz1.jpg";
setInterval(()=>{
    change_image_loop();
}, 7 * delay * 1000);