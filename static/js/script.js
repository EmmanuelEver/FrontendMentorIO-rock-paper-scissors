let rules_toggler = document.querySelector(".rules__button button");
let rules_modal = document.querySelector(".modal");
let modal_close_icon = document.querySelector(".modal__header img");
let backdrop = document.querySelector(".backdrop");
let score_text = document.querySelector("#game-score");
let game_pick = document.querySelector(".game__pick");
let game_results = document.querySelector(".game__results")
let game_result = document.querySelector(".game__results__winner")
let game_result_text = game_result.children[0]
let player_chip = document.querySelector(".game__results__player .chip")
let opponent_chip = document.querySelector(".game__results__opponent").children[1]
let player_chip_inner = player_chip.children[0]
let player_chip_image = player_chip_inner.children[0]

const choice = ["rock", "paper", "scissors"];
let player_picked;
let p1 = null;
let p2 = null;
let score = 0;

const fetchScore = () => {
	let savedScore = localStorage.getItem("score");
	score = parseInt(savedScore);
	score_text.innerHTML = score;
}


localStorage.getItem("score") ? fetchScore() : console.log("no score")


/*functions for the rules modal*/
rules_toggler.addEventListener("click", (e) => {
	rules_modal.classList.contains("show") ? hide_rules_modal() : show_rules_modal()
})
backdrop.addEventListener("click", () => hide_rules_modal() )
modal_close_icon.addEventListener("click", () => hide_rules_modal() )

const show_rules_modal = () => {
	rules_modal.classList.add("show");
	backdrop.style.display = "block";
}

const hide_rules_modal = () => {
	rules_modal.classList.remove("show");
	backdrop.style.display = "none";
}




const playAgain = () => {
	opponent_chip.className = "blankChip"
	game_pick.classList.remove("game__pick--hide");
	game_results.classList.remove("show-results");
	game_result.style.display = "none";
	player_chip.classList.remove(player_picked);
	game_result.style.opacity = "0";
	opponent_chip.children[0] && opponent_chip.removeChild(opponent_chip.children[0])
	player_chip_inner.classList.remove("animate--chip");
	opponent_chip.children[0]?.classList.remove("animate--chip");
}

const pickWinner = (p1, p2) => {
	let winner = null
	if(Math.floor(((p1 + 2) % 3)) === p2){
		winner = 1;
	}
	else if(p1 === p2){
		winner = 0;
	}
	else{
		winner = -1;
	}
	return winner
}

const showWinner = (winner, p2) => {
	if(winner === 1){
		score++;
		localStorage.setItem("score", score);
		game_result_text.innerHTML = "YOU WIN";
		score_text.innerHTML = score;
		
	}
	else if(winner === 0){
		game_result_text.innerHTML = "IT'S A TIE";
	}
	else{
		game_result_text.innerHTML = "YOU LOSE";
		console.log(opponent_chip)
	}
	setTimeout(() => {
		game_result.style.display = "flex";
		opponentChip(p2);
		winner === 1 && player_chip_inner.classList.add("animate--chip");
		winner === -1 && opponent_chip.children[0].classList.add("animate--chip");
	},1000)
	
	setTimeout(() => {
		game_result.style.opacity = "1";
	},1500);
}

const opponentChip = (opponent_picked) => {
	opponent_chip.className = ` chip ${choice[opponent_picked]}`;
	let opponent_chip_inner = document.createElement("div");
	let imgTag = document.createElement("img");
	opponent_chip_inner.className = "chip__inner"
	imgTag.setAttribute("src", `./images/icon-${choice[opponent_picked]}.svg`)
	opponent_chip_inner.appendChild(imgTag);
	opponent_chip.appendChild(opponent_chip_inner);
}

const play =(e) => {
	player_picked = e.getAttribute("data-choice");
	game_pick.classList.add("game__pick--hide")
	game_results.classList.add("show-results")
	player_chip_image.setAttribute("src", `./images/icon-${player_picked}.svg`)
	player_chip.classList.add(player_picked)
	player_chip.style.left = "0"
	p1 = choice.indexOf(player_picked);
	p2 = Math.floor(Math.random() * 3);
	let winner = pickWinner(p1, p2);
	showWinner(winner, p2);
}
