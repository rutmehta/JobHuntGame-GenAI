export default class InterviewState extends Phaser.Scene {
    constructor() {
        super({ key: 'InterviewState' });
        this.currentQuestion = 0;
        this.score = 0;
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Add interviewer
        this.interviewer = this.add.image(400, 200, 'interviewer');

        // Create dialog box
        this.createDialogBox();

        // Sample questions (in real implementation, these would come from the AI)
        this.questions = [
            {
                question: "What is the time complexity of quicksort?",
                options: [
                    "O(n log n) average case",
                    "O(n²) worst case",
                    "O(n) best case",
                    "All of the above"
                ],
                correct: 3
            },
            // Add more questions...
        ];

        // Start interview
        this.askQuestion();
    }

    createDialogBox() {
        // Create dialog box background
        const graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 0.8);
        graphics.fillRect(50, 400, 700, 150);

        // Create text objects for question and options
        this.questionText = this.add.text(75, 420, '', {
            font: '18px Arial',
            fill: '#ffffff',
            wordWrap: { width: 650 }
        });

        this.optionTexts = [];
        for (let i = 0; i < 4; i++) {
            const optionText = this.add.text(75, 460 + (i * 20), '', {
                font: '16px Arial',
                fill: '#ffffff'
            });
            optionText.setInteractive();
            optionText.on('pointerdown', () => this.selectAnswer(i));
            this.optionTexts.push(optionText);
        }
    }

    askQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endInterview();
            return;
        }

        const question = this.questions[this.currentQuestion];
        this.questionText.setText(question.question);

        question.options.forEach((option, index) => {
            this.optionTexts[index].setText(`${index + 1}. ${option}`);
        });
    }

    selectAnswer(index) {
        const question = this.questions[this.currentQuestion];
        if (index === question.correct) {
            this.score++;
        }

        this.currentQuestion++;
        this.askQuestion();
    }

    endInterview() {
        // Calculate success based on score
        const success = this.score >= (this.questions.length / 2);

        // Display result
        this.questionText.setText(success ? 
            'Congratulations! You passed the interview!' : 
            'Unfortunately, you did not pass the interview.');

        // Clear options
        this.optionTexts.forEach(text => text.setText(''));

        // Add continue button
        this.time.delayedCall(2000, () => {
            const continueText = this.add.text(400, 500, 'Click to continue', {
                font: '20px Arial',
                fill: '#ffffff'
            });
            continueText.setOrigin(0.5);
            continueText.setInteractive();
            continueText.on('pointerdown', () => {
                if (success) {
                    this.scene.start('MiniGame');
                } else {
                    this.scene.start('Level');
                }
            });
        });
    }
}
