class canvasClass {
    constructor (id,text,cover,coverType,width,height,drawPercentCallback) {
        this.conId = id; /*canvasID */
        this.conNode = document.getElementById(this.conId);
        this.ctx = this.conNode.getContext('2d');
        this.coverText = text;
        this.cover = cover; /**图层颜色或图片 */
        this.coverType = coverType; /**图层类型（image/color） */
        this.width = width;
        this.height = height;
        this.drawPercentCallback = drawPercentCallback
        this.clientRect = null;
        this.isMouseDown = false;
    }
    /**
     * 绘制canvas
     */
    fillCanvas () {
        this.conNode.setAttribute('width', this.width);
        this.conNode.setAttribute('height', this.height);
        if (this.coverType == 'color') {
            this.ctx.save();
            this.ctx.fillStyle = this.cover;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.restore();
            this.ctx.save();
            var fontSize = 30;
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(this.coverText, this.width/2, this.height/2+fontSize/2);
            this.ctx.restore();
            this.ctx.globalCompositeOperation = 'destination-out';
        } else if (this.coverType == 'image') {
            var image = new Image(this.width, this.height)
            image.onload = () => {
                this.ctx.drawImage(image, 0, 0, this.width, this.height);
            }
            image.src = this.cover;
        }
        this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null
    }
    /**
     * 事件监听
     */
    bindEvent () {
        /**移动端检测 */
        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        var clickEvt = device ? 'touchstart' : 'mousedown';
        var moveEvt = device ? 'touchmove' : 'mousemove';
        var x1,y1,x2,y2;
        
        if (!device) {
            document.addEventListener('mouseup', (e) => {
                this.isMouseDown = false;
            })
        } else {
            document.addEventListener("touchmove", (e) => {
                if (this.isMouseDown) {
                    e.preventDefault();
                }
            })
            document.addEventListener("touchend", (e) => {
                this.isMouseDown = false;
            })
        }
        /**添加监听 */
        this.conNode.addEventListener(clickEvt, (e) => {
            this.isMouseDown = true;
            x1 = device ? e.touches[0].offsetX : e.offsetX;
            y1 = device ? e.touches[0].offsetY : e.offsetY;
            this.drawPoint(x1, y1)
        })
        this.conNode.addEventListener(moveEvt, (e) => {
            if (!device && !this.isMouseDown) {
                return false;
            }
            this.isMouseDown = true;
            x2 = device ? e.touches[0].offsetX : e.offsetX;
            y2 = device ? e.touches[0].offsetY : e.offsetY;
            this.drawPoint(x1, y1, x2, y2)
            // console.log(x1,x2,y1,y2)
            x1 = x2
            y1 = y2
            // [x1, y1] = [x2, y2]
        })
    }
    /**
     * 抹去， 返回百分比
     */
    drawPoint (x1, y1, x2, y2) {
        var bar = 20; // 半径
        this.ctx.beginPath();
        if (x2) {
            /**
             * 优化绘制路径
             */
            var asin = bar*Math.sin(Math.atan((y2-y1)/(x2-x1)));
            var acos = bar*Math.cos(Math.atan((y2-y1)/(x2-x1)))
            var x3 = x1+asin;
            var y3 = y1-acos;
            var x4 = x1-asin;
            var y4 = y1+acos;
            var x5 = x2+asin;
            var y5 = y2-acos;
            var x6 = x2-asin;
            var y6 = y2+acos;
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(x3,y3);
            this.ctx.lineTo(x5,y5);
            this.ctx.lineTo(x6,y6);
            this.ctx.lineTo(x4,y4);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ctx.restore();
            this.ctx.arc(x2, y2, bar, 0, Math.PI*2, true);
        } else {
            this.ctx.arc(x1, y1, bar, 0, Math.PI*2, true);
        }
        this.ctx.fill();
        if (this.drawPercentCallback) {
            this.drawPercentCallback(this.getTransparentPercent());
        }
    }

    getTransparentPercent () {
        var imgData = this.ctx.getImageData(0, 0, this.width, this.height),
            pixles = imgData.data,
            transPixs = [];
        for (var i = 0, j = pixles.length; i < j; i += 4) {
            var a = pixles[i + 3];
            if (a < 128) {
                transPixs.push(i);
            }
        }
        return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
    }

}

function canvasInit(json) {
    var arr = []
    for (let item in json) {
        arr.push(json[item])
    }
    this.init = new canvasClass(...arr)
    this.init.fillCanvas()
    this.init.bindEvent()

    var btn = document.querySelector('#freshBtn');
    btn.addEventListener('click', (e) => {
        this.init.fillCanvas()
    });

}

canvasInit.prototype.fresh = function () {
    console.log(this.init)
    this.init.fillCanvas()
    this.init.isMouseDown = false
}
