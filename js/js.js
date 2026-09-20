const games = [
    ['15 Puzzle', 'Arrange the tiles and restore order.', 'puzzle', '▦'], ['Epsilon Memory', 'Remember the sequence. Forget nothing.', 'puzzle', '◈'], ['Cipher Wheel', 'Decode the message before time dissolves.', 'puzzle', '◎'], ['The Maze', 'Find the path hidden in plain sight.', 'puzzle', '⌁'], ['Pattern Breaker', 'See the shape behind the noise.', 'puzzle', '◇'], ['Word Oracle', 'The right word is already inside you.', 'puzzle', 'Aa'], ['Neon Runner', 'React quickly. The world will not wait.', 'action', '↯'], ['Signal Catcher', 'Catch the falling signal.', 'action', '⌁'], ['Orbit', 'Keep your satellite in the light.', 'action', '◌'], ['Reflex Test', 'How fast can you answer?', 'action', '◉'], ['Asteroid Field', 'Pilot through the quiet dark.', 'action', '✦'], ['Gridlock', 'Move with intention, never panic.', 'action', '⊞'], ['Solitaire', 'A classic test of patience.', 'classic', '♠'], ['Minesweeper', 'Every square contains a possibility.', 'classic', '✹'], ['Snake', 'Grow without touching your past.', 'classic', '∿'], ['Tic Tac Toe', 'Two minds. Nine squares.', 'classic', '×'], ['Breakout', 'Return the ball to sender.', 'classic', '▰'], ['Hangman', 'A word is worth a thousand guesses.', 'classic', 'Α'], ['Connect Four', 'Align your thinking.', 'classic', '●']
];
const extraGameNames = ['Velvet Vice', 'Golden Hour', 'Night Drive', 'Blacktop', 'The Vault', 'High Society', 'After Hours', 'Rare Form', 'Crown Point', 'Blue Hour', 'First Class', 'The Exchange', 'Silk Road', 'Diamond Run', 'Old Money', 'New Money', 'The Penthouse', 'Marble Hall', 'Sunset Strip', 'Royal Flush', 'The Ledger', 'Fine Print', 'Luxe Lines', 'Champagne Logic', 'The Gallery', 'Private Club', 'Satin Signal', 'Grand Prix', 'The Heist', 'Lucky Seven', 'Executive', 'House Rules', 'Golden Ratio', 'Quiet Luxury', 'The Standard', 'Night School', 'Fast Lane', 'The Lookout', 'High Roller', 'The Establishment', 'Moonlight', 'The Getaway', 'Black Label', 'Silver Screen', 'The Insider', 'Palm Royale', 'The Riviera', 'Cashmere', 'The Runway', 'Midnight Club', 'The Blueprint', 'Velour', 'Top Shelf', 'The Social', 'Platinum', 'The Suite', 'Afterglow', 'The Fixer', 'Main Character', 'The Long Game', 'Fortune', 'The Pentagram', 'Rare Air', 'The Prospect', 'House of Cards', 'The Ambassador', 'Monogram', 'Nocturne', 'The Grandstand', 'Electric Avenue', 'The Resident', 'Apex', 'The Director', 'Private Eye', 'The Mogul', 'High Stakes', 'The Operator', 'Golden State', 'The Final Word', 'The Inner Circle', 'Last Light'];
games[4] = ['Akinator', 'Think of almost anything. I will ask until I can guess it.', 'puzzle', '?'];
const extraCategories = ['puzzle', 'action', 'classic'];
extraGameNames.forEach((name, index) => games.push([name, `A premium test of ${extraCategories[index % extraCategories.length] === 'puzzle' ? 'memory and logic' : extraCategories[index % extraCategories.length] === 'action' ? 'timing and nerve' : 'patience and instinct'}.`, extraCategories[index % extraCategories.length], ['✦', '◇', '◈', '◆'][index % 4]]));
const newGameSet = [
    ['Neon Chess', 'Command a glowing board and outthink the opposition.', 'strategy', '♞'],
    ['Pocket Tycoon', 'Build a tiny empire from one brilliant decision.', 'strategy', '⌂'],
    ['Rocket League', 'Thread the shot through a field of moving targets.', 'action', '🚀'],
    ['Color Flood', 'Turn the whole board into one perfect color.', 'puzzle', '◍'],
    ['Wordsmith', 'Forge the highest-scoring word from the letters given.', 'puzzle', 'W'],
    ['Tower Defense', 'Place your guardians before the night arrives.', 'strategy', '♜'],
    ['Pixel Painter', 'Recreate the hidden pattern one square at a time.', 'puzzle', '▦'],
    ['Drift King', 'Hold the corner and keep your line immaculate.', 'action', '↗'],
    ['Trivia Royale', 'Five questions stand between you and the crown.', 'classic', '?'],
    ['Fishing Hole', 'Wait for the glimmer, then strike at the right moment.', 'action', '⌁'],
    ['Dungeon Dice', 'Roll wisely and survive three rooms of chance.', 'classic', '⚄'],
    ['Garden Match', 'Pair the rarest flowers before the season ends.', 'puzzle', '❀'],
    ['Rail Switch', 'Route every train without creating a collision.', 'strategy', '╋'],
    ['Beat Drop', 'Tap the rhythm and keep the room alive.', 'action', '♫'],
    ['Treasure Map', 'Read the clues and choose the honest path.', 'puzzle', '✧'],
    ['Cafe Rush', 'Serve every order before the tables lose patience.', 'action', '☕'],
    ['Paper Planes', 'Fold the perfect flight and beat the distance record.', 'classic', '✈'],
    ['Island Builder', 'Balance resources, shelter, and one wild ambition.', 'strategy', '⌂'],
    ['Lockpick', 'Feel the pins and open the safe without forcing it.', 'puzzle', '⚿'],
    ['Number Oracle', 'Read the signal and find the hidden number.', 'puzzle', '#'],
    ['Star Captain', 'Lead your crew through one last impossible jump.', 'action', '★']
];
newGameSet.forEach((game) => games.push(game));
const size = 4;
const totalTiles = size * size;
let board = [];
let gameStarted = false;
let gameSolved = false;
let currentGame = '';
let miniProgress = 0;
let gardenCards = [];
let gardenFlipped = [];
let gardenMatched = 0;
let akinatorCandidates = [];
let akinatorAsked = [];
let akinatorQuestion = null;
let modeTimer;
const statusEl = document.getElementById('statusText');
const gridEl = document.getElementById('gameGrid');
const modalEl = document.getElementById('gameModal');
const modalGameEl = document.getElementById('modalGame');
const modalTitleEl = document.getElementById('modalTitle');
const modalDescriptionEl = document.getElementById('modalDescription');
const startBtn = document.getElementById('startBtn');
const doneBtn = document.getElementById('doneBtn');
const searchEl = document.getElementById('gameSearch');
const emptyStateEl = document.getElementById('emptyState');
const arcadeMusic = document.getElementById('arcadeMusic');
const crisVoice = document.getElementById('crisVoice');
const crisSpeaker = document.getElementById('crisSpeaker');

