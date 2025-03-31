import { xpData } from '../utils/xpData.js';
import { playerData } from '../utils/playerData.js';
import { upgradeCosts } from '../utils/upgradeCosts.js';
import { buildings } from '../utils/buildings.js';

export class XPCalculator {
    getLevelFromXP = (xp) => {
        let level = 1;
        for (const lvl in xpData) {
            if (xp >= xpData[lvl].minimum) {
                level = parseInt(lvl);
            } else {
                break;
            }
        }
        return level;
    };

    grantXP = (level) => {
        const xpAmount = upgradeCosts[level]?.xp || 0;
        playerData.xp += xpAmount;
        playerData.level = this.getLevelFromXP(playerData.xp);
        localStorage.setItem('playerXP', playerData.xp);
        localStorage.setItem('playerLevel', playerData.level);
        this.updatePlayerModal();
    };

    afkXPFarm = () => {
        const totalBuildings = buildings.farms.count + buildings.mines.count + buildings.houses.count;
        const totalLevels = Object.values(buildings.farms).reduce((sum, lvl) => sum + lvl, 0) +
            Object.values(buildings.mines).reduce((sum, lvl) => sum + lvl, 0) +
            Object.values(buildings.houses).reduce((sum, lvl) => sum + lvl, 0);
        const avgBuildingLevel = totalBuildings > 0 ? totalLevels / totalBuildings : 0;

        const afkXPAmount = Math.round(playerData.level * totalBuildings * (avgBuildingLevel / 10));
        playerData.xp += afkXPAmount;
        playerData.level = this.getLevelFromXP(playerData.xp);
        localStorage.setItem('playerXP', playerData.xp);
        localStorage.setItem('playerLevel', playerData.level);
        this.updatePlayerModal();
    };

    updatePlayerModal = () => {
        const currentLevel = playerData.level;
        const nextLevel = xpData[currentLevel + 1] && playerData.xp >= xpData[currentLevel + 1].minimum
            ? currentLevel + 1
            : currentLevel;

        if (xpData[nextLevel]) {
            document.getElementById('profileXP').textContent = `${playerData.xp} / ${xpData[nextLevel + 1].minimum}`;
        } else {
            document.getElementById('profileXP').textContent = `${playerData.xp} / MAX`;
        }
        document.getElementById('profileLevel').textContent = playerData.level;
    };
}
