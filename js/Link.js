// JavaScript Document

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image();
    img.onload = split_img;
    let row = 7;
    let col = 7;
    function split_img() {
        let w = img.width / col;
        let h = img.height / row;
        let i = 0;
        for (let r=0; r<row; r++) {
            for (let c=0; c<col; c++) {
                let x = -c * w;
                let y = -r * h;
                canvas.width = w;
                canvas.height = h;
                ctx.drawImage(this, x, y, w*col, h*row);
                let imgSataString = canvas.toDataURL('image/png');
                let slicedImage = document.createElement('img')
                slicedImage.src = imgSataString;
                let puzzle = document.getElementById('myPuzzle');
                puzzle.appendChild( slicedImage );
            }
        }
    }
    img.src = './img/images/doge1.gif';