function solvedBoard() { return Array.from({ length: totalTiles }, (_, index) => (index + 1) % totalTiles); }
function neighbors(index) {
    const row = Math.floor(index / size); const column = index % size; const result = [];
    if (row > 0) result.push(index - size); if (row < size - 1) result.push(index + size); if (column > 0) result.push(index - 1); if (column < size - 1) result.push(index + 1);
    return result;
}
function shuffleBoard() {
    board = solvedBoard(); let emptyIndex = totalTiles - 1;
    for (let move = 0; move < 200; move += 1) { const candidate = neighbors(emptyIndex)[Math.floor(Math.random() * neighbors(emptyIndex).length)]; [board[emptyIndex], board[candidate]] = [board[candidate], board[emptyIndex]]; emptyIndex = candidate; }
    if (isSolved()) shuffleBoard();
}
function isSolved() { return board.every((value, index) => value === (index + 1) % totalTiles); }
function renderPuzzle() {
    modalGameEl.innerHTML = ''; const puzzle = document.createElement('div'); puzzle.className = 'puzzle';
    board.forEach((value, index) => { const tile = document.createElement('div'); tile.className = value === 0 ? 'tile empty' : 'tile'; tile.textContent = value || ''; if (value) tile.addEventListener('click', () => moveTile(index)); puzzle.appendChild(tile); });
    modalGameEl.appendChild(puzzle); doneBtn.hidden = !gameStarted || gameSolved;
}
function moveTile(index) {
    const emptyIndex = board.indexOf(0); if (!gameStarted || gameSolved || !neighbors(emptyIndex).includes(index)) return;
    [board[index], board[emptyIndex]] = [board[emptyIndex], board[index]]; renderPuzzle();
    if (isSolved()) { gameSolved = true; statusEl.textContent = 'You solved the puzzle. Your identity is provisionally intact.'; doneBtn.hidden = true; }
}
function startGame() { gameStarted = true; gameSolved = false; shuffleBoard(); renderPuzzle(); statusEl.textContent = 'Arrange the tiles from 1 to 15.'; startBtn.textContent = 'Restart test'; }
function finishGame() { if (!gameStarted) return; statusEl.textContent = isSolved() ? 'You solved the puzzle.' : 'Not finished. The pattern remains incomplete.'; }
function beginMiniGame() {
    gameStarted = true; miniProgress = 0; startBtn.textContent = 'Restart test'; doneBtn.hidden = true;
    if (currentGame === '15 Puzzle') { startGame(); return; }
    if (currentGame === 'Akinator') { startAkinator(); return; }
    renderMiniGame();
}
function passMiniGame(message = 'Test complete. Your result has been recorded.') {
    miniProgress = 5; statusEl.textContent = message; startBtn.textContent = 'Play again';
}
function renderMiniGame() {
    modalGameEl.innerHTML = '';
    if (currentGame === 'Akinator') { renderAkinator(); return; }
    const miniGame = document.createElement('div'); miniGame.className = 'mini-game';
    if (currentGame.trim().toLowerCase() === 'garden match') {
        const flowers = ['✿', '❀', '✾', '✽', '⚘', '❁', '✤', '✥']; gardenCards = [...flowers, ...flowers].sort(() => Math.random() - 0.5); gardenFlipped = []; gardenMatched = 0;
        miniGame.innerHTML = '<p class="mini-instruction">Find every matching flower pair.</p><div class="garden-grid"></div>';
        const gardenGrid = miniGame.querySelector('.garden-grid');
        gardenCards.forEach((flower, index) => { const card = document.createElement('button'); card.className = 'garden-card'; card.textContent = '?'; card.setAttribute('aria-label', 'Hidden flower'); card.addEventListener('click', () => flipGardenCard(card, index)); gardenGrid.appendChild(card); });
    } else if (currentGame === 'Epsilon Memory') {
        const target = ['ε', '7', '∿', '3']; miniGame.innerHTML = `<p class="mini-instruction">Repeat the sequence: <strong>${target.join('  ')}</strong></p><div class="mini-grid"></div>`;
        const miniGrid = miniGame.querySelector('.mini-grid'); ['ε', '7', '∿', '3', '◇', '9'].forEach((value) => { const button = document.createElement('button'); button.className = 'mini-choice'; button.textContent = value; button.addEventListener('click', () => { if (value === target[miniProgress]) { miniProgress += 1; statusEl.textContent = miniProgress === target.length ? 'Sequence restored. Test complete.' : 'Correct. Continue.'; if (miniProgress === target.length) startBtn.textContent = 'Play again'; } else { miniProgress = 0; statusEl.textContent = 'Sequence lost. Begin again.'; } }); miniGrid.appendChild(button); });
    } else if (currentGame === 'Cipher Wheel' || currentGame === 'Word Oracle' || currentGame === 'Hangman') {
        const answer = currentGame === 'Cipher Wheel' ? 'EPSILON' : currentGame === 'Hangman' ? 'PROGRAM' : 'IDENTITY'; miniGame.innerHTML = `<p class="mini-instruction">Enter the hidden word.</p><input class="mini-input" id="miniInput" autocomplete="off" placeholder="Your answer"><button class="challenge-button" id="checkAnswer">Check answer</button>`;
        miniGame.querySelector('#checkAnswer').addEventListener('click', () => { if (miniGame.querySelector('#miniInput').value.trim().toUpperCase() === answer) passMiniGame('Correct. The hidden word yields to you.'); else statusEl.textContent = 'That answer is not accepted. Try again.'; });
    } else if (currentGame === 'The Maze') {
        const path = [0, 1, 2, 5, 8]; miniGame.innerHTML = '<p class="mini-instruction">Find the exit by following the signal.</p><div class="maze-grid"></div>'; const maze = miniGame.querySelector('.maze-grid');
        for (let index = 0; index < 9; index += 1) { const button = document.createElement('button'); button.className = 'maze-cell'; button.textContent = index === 0 ? 'ε' : index === 8 ? '出口' : ''; button.addEventListener('click', () => { if (index === path[miniProgress]) { miniProgress += 1; button.classList.add('visited'); if (miniProgress === path.length) passMiniGame('Exit found. The maze was inside you.'); } else { miniProgress = 0; maze.querySelectorAll('.visited').forEach((cell) => cell.classList.remove('visited')); statusEl.textContent = 'Dead end. The signal resets.'; } }); maze.appendChild(button); }
    } else if (currentGame === 'Number Oracle') {
        const secretNumber = Math.floor(Math.random() * 20) + 1;
        let attempts = 0;
        miniGame.innerHTML = '<p class="mini-instruction">Guess the hidden number from 1 to 20. You have five attempts.</p><input class="mini-input" id="numberGuess" type="number" min="1" max="20" inputmode="numeric" placeholder="1 to 20"><button class="challenge-button" id="checkNumber">Read the signal</button>';
        const guessInput = miniGame.querySelector('#numberGuess');
        miniGame.querySelector('#checkNumber').addEventListener('click', () => {
            const guess = Number(guessInput.value);
            if (!Number.isInteger(guess) || guess < 1 || guess > 20) { statusEl.textContent = 'Enter a whole number from 1 to 20.'; return; }
            attempts += 1;
            if (guess === secretNumber) { passMiniGame(`The oracle was right. ${secretNumber} was the number.`); return; }
            if (attempts >= 5) { statusEl.textContent = `The signal fades. The number was ${secretNumber}.`; startBtn.textContent = 'Try again'; return; }
            statusEl.textContent = `${guess < secretNumber ? 'Higher' : 'Lower'}. ${5 - attempts} attempts remain.`;
            guessInput.select();
        });
    } else {
        const mode = games.findIndex((game) => game[0] === currentGame) % 3;
        if (mode === 0) {
            miniGame.innerHTML = '<p class="mini-instruction">Tap the pulse five times to complete the test.</p><button class="challenge-button signal-button">TAP PULSE</button><div class="progress-meter"><span></span></div>';
            miniGame.querySelector('.signal-button').addEventListener('click', () => { miniProgress += 1; miniGame.querySelector('.progress-meter span').style.width = `${Math.min(miniProgress * 20, 100)}%`; statusEl.textContent = `${Math.min(miniProgress, 5)} of 5 pulses captured.`; if (miniProgress >= 5) passMiniGame(); });
        } else if (mode === 1) {
            miniGame.innerHTML = '<p class="mini-instruction">Press LOCK only while the field is lit.</p><button class="challenge-button timing-button">WAIT</button><div class="progress-meter"><span></span></div>';
            const timingButton = miniGame.querySelector('.timing-button');
            modeTimer = setInterval(() => { timingButton.classList.toggle('ready'); timingButton.textContent = timingButton.classList.contains('ready') ? 'LOCK NOW' : 'WAIT'; }, 650);
            timingButton.addEventListener('click', () => { if (!timingButton.classList.contains('ready')) { statusEl.textContent = 'Too early. Watch the field.'; return; } miniProgress += 1; timingButton.classList.remove('ready'); timingButton.textContent = 'WAIT'; miniGame.querySelector('.progress-meter span').style.width = `${Math.min(miniProgress * 20, 100)}%`; statusEl.textContent = `${Math.min(miniProgress, 5)} of 5 locks secured.`; if (miniProgress >= 5) { clearInterval(modeTimer); passMiniGame('Perfect timing. The lock is yours.'); } });
        } else {
            let correctChoice = Math.floor(Math.random() * 3); miniGame.innerHTML = '<p class="mini-instruction">Choose the symbol that does not belong.</p><div class="mode-grid"></div><div class="progress-meter"><span></span></div>';
            const choiceGrid = miniGame.querySelector('.mode-grid');
            const renderChoices = () => { choiceGrid.innerHTML = ''; ['◆', '○', '△'].forEach((symbol, index) => { const choice = document.createElement('button'); choice.className = 'choice-button'; choice.textContent = symbol; choice.addEventListener('click', () => { if (index !== correctChoice) { miniProgress = 0; statusEl.textContent = 'Incorrect symbol. The sequence resets.'; return; } miniProgress += 1; miniGame.querySelector('.progress-meter span').style.width = `${Math.min(miniProgress * 20, 100)}%`; if (miniProgress >= 5) passMiniGame('Five decisions made. Your instinct is sharp.'); else { correctChoice = Math.floor(Math.random() * 3); statusEl.textContent = `${miniProgress} of 5 decisions correct.`; renderChoices(); } }); choiceGrid.appendChild(choice); }); };
            renderChoices();
        }
    }
    modalGameEl.appendChild(miniGame);
}
const akinatorLibrary = [
    ['a cat', ['living', 'animal', 'pet']], ['a dog', ['living', 'animal', 'pet']], ['a dolphin', ['living', 'animal', 'water']], ['an eagle', ['living', 'animal', 'flies']],
    ['a tree', ['living', 'plant', 'nature']], ['a human', ['living', 'person']], ['a robot', ['machine', 'madeByPeople', 'moves']], ['a car', ['machine', 'madeByPeople', 'moves', 'vehicle']],
    ['an airplane', ['machine', 'madeByPeople', 'moves', 'flies', 'vehicle']], ['a phone', ['machine', 'madeByPeople', 'electronic', 'small']], ['a book', ['madeByPeople', 'object', 'paper']],
    ['a chair', ['madeByPeople', 'object', 'furniture']], ['a key', ['madeByPeople', 'object', 'small', 'metal']], ['a guitar', ['madeByPeople', 'object', 'music']], ['a mountain', ['nature', 'large']],
    ['the Moon', ['nature', 'space', 'round']], ['the Sun', ['nature', 'space', 'round']], ['a pizza', ['madeByPeople', 'food', 'round']], ['an apple', ['food', 'nature', 'small']],
    ['a video game', ['madeByPeople', 'electronic', 'game']], ['a movie', ['madeByPeople', 'electronic', 'entertainment']], ['a ghost', ['fictional', 'living']]
].map(([name, traits]) => ({ name, traits: new Set(traits) }));
const akinatorQuestions = [
    ['Is it alive?', 'living'], ['Is it an animal?', 'animal'], ['Is it a plant?', 'plant'], ['Is it made by people?', 'madeByPeople'],
    ['Can it move by itself?', 'moves'], ['Can it fly?', 'flies'], ['Is it found in nature?', 'nature'], ['Is it connected to space?', 'space'],
    ['Is it something people can eat?', 'food'], ['Is it electronic?', 'electronic'], ['Is it small enough to hold?', 'small'], ['Is it a vehicle?', 'vehicle'],
    ['Is it round?', 'round'], ['Is it used for entertainment?', 'entertainment'], ['Is it furniture?', 'furniture'], ['Is it associated with music?', 'music'],
    ['Is it fictional?', 'fictional'], ['Is it a machine?', 'machine'], ['Is it a person?', 'person'], ['Is it large?', 'large']
];
function startAkinator() {
    akinatorCandidates = [...akinatorLibrary]; akinatorAsked = []; akinatorQuestion = null; gameSolved = false; startBtn.hidden = true; renderAkinator();
}
function renderAkinator() {
    modalGameEl.innerHTML = '';
    const miniGame = document.createElement('div'); miniGame.className = 'mini-game akinator-game';
    const available = akinatorQuestions.filter((question) => !akinatorAsked.includes(question[1]));
    if (akinatorCandidates.length === 1 || !available.length || akinatorAsked.length >= 8) {
        const guess = akinatorCandidates[0];
        miniGame.innerHTML = guess ? `<p class="mini-instruction">I have a strong feeling...</p><h3 class="akinator-guess">${guess.name}</h3><p class="mini-instruction">Was I right?</p><div class="akinator-actions"><button class="challenge-button" data-answer="yes">YES</button><button class="challenge-button" data-answer="no">NO</button></div>` : '<p class="mini-instruction">Your answers describe something outside my archive.</p><button class="challenge-button" data-answer="restart">START OVER</button>';
        miniGame.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => { if (button.dataset.answer === 'yes') { gameSolved = true; statusEl.textContent = 'Correct. The archive knows you well.'; startBtn.hidden = false; startBtn.textContent = 'Play again'; } else { akinatorCandidates.shift(); akinatorAsked = []; renderAkinator(); statusEl.textContent = 'Interesting. Let me think again.'; } }));
    } else {
        const scores = available.map((question) => { const yes = akinatorCandidates.filter((candidate) => candidate.traits.has(question[1])).length; return { question, balance: Math.abs(akinatorCandidates.length / 2 - yes) }; });
        akinatorQuestion = scores.sort((left, right) => left.balance - right.balance)[0].question; akinatorAsked.push(akinatorQuestion[1]);
        miniGame.innerHTML = `<p class="mini-instruction">Question ${akinatorAsked.length} of 8</p><h3 class="akinator-question">${akinatorQuestion[0]}</h3><div class="akinator-actions"><button class="challenge-button" data-answer="yes">YES</button><button class="challenge-button" data-answer="no">NO</button></div>`;
        miniGame.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => { const wantsTrait = button.dataset.answer === 'yes'; akinatorCandidates = akinatorCandidates.filter((candidate) => candidate.traits.has(akinatorQuestion[1]) === wantsTrait); renderAkinator(); statusEl.textContent = 'The archive is narrowing it down.'; }));
    }
    modalGameEl.appendChild(miniGame);
}
function flipGardenCard(card, index) {
    if (gardenFlipped.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.textContent = gardenCards[index]; card.classList.add('flipped'); gardenFlipped.push({ card, index });
    if (gardenFlipped.length < 2) return;
    const [first, second] = gardenFlipped;
    if (gardenCards[first.index] === gardenCards[second.index]) {
        first.card.classList.add('matched'); second.card.classList.add('matched'); gardenMatched += 1; gardenFlipped = [];
        if (gardenMatched === 8) { gameSolved = true; statusEl.textContent = 'Every flower found. The garden is complete.'; startBtn.textContent = 'Play again'; }
    } else {
        statusEl.textContent = 'Those flowers do not match.';
        setTimeout(() => { first.card.textContent = '?'; second.card.textContent = '?'; first.card.classList.remove('flipped'); second.card.classList.remove('flipped'); gardenFlipped = []; }, 650);
    }
}
function renderGames(filter = 'all', query = '') {
    gridEl.innerHTML = ''; const visibleGames = games.filter((game) => (filter === 'all' || game[2] === filter) && `${game[0]} ${game[1]}`.toLowerCase().includes(query.toLowerCase()));
    visibleGames.forEach(([title, description, category, icon], index) => { const card = document.createElement('article'); card.className = 'game-card'; card.style.animationDelay = `${index * 35}ms`; const number = String(games.findIndex((game) => game[0] === title) + 1).padStart(2, '0'); card.innerHTML = `<span class="game-number">${number}</span><div class="game-icon">${icon}</div><h3>${title}</h3><p>${description}</p><span class="tag">${category}</span>`; card.addEventListener('click', () => openGame(title, description)); gridEl.appendChild(card); });
    emptyStateEl.hidden = visibleGames.length > 0;
}
function openGame(title, description) { clearInterval(modeTimer); currentGame = title.trim(); modalTitleEl.textContent = currentGame; modalDescriptionEl.textContent = description; modalEl.hidden = false; gameStarted = false; gameSolved = false; doneBtn.hidden = true; startBtn.hidden = false; startBtn.textContent = 'Begin test'; statusEl.textContent = currentGame === '15 Puzzle' ? 'Arrange the tiles from 1 to 15.' : 'Begin when you are ready.'; modalGameEl.innerHTML = '<div class="seal" style="margin:auto">ε<br><small>TEST</small></div>'; startArcadeMusic(); if (currentGame === 'Akinator') startAkinator(); }

function startArcadeMusic() { arcadeMusic.volume = 1; arcadeMusic.play().catch(() => {}); }
function playCrisWelcome() {
    arcadeMusic.pause();
    crisVoice.currentTime = 0;
    crisVoice.volume = 1;
    crisSpeaker.classList.add('speaking');
    crisSpeaker.setAttribute('aria-label', 'Cris Formage is speaking');
    crisVoice.play().catch(() => { arcadeMusic.play().catch(() => {}); });
}
crisSpeaker.addEventListener('click', playCrisWelcome);
crisVoice.addEventListener('ended', () => {
    crisSpeaker.classList.remove('speaking');
    crisSpeaker.setAttribute('aria-label', 'Play Cris Formage welcome message');
    arcadeMusic.volume = 1;
    startArcadeMusic();
});

document.querySelectorAll('.nav-link').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active')); button.classList.add('active'); renderGames(button.dataset.filter, searchEl.value); }));
searchEl.addEventListener('input', () => renderGames(document.querySelector('.nav-link.active').dataset.filter, searchEl.value));
document.getElementById('modalClose').addEventListener('click', () => { modalEl.hidden = true; });
modalEl.addEventListener('click', (event) => { if (event.target === modalEl) modalEl.hidden = true; });
startBtn.addEventListener('click', beginMiniGame); doneBtn.addEventListener('click', finishGame);
document.addEventListener('DOMContentLoaded', startArcadeMusic, { once: true });
window.addEventListener('load', startArcadeMusic, { once: true });
window.addEventListener('pageshow', startArcadeMusic);
document.addEventListener('pointerdown', startArcadeMusic, { once: true });
renderGames();
