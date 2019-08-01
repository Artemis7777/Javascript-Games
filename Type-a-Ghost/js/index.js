let gImg = document.querySelector('img');
let gAudio = document.querySelector('.play');
let gClick = document.querySelector('.click');
let listGhost = [];
gImg.onclick = function() {
    document.body.removeChild(gImg);
    gAudio.play();
    setInterval(function(){
        let g = new Ghost();
        g.fly();
        listGhost.push(g);
    },1000)
}
class Ghost {
    constructor() {
        let gDiv = document.createElement('div');
        gDiv.style.left = Math.random() * 1000 + 'px';
        gDiv.style.bottom = 0 + 'px';
        let gSpan = document.createElement('span');
        gSpan.innerText = Ghost.generateKey();
        gDiv.className = "ghost " +  gSpan.innerText ;
        gDiv.appendChild(gSpan);
        document.body.appendChild(gDiv);
        this.gDiv = gDiv;

    }
    bomb() {
        document.body.removeChild(this.gDiv);
        clearInterval(this.timer);
    }
    fly = () => {
        let offset = parseInt(this.gDiv.style.bottom);
        this.timer = setInterval(()=>{
            offset += 20;
            if(offset >= 1000) {
                this.bomb();
            }
            this.gDiv.style.bottom = offset + 'px';
        },100)
    }
    static generateKey(){
        let num = Math.floor(Math.random()* (90 - 65 + 1)) + 65;
        return String.fromCharCode(num)

    }

}

document.body.onkeydown = function(event){
    let gDiv = document.querySelector('.' + event.key.toUpperCase());

    let currentIndex = listGhost.findIndex(function(currentValue){

        return currentValue.gDiv === gDiv;
    })
    if (currentIndex === -1) return;

    let currentGhost = listGhost[currentIndex];
    gClick.play();
    currentGhost.bomb();



}




