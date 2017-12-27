function PhysicsEngine() {

    let gravityObjects = [];

    function addGravityObject(obj) {
        gravityObjects.push(obj);
    }

    function startGravity(ball, curvePoints) {
        let buffer = [];
        let isBuffered = false;

        setInterval(() => {
            /* Reduce amount of falls the ball has left */
            if (ball.fallsLeft > 0) {
                ball.x += ball.velocityX;
                if (ball.velocityY === 0)
                    ball.velocityY = 1.0;
                else
                    ball.velocityY += 1;
                ball.y += ball.velocityY;
            }

            let collisionLines = [];
            for (let i = 0; i < collisionPoints.length; i++) {

            }

            let collisionPoints = [];
            curvePoints.forEach(point => {
                const pointToPointDist = (pt1, pt2) => Math.sqrt(Math.pow(Math.abs(pt1.x - pt2.x), 2) + Math.pow(Math.abs(pt1.y - pt2.y), 2));
                if (pointToPointDist(point, {x: ball.x, y: ball.y}) <= ball.size)
                    collisionPoints.push(point);
            });

            if (isBuffered || collisionPoints.length > 1) {
                isBuffered = false;
                buffer = [];
                isBuffered = false;
                //ball.velocityY = -25;
                const first = collisionPoints[0];
                const last = collisionPoints[collisionPoints.length - 1];
                const perpendicularSlope = (last.y - first.y) / (last.x - first.x);
                // console.log(perpendicularSlope);
                //  const perpendicularSlope = -1 / slope;


                const dotProduct = (v1, v2) => (v1.x * v2.x) + (v1.y * v2.y);
                const magnitude = v => Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
                const normalize = v => ({x: v.x / magnitude(v), y: v.y / magnitude(v)});
                const subtract = (v1, v2) => ({x: v1.x - v2.x, y: v1.y - v2.y});
                const multiply = (v1, v2) => ({x: v1.x * v2.x, y: v1.y * v2.y});
                const scale = (s, v) => ({x: v.x * s, y: v.y * s});

                const perpendicularSlopeVector = normalize({x: perpendicularSlope, y: 1});

                //r = d - 2(d.n)n
                //C = A - (2 * B * (A dot B)) where A is original vector, B the mirror, C result.
                //r = d - 2 * n * (d dot n))

                const ballRicoVector = {x: ball.velocityX, y: ball.velocityY};
                //qconst mirrorVector = subtract(ballRicoVector, scale(2 * dotProduct(ballRicoVector, perpendicularSlopeVector), perpendicularSlopeVector));
                //const mirrorVector = subtract(ballRicoVector, scale(dotProduct(ballRicoVector, perpendicularSlopeVector), scale(2, perpendicularSlopeVector)));
                const mirrorVector = scale(dotProduct(ballRicoVector, normalize(perpendicularSlopeVector)), normalize(perpendicularSlopeVector));

                ball.velocityX = mirrorVector.x;

                if (ball.fallsLeft > 0)
                    ball.velocityY = -25 * (--ball.fallsLeft / ball.totalFalls);
            } else if (collisionPoints.length === 1) {
                console.log("DID DONE DO IT")
                collisionPoints.forEach(point => buffer.push(point));
                isBuffered = true;
            }


        }, 1000 / 30);
    }
}
