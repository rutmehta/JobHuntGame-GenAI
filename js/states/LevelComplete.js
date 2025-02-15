// Updated LevelComplete.js with Background Image
export default class LevelComplete extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelComplete' });
    }

    init(data) {
        this.levelNumber = data.levelNumber || 1;
    }

    create() {
        // Load background image
        this.add.image(375, 300, 'LevelCompleteScreen').setOrigin(0.5, 0.5);

        // Styled text message
        /*
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3, 'Level Complete!', {
            font: '32px pixel',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        */
        // Button styling and interactions
        const buttonStyle = {
            font: '24px pixel',
            fill: '#ffffff',
            padding: { x: 20, y: 10 },
            backgroundColor: '#2d2d2d'
        };

        const continueButton = this.add.text(400, 350, 'Continue', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => continueButton.setBackgroundColor('#4d4d4d'))
            .on('pointerout', () => continueButton.setBackgroundColor('#2d2d2d'))
            .on('pointerdown', () => this.scene.start('Level', { levelNumber: this.levelNumber + 1 }));

        const menuButton = this.add.text(400, 400, 'Main Menu', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => menuButton.setBackgroundColor('#4d4d4d'))
            .on('pointerout', () => menuButton.setBackgroundColor('#2d2d2d'))
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}
