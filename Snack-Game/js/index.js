class map {
    constructor() {
        let newDiv = document.createElement('div');
        newDiv.classList.add('map');
        document.body.appendChild(newDiv);
        this.oMap = newDiv;
    }
}

class snakeFood {

    constructor(width, height, img, map) {
        this.width = width;
        this.height = height;
        this.img = img;
        this.map = map;
        let style = getComputedStyle(this.map.oMap);
        let mapWidth = parseInt(style.width);
        let mapHeight = parseInt(style.height);
        this.colNum = mapWidth / this.width;
        this.rowNum = mapHeight / this.height;
    }

    render() {
        let sDiv = document.createElement('div');
        sDiv.style.width = this.width + 'px';
        sDiv.style.height = this.height + 'px';
        sDiv.style.background = `url(${this.img})`;
        let {x, y} = this.generateLocation();
        this.x = x;
        this.y = y;
        sDiv.style.position = 'absolute';
        sDiv.style.left = x * this.width + 'px';
        sDiv.style.top = y * this.height + 'px';
        this.map.oMap.appendChild(sDiv);
        this.oFood = sDiv;
    }

    remove() {
        this.oFood.parentNode.removeChild(this.oFood);

    }

    generateLocation() {
        let x = getRandomIntInclusive(0, this.colNum - 1);
        let y = getRandomIntInclusive(0, this.rowNum - 1);
        return {x: x, y: y};
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

class snake {
    constructor(obj) {
        obj = obj || {}
        this.width = obj.width || 100;
        this.height = obj.height || 100;
        this.headImg = obj.headImg || './images/head.png';
        this.bodyImg = obj.bodyImg || './images/body.png';
        this.map = obj.oMap || {};
        this.bodies = [
            {x: 2, y: 1, type: 1},
            {x: 1, y: 1, type: 0},
            {x: 0, y: 1, type: 0}
        ];


        window.addEventListener("keydown", (event) => {
            this.code = event.code;
        });

        let style = getComputedStyle(this.map.oMap);
        let mapWidth = parseInt(style.width);
        let mapHeight = parseInt(style.height);
        this.colNum = mapWidth / this.width;
        this.rowNum = mapHeight / this.height;
    }

    move() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.bodies[i].x = this.bodies[i - 1].x;
            this.bodies[i].y = this.bodies[i - 1].y;
        }

        let head = this.bodies[0];
        switch (this.code) {
            case "KeyA":
            case "ArrowLeft":
                head.x = head.x - 1;
                break;
            case "KeyW":
            case "ArrowUp":
                head.y = head.y - 1;
                break;
            case "KeyS":
            case "ArrowDown":
                head.y = head.y + 1;
                break;
            case "KeyD":
            case "ArrowRight":
                head.x = head.x + 1;
                break;
            default:
                head.x = head.x + 1;
                break;
        }

    }

    inspection(food) {
        let head = this.bodies[0];
        if (head.x < 0 || head.y < 0 || head.x >= this.colNum || head.y >= this.rowNum ) {
            gAudio.pause();
            gEnd.play();
            alert('game over');
            gEnd.pause();
            clearInterval(this.timer);
            return false;
        }





        let lastBody = this.bodies[this.bodies.length - 1];
        if (head.x === food.x && head.y === food.y) {
            gEat.play();
            food.remove();
            food.render();
            let newBody = {x: lastBody.x, y: lastBody.y, type: 0};
            switch (this.code) {
                case "KeyA":
                case "ArrowLeft":
                    newBody.x = newBody.x + 1;
                    break;
                case "KeyW":
                case "ArrowUp":
                    newBody.y = newBody.y + 1;
                    break;
                case "KeyS":
                case "ArrowDown":
                    newBody.y = newBody.y - 1;
                    break;
                case "KeyD":
                case "ArrowRight":
                    newBody.x = newBody.x - 1;
                    break;
                default:
                    newBody.x = newBody.x - 1;
                    break;
            }

            this.bodies.push(newBody);

        }
        return true;

    }

    update(food) {
        this.timer = setInterval(() => {
            this.move();
            let flag = this.inspection(food);
            if (!flag) {
                location.reload();
            }
            this.render();
        }, 300)

    }

    render() {
        let snakes = document.querySelectorAll('.snake');
        for (let i = snakes.length - 1; i >= 0; i--) {
            let oDiv = snakes[i];
            this.map.oMap.removeChild(oDiv);
        }
        for (let value of this.bodies) {
            let oDiv = document.createElement('div');
            oDiv.style.width = this.width + 'px';
            oDiv.style.height = this.height + 'px';
            oDiv.className = 'snake';
            if (value.type === 1) {
                oDiv.style.background = `url(${this.headImg})`;
            } else {
                oDiv.style.background = `url(${this.bodyImg})`;
            }
            oDiv.style.position = 'absolute';
            oDiv.style.left = value.x * this.width + 'px';
            oDiv.style.top = value.y * this.height + 'px';
            this.map.oMap.appendChild(oDiv);
        }
    }


}