import Boot from './states/Boot.js';
import Preloader from './states/Preloader.js';
import MainMenu from './states/MainMenu.js';
import Level from './states/Level.js';
import InterviewState from './states/InterviewState.js';
import MiniGame from './states/MiniGame.js';
// If you want a global music scene, uncomment the next line:
// import MusicScene from './states/MusicScene.js';

export function initPhaserGame() {
const config = {
type: Phaser.AUTO,
width: 800,
height: 600,
parent: 'game-container',
pixelArt: true,
physics: {
default: 'arcade',
arcade: {
gravity: { y: 300 },
debug: true
}
},
// If including MusicScene, add it to the array:
// scene: [Boot, Preloader, MainMenu, Level, InterviewState, MiniGame, MusicScene]
scene: [Boot, Preloader, MainMenu, Level, InterviewState, MiniGame]
};

return new Phaser.Game(config);
}
