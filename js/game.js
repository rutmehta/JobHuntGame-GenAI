import Boot from './states/Boot.js';
import Preloader from './states/Preloader.js';
import MainMenu from './states/MainMenu.js';
import Level from './states/Level.js';
import InterviewState from './states/InterviewState.js';
import MiniGame from './states/MiniGame.js';
import LevelComplete from './states/LevelComplete.js';
import UIScene from './states/UIScene.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Boot, Preloader, MainMenu, Level, LevelComplete, InterviewState, MiniGame, UIScene]
};

const game = new Phaser.Game(config);
