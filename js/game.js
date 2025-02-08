import Boot from './states/Boot.js';
import Preloader from './states/Preloader.js';
import MainMenu from './states/MainMenu.js';
import Level from './states/Level.js';
import InterviewState from './states/InterviewState.js';
import MiniGame from './states/MiniGame.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Boot, Preloader, MainMenu, Level, InterviewState, MiniGame]
};

const game = new Phaser.Game(config);
