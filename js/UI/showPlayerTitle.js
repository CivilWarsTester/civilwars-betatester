import { titles } from '../utils/titles.js';
import { XPCalculator } from '../functions/XPCalculator.js';

const xpCalc = new XPCalculator();

export function showPlayerTitle() {
    let level = xpCalc.getLevelFromXP();
    document.getElementById('playerTitle').textContent = titles[level - 1];
}