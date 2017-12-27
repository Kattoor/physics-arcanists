const DrawEngine = {

    canvas: undefined,
    ctx: undefined,

    createCanvas: function(document) {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        return {width: this.canvas.width, height: this.canvas.height};
    },

    /* gameContext contains curvePoints, points and quadraticPullPoints */
    draw: function(gameContext) {
        this._drawBackground();
        this._drawTerrain(gameContext.curvePoints);
        this._drawBoundingPoints(gameContext.boundingPoints);
        this._drawQuadraticPullPoints(gameContext.quadraticPullPoints);
        this._drawIntervalPoints(gameContext.curvePoints);
        this._drawBall();
//        this._drawNormalVectors(gameContext.curvePoints);
        //this._drawFireBar();
    },

    _drawBackground: function() {
        this.ctx.fillStyle = "#0000FF";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    _drawTerrain: function(curvePoints) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
    curvePoints.slice(1, curvePoints.length).forEach(point => this.ctx.lineTo(point.x, point.y));
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.lineTo(curvePoints[0].x, curvePoints[0].y);
    this.ctx.closePath();
    this.ctx.fillStyle = "#123456";
    this.ctx.fill();
    },

    _drawBoundingPoints: function(boundingPoints) {
        this.ctx.fillStyle = "#000000";
        boundingPoints.forEach(point => this.ctx.fillRect(point.x - 5, point.y - 5, 10, 10));
    },

    _drawQuadraticPullPoints: function(quadraticPullPoints) {
        this.ctx.fillStyle = "#ffffff";
        quadraticPullPoints.forEach(pointInfo => this.ctx.fillRect(pointInfo.quadraticPullPoint.x, pointInfo.quadraticPullPoint.y, 10, 10));
    },

    _drawIntervalPoints: function(curvePoints) {
        this.ctx.fillStyle = "#61fe51";
        curvePoints.forEach(point => this.ctx.fillRect(point.x - 2, point.y - 2, 4, 4));
    },

    _drawBall: function() {
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(ball.x - ball.velocityX, ball.y - ball.velocityY);
        this.ctx.lineTo(ball.x + ball.velocityX, ball.y + ball.velocityY);
        this.ctx.strokeStyle = "#00FFFF";
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
    },

    _drawNormalVectors: function(curvePoints) {
        this.ctx.strokeStyle = "#654321";
        for (let i = 1; i < curvePoints.length; i++) {
            this.ctx.beginPath();
            const previousPoint = curvePoints[i - 1];
            const point = curvePoints[i];
            const slope = (point.y - previousPoint.y) / (point.x - previousPoint.x);
            const perpendicularSlope = -1 / slope;
            const midOfPoints = {
                x: Math.min(point.x, previousPoint.x) + Math.abs(point.x - previousPoint.x) / 2,
                y: Math.min(point.y, previousPoint.y) + Math.abs(point.y - previousPoint.y) / 2
            };
            const pt1 = {x: midOfPoints.x - 5, y: midOfPoints.y - perpendicularSlope * 5};
            const pt2 = {x: midOfPoints.x + 5, y: midOfPoints.y + perpendicularSlope * 5};
            this.ctx.moveTo(pt1.x, pt1.y);
            this.ctx.lineTo(pt2.x, pt2.y);
            this.ctx.stroke();
        }
    },

    /*_drawFireBar: function() {
        const distance = {x: this.mouseLocationNormalized.x - ball.x, y: this.mouseLocationNormalized.y - ball.y};
        const amount = 255.0;
        const interval = {x: distance.x / amount, y: distance.y / amount};
        for (let i = amount; i <= 1; i++) {
            const x = ball.x + interval.x * i;
            const y = ball.y + interval.y * i;
            ctx.fillStyle = '#FF' + i.toString(16) + '00';
            ctx.beginPath();
            ctx.arc(x, y, i / 15 + 10, 0, 2 * Math.PI);
            ctx.fill();
        }
    }*/
};
