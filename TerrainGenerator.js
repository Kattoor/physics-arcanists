const TerrainGenerator = {

    generatedBoundingPoints: 5,
    pointsInBetweenBoundingPoints: 100,

    boundingPoints: undefined,
    quadraticPullPoints: undefined,
    curvePoints: undefined,

    generate: function(canvasDimensions) {
        this.generatedBoundingPoints = 5;
        this.pointsInBetweenBoundingPoints = 100;
        this._calculateBoundingPoints(canvasDimensions);
        this._calculateQuadraticPullPoints();
        this._calculateAllPointsOnCurve();
        return this;
    },

    /* Generate five random points (= bounding points) */
    _calculateBoundingPoints: function(canvasDimensions) {
        this.boundingPoints = [...new Array(this.generatedBoundingPoints).keys()].map(i => ({
            x: canvasDimensions.width / (this.generatedBoundingPoints - 1) * i,
            y: (canvasDimensions.height - 500) + Math.random() * 100
        }));
    },

    /* Generate a list of 4 quadratic pull points accompanied by their bounding points */
    _calculateQuadraticPullPoints: function() {
        this.quadraticPullPoints = this.boundingPoints.slice(1, this.boundingPoints.length).map((point, index) => ({
            points: [this.boundingPoints[index], point],
            quadraticPullPoint: {
                x: Math.min(point.x, this.boundingPoints[index].x) + Math.abs(point.x - this.boundingPoints[index].x) / 2 + Math.random() * 500 - 250,
                y: Math.min(point.y, this.boundingPoints[index].y) + Math.abs(point.y - this.boundingPoints[index].y) / 2 + Math.random() * 750 - 250
            }
        }));
    },

    /* Generate all points on curve based on the quadratic pull points, their bounding points and a parameter which defines the amount of points between the bounding points */
    _calculateAllPointsOnCurve: function() {
        this.curvePoints = [].concat(...this.quadraticPullPoints.map(pointInfo => [...new Array(this.pointsInBetweenBoundingPoints).keys()].map(i => ({
            x: (1 - (i / this.pointsInBetweenBoundingPoints)) * ((1 - (i / this.pointsInBetweenBoundingPoints)) * pointInfo.points[0].x + ((i / this.pointsInBetweenBoundingPoints) * pointInfo.quadraticPullPoint.x)) + (i / this.pointsInBetweenBoundingPoints) * (((1 - (i / this.pointsInBetweenBoundingPoints)) * pointInfo.quadraticPullPoint.x + ((i / this.pointsInBetweenBoundingPoints) * pointInfo.points[1].x))),
            y: (1 - (i / this.pointsInBetweenBoundingPoints)) * ((1 - (i / this.pointsInBetweenBoundingPoints)) * pointInfo.points[0].y + ((i / this.pointsInBetweenBoundingPoints) * pointInfo.quadraticPullPoint.y)) + (i / this.pointsInBetweenBoundingPoints) * (((1 - (i / this.pointsInBetweenBoundingPoints)) * pointInfo.quadraticPullPoint.y + ((i / this.pointsInBetweenBoundingPoints) * pointInfo.points[1].y)))
        }))).concat(this.boundingPoints[this.boundingPoints.length - 1]));
    },



      /*  function _calculateNormalVectors() {
            const lines = [];
            for (let i = 1; i < curvePoints.length; i++) {
                const previousPoint = curvePoints[i - 1];
                const point = curvePoints[i];

                /!*const line = {x: point.x - previousPoint.x, y: point.y - previousPoint.y};
                const leftNormal = {x: -(line.y - previousPoint.y) + previousPoint.x, y: (line.x - previousPoint.x) + previousPoint.y};
                const normalizeVector = vector => {
                    const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
                    return {x: vector.x / length, y: vector.y / length};
                };
                const dotProduct = (v1, v2) => v1.x * v2.x + v1.y * v2.y;
                const length = dotProduct(line, normalizeVector(leftNormal));*!/

                const slope = (point.y - previousPoint.y) / (point.x - previousPoint.x);
                let perpendicularSlope = -1 / slope;

                //0 = m(x-x1) + y1 - y
                //y = m(x-x1) + y1
                //y = mx + b
                //0 = mx + b - y

                //const formula = x => slope * (x - ball.x) + ball.y;
                //slope * (x - ball.x) + ball.y - y




                /!*const slope = (point.y - previousPoint.y) / (point.x - previousPoint.x);
                const perpendicularSlope = -1 / slope;
                const midOfPoints = {
                    x: Math.min(point.x, previousPoint.x) + Math.abs(point.x - previousPoint.x) / 2,
                    y: Math.min(point.y, previousPoint.y) + Math.abs(point.y - previousPoint.y) / 2
                };
                const pt1 = {x: midOfPoints.x - 5, y: midOfPoints.y - perpendicularSlope * 5};
                const pt2 = {x: midOfPoints.x + 5, y: midOfPoints.y + perpendicularSlope * 5};
                lines.push({
                    point1: {x: previousPoint.x, y: previousPoint.y},
                    point2: {x: point.x, y: point.y},q
                });
                ctx.moveTo(pt1.x, pt1.y);
                ctx.lineTo(pt2.x, pt2.y);*!/
            }
        }*/



    /* for (let i = 1; i < curvePoints.length; i++) {
         ctx.beginPath();
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
         ctx.moveTo(pt1.x, pt1.y);
         ctx.lineTo(pt2.x, pt2.y);
         ctx.stroke();
     }*/
};
