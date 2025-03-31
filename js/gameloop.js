import { Calculate } from './functions/Calculate.js';
import { showPlayerTitle } from './UI/showPlayerTitle.js';
import { updateResources } from './UI/updateResources.js';
import { XPCalculator } from './functions/XPCalculator.js';
import { saveGameState } from './functions/saveGamestate.js';
import { calculateCollectibles } from './functions/Calculate.js';
import { gameTick, updateTimerDisplay } from './UI/TimerLogic.js';
import { collectResources } from './functions/collectResources.js';
import { renderBuildingButtons } from './UI/renderBuildingButtons.js';

const calc = new Calculate();
const xpCalc = new XPCalculator();

document.addEventListener('DOMContentLoaded', () => showPlayerTitle());

setInterval(gameTick, 1000);
setInterval(xpCalc.afkXPFarm, 60000);
setInterval(calculateCollectibles, 1);
window.collectResources = collectResources;
document.getElementById('resourceBtn').addEventListener('click', () => collectResources);

window.addEventListener('beforeunload', () => saveGameState());

updateResources();
updateTimerDisplay();
renderBuildingButtons();
calculateCollectibles();
calc.calculatePopulation();
xpCalc.updatePlayerModal();