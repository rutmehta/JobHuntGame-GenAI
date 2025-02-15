// LevelComplete.js (New Scene for Exit Screen)
export default class LevelComplete extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelComplete' });
    }

    init(data) {
        this.levelNumber = data.levelNumber || 1;
    }

    create() {
        // Pixel-styled level complete message
        this.add.text(400, 200, 'Level Complete!', {
            font: '32px pixel',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 250, 'More coding awaits...', {
            font: '20px pixel',
            fill: '#ffcc00'
        }).setOrigin(0.5);

        // Continue Button
        const continueButton = this.add.text(400, 350, 'Continue', {
            font: '24px pixel',
            fill: '#ffffff',
            backgroundColor: '#2d2d2d'
        }).setOrigin(0.5).setInteractive();

        continueButton.on('pointerdown', () => {
            this.scene.start('Level', { levelNumber: this.levelNumber + 1 });
        });

        // Main Menu Button
        const menuButton = this.add.text(400, 400, 'Main Menu', {
            font: '24px pixel',
            fill: '#ffffff',
            backgroundColor: '#2d2d2d'
        }).setOrigin(0.5).setInteractive();

        menuButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
