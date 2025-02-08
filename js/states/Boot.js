export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot' });
    }

    preload() {
        // Load minimal assets needed for the loading screen
        this.load.image('loading-bar', 'assets/images/loading-bar.png');
    }

    create() {
        // Set up any game scaling options
        this.scale.pageAlignHorizontally = true;

        // Initialize any game settings
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Transition to the Preloader state
        this.scene.start('Preloader');
    }
}
