// Level.js
import LevelComplete from './LevelComplete.js';

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
        this.levelNumber = 1; // Start at level 1
    }

    init(data) {
        // Use passed-in data to set current level (fallback to 1 if undefined)
        this.levelNumber = data.levelNumber || 1;
    }

    create() {
        // Safety check
        if (typeof Phaser === 'undefined') {
            console.error('Phaser is not loaded correctly. Check your script references.');
            return;
        }

        // World bounds
        this.physics.world.setBounds(0, 0, 1600, 600);

        // Background
        this.bg = this.add.tileSprite(0, 0, 1600, 600, 'background')
            .setOrigin(0, 0);

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(800, 580, 'platform')
            .setScale(4)
            .refreshBody();

        // Randomly create a few more platforms
        this.generateRandomPlatforms(this.platforms, 4);

        // Player
        this.player = this.physics.add.sprite(100, 300, 'player');
        this.player.setScale(0.4);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        // Camera setup
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Create Phaser’s built-in cursor keys (left, right, up, down)
        this.cursors = this.input.keyboard.createCursorKeys();

        // Also track space as jump if you like
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add reference to the Q key
        this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        // Create the question prompt UI (initially hidden)
        this.createQuestionPrompt();

    }

    createQuestionPrompt() {
        // Container to hold everything
        this.questionContainer = this.add.container(100, 100);
    
        // Semi-transparent background
        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.8);
        bg.fillRect(0, 0, 600, 250);
    
        // Question text
        this.questionText = this.add.text(20, 20, "What’s 2 + 2?", {
            fontSize: '20px',
            fill: '#FFFFFF'
        });
    
        // Option texts
        this.options = [
            this.add.text(20, 60, 'A) 3',  { fontSize: '16px', fill: '#FFFFFF', backgroundColor: null }),
            this.add.text(20, 90, 'B) 4',  { fontSize: '16px', fill: '#FFFFFF', backgroundColor: null }),
            this.add.text(20, 120, 'C) 5', { fontSize: '16px', fill: '#FFFFFF', backgroundColor: null }),
            this.add.text(20, 150, 'D) 22',{ fontSize: '16px', fill: '#FFFFFF', backgroundColor: null })
        ];
    
        // Track currently selected option (-1 = none)
        this.selectedOptionIndex = -1;
    
        // Make each option interactive and highlight on click
        this.options.forEach((optionText, index) => {
            optionText.setInteractive();
            optionText.on('pointerdown', () => {
                // Un-highlight previous selection
                if (this.selectedOptionIndex !== -1) {
                    const prevText = this.options[this.selectedOptionIndex];
                    prevText.setStyle({ fill: '#FFFFFF', backgroundColor: null });
                }
    
                // Highlight this one
                this.selectedOptionIndex = index;
                optionText.setStyle({ fill: '#FFFF00', backgroundColor: '#333333' });
            });
        });
    
        // Submit button
        this.submitButton = this.add.text(20, 190, '[ Submit Answer ]', {
            fontSize: '18px',
            fill: '#FFFFFF',
            backgroundColor: '#006400',  // Dark green
            padding: { x: 10, y: 5 }
        })
        .setInteractive()
        .on('pointerover', () => {
            // Change color or style on hover
            this.submitButton.setStyle({ backgroundColor: '#228B22' });
        })
        .on('pointerout', () => {
            // Revert style
            this.submitButton.setStyle({ backgroundColor: '#006400' });
        })
        .on('pointerdown', () => this.submitAnswer());
    
        // Add items to container
        this.questionContainer.add([ bg, this.questionText, ...this.options, this.submitButton ]);
    
        // Hide by default
        this.questionContainer.setVisible(false);
    }
    
    update() {
        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } 
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Jumping (only if on the ground)
        // If you want "cursors.up" AND space bar to both allow jump:
        if ((this.cursors.up.isDown || this.spaceKey.isDown) && this.player.body.blocked.down) {
            this.player.setVelocityY(-500);
        }

        // Check if player reaches the far right edge -> complete level
        if (this.player.x >= 1550) {
            this.completeLevel();
        }

        // Show the question prompt when Q is pressed
        if (Phaser.Input.Keyboard.JustDown(this.qKey)) {
            this.questionContainer.setVisible(true);
        }
    }

    submitAnswer() {
        // If nothing is selected, you can provide a warning or do nothing
        if (this.selectedOptionIndex === -1) {
            console.log("No option selected!");
            // You could display some text like "Please select an answer first."
            return;
        }
    
        // Check correctness: suppose correct answer is index 1 (B)
        if (this.selectedOptionIndex === 1) {
            console.log("Correct! B) 4");
        } else {
            console.log("Incorrect!");
        }
    
        // Hide the prompt after submission
        this.questionContainer.setVisible(false);
    
        // Optionally reset the selection
        this.selectedOptionIndex = -1;
        this.options.forEach(option => {
            option.setStyle({ fill: '#FFFFFF', backgroundColor: null });
        });
    }
    
    generateRandomPlatforms(platforms, count) {
        const bounds = {
            minX: 100, maxX: 1500,
            minY: 100, maxY: 500,
            minSpacing: 150
        };

        let prevX = -Infinity;
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Phaser.Math.Between(bounds.minX, bounds.maxX);
                y = Phaser.Math.Between(bounds.minY, bounds.maxY);
            } while (Math.abs(x - prevX) < bounds.minSpacing);

            platforms.create(x, y, 'platform')
                .setImmovable(true)
                .setScale(Phaser.Math.FloatBetween(0.8, 1.2))
                .refreshBody();

            prevX = x;
        }
    }

    completeLevel() {
        // Transition to the LevelComplete scene
        this.scene.start('LevelComplete', { levelNumber: this.levelNumber });
    }
}
