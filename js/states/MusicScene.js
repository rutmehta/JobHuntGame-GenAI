// MusicScene.js
export default class MusicScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MusicScene', active: true });
    }

    create() {
        this.bgMusic = this.sound.add('bgMusic', {
            volume: 0.5,
            loop: true
        });
        this.bgMusic.play();
    }
}
