const cards = document.querySelectorAll('.memory-car');
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
function flipCard(){
    if(lockBoard) return;
    if(this===firstCard){
    return;}
    this.classList.add('flip');
    if (!flippedCard){
        //first click
        flippedCard = true;
        firstCard = this;
        
        return;
    } else
    
    secondCard = this;
    
    checkMatch();
}
function checkMatch() {
    let isMatch = firstCard.dataset.option===secondCard.dataset.option;
    isMatch ? removeCard() : unflipCards();

}

function removeCard () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
    score++;
    if(score===5){
        const memoryGame = document.querySelector('.memory-game');
        memoryGame.style.backgroundColor = 'rgb(109 105 105)';
        memoryGame.textContent = "YOU WIN"
        const btn = document.createElement('button');
        btn.textContent = 'Play Again';
        memoryGame.appendChild(btn);
        btn.addEventListener('click',() => {
            window.location.reload();
        })
    }

}
function unflipCards() {
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
       resetBoard()
    },1000)
    
}
function resetBoard() {
    [flippedCard,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}
(function shuffle(){
    cards.forEach(card => {
        let ranPos = Math.floor(Math.random()*10);
        card.style.order = ranPos;
    })
})();







cards.forEach(card => card.addEventListener('click',flipCard));