document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.querySelector(".gameContainer");
  const gameBlocks = document.querySelector(".item");
  const startButton = document.querySelector(".startGame");
  let flippedCards = 0;
  let card1 = null;
  let card2 = null;
  const colors = [
    "red",
    "red",
    "green",
    "green",
    "purple",
    "purple",
    "blue",
    "blue",
    "orange",
    "orange",
  ];

  //Function to shuffle colors within the array
  function shuffledArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const currentColor = Math.floor(Math.random() * (i + 1));
      [array[i], array[currentColor]] = [array[currentColor], array[i]];
    }
    return array;
  }

  //Create divs according to the given shuffledArray colors
  function createDivs(colorArray) {
    for (let colors of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("item", colors);
      gameContainer.append(newDiv);
    }
  }

  function resetCards() {
    card1.style.backgroundColor = "rgba(255, 255, 255,0.8)";
    card2.style.backgroundColor = "rgba(255, 255, 255,0.8)";
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1 = null;
    card2 = null;
  }

  function matchedCards() {
    card1.removeEventListener("click", gameContainer);
    card2.removeEventListener("click", gameContainer);
    card1 = null;
    card2 = null;
    if (flippedCards === colors.length) {
      alert("You did it!");
    }
  }

  startButton.onclick = (e) => {
    if (e.target.tagName === "BUTTON") {
      createDivs(shuffledArray(colors));
      clickCard(resetCards);
    }
  };

  function clickCard() {
    gameContainer.onclick = (e) => {
      const currentCard = e.target;
      currentCard.style.backgroundColor = currentCard.classList[1];

      //Check if either card1 OR card2 is null (empty). If so, continue.
      if (!card1 || !card2) {
        currentCard.classList.add("flipped");
        //If card1 is empty (null), set it equal to currentCard -> first click
        if (!card1) {
          card1 = currentCard;
        }
        //card1 is already set -> compare to the next click, if it's not the same, set card2
        else if (card1 !== currentCard) {
          card2 = currentCard;

          //If both card colors are equal, add 2 to flippedCards counter and remove click events
          if (card1.className === card2.className) {
            flippedCards += 2;
            matchedCards();
            console.log(flippedCards);
          }
          //Cards don't match? Flip them back
          else {
            setTimeout(() => {
              resetCards();
            }, 1000);
          }
        }
      }
    };
  }
});
