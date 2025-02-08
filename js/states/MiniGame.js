export default class MiniGame extends Phaser.Scene {
    constructor() {
        super({ key: 'MiniGame' });
        this.currentProblem = 0;
        this.timeLimit = 60; // 60 seconds per problem
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Create coding challenge interface
        this.createCodingInterface();

        // Sample coding problems (in real implementation, these would be more varied)
        this.problems = [
            {
                prompt: "Write a function that returns the sum of two numbers",
                template: "function sum(a, b) {\n  // Your code here\n}",
                test: "sum(2, 3) === 5",
                solution: "function sum(a, b) {\n  return a + b;\n}"
            },
            // Add more problems...
        ];

        // Start timer
        this.startTimer();

        // Present first problem
        this.presentProblem();
    }

    createCodingInterface() {
        // Create problem description area
        const descriptionBox = this.add.graphics();
        descriptionBox.fillStyle(0x222222, 0.8);
        descriptionBox.fillRect(50, 50, 700, 100);

        this.problemText = this.add.text(75, 70, '', {
            font: '18px Arial',
            fill: '#ffffff',
            wordWrap: { width: 650 }
        });

        // Create code editor area
        const editorBox = this.add.graphics();
        editorBox.fillStyle(0x333333, 0.8);
        editorBox.fillRect(50, 170, 700, 300);

        // In a real implementation, we would integrate a proper code editor
        // For now, we'll use a simple text area
        this.codeText = this.add.text(75, 190, '', {
            font: '16px Courier',
            fill: '#ffffff',
            wordWrap: { width: 650 }
        });

        // Create submit button
        const submitButton = this.add.rectangle(400, 500, 200, 50, 0x4CAF50);
        const submitText = this.add.text(400, 500, 'Submit Solution', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        submitText.setOrigin(0.5);
        submitButton.setInteractive();
        submitButton.on('pointerdown', () => this.submitSolution());

        // Create timer text
        this.timerText = this.add.text(650, 70, '', {
            font: '24px Arial',
            fill: '#ffffff'
        });
    }

    startTimer() {
        this.timeLeft = this.timeLimit;
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText(`Time: ${this.timeLeft}s`);

        if (this.timeLeft <= 0) {
            this.timer.remove();
            this.timeUp();
        }
    }

    presentProblem() {
        if (this.currentProblem >= this.problems.length) {
            this.completeMiniGame();
            return;
        }

        const problem = this.problems[this.currentProblem];
        this.problemText.setText(problem.prompt);
        this.codeText.setText(problem.template);
    }

    submitSolution() {
        // In a real implementation, we would:
        // 1. Get the code from the editor
        // 2. Run it through tests
        // 3. Provide feedback
        
        // For now, we'll just move to the next problem
        this.currentProblem++;
        this.presentProblem();
    }

    timeUp() {
        this.scene.start('Level');
    }

    completeMiniGame() {
        // Show completion message
        this.problemText.setText('Congratulations! You\'ve completed all challenges!');
        this.codeText.setText('');

        // Add continue button
        this.time.delayedCall(2000, () => {
            const continueText = this.add.text(400, 500, 'Click to continue', {
                font: '20px Arial',
                fill: '#ffffff'
            });
            continueText.setOrigin(0.5);
            continueText.setInteractive();
            continueText.on('pointerdown', () => {
                this.scene.start('Level');
            });
        });
    }
}
