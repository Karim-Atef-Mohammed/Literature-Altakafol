document.addEventListener('DOMContentLoaded', function() {
    // Get all quiz questions
    const questions = document.querySelectorAll('.question');
    const submitButton = document.querySelector('.submit-quiz');
    const quizResult = document.querySelector('.quiz-result');
    const resultMessage = document.querySelector('.result-message');
    const resultScore = document.querySelector('.result-score');
    
    // Setup option selection
    questions.forEach(question => {
        const options = question.querySelectorAll('.option');
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options in this question
                const questionOptions = question.querySelectorAll('.option');
                questionOptions.forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
            });
        });
    });
    
    // Submit quiz functionality
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // Check if all questions have been answered
            let allAnswered = true;
            let correctAnswers = 0;
            const totalQuestions = questions.length;
            
            questions.forEach(question => {
                const selectedOption = question.querySelector('.option.selected');
                
                if (!selectedOption) {
                    allAnswered = false;
                    question.classList.add('unanswered');
                    setTimeout(() => {
                        question.classList.remove('unanswered');
                    }, 2000);
                } else {
                    // Check if answer is correct
                    if (selectedOption.dataset.correct === "true") {
                        correctAnswers++;
                        selectedOption.classList.add('correct');
                    } else {
                        selectedOption.classList.add('wrong');
                        // Find and highlight the correct answer
                        const correctOption = question.querySelector('.option[data-correct="true"]');
                        if (correctOption) {
                            correctOption.classList.add('correct');
                        }
                    }
                }
            });
            
            if (allAnswered) {
                // Calculate percentage
                const percentage = Math.round((correctAnswers / totalQuestions) * 100);
                
                // Show results
                quizResult.style.display = 'block';
                
                // Scroll to results
                quizResult.scrollIntoView({ behavior: 'smooth' });
                
                // Set result message based on score
                if (percentage >= 90) {
                    resultMessage.textContent = 'ممتاز! لديك فهم عميق للنص!';
                } else if (percentage >= 70) {
                    resultMessage.textContent = 'جيد جدا! استيعاب جيد للنص.';
                } else if (percentage >= 50) {
                    resultMessage.textContent = 'جيد! ولكن يمكنك مراجعة النص مرة أخرى لفهم أعمق.';
                } else {
                    resultMessage.textContent = 'حاول مرة أخرى بعد قراءة النص بتمعّن أكبر.';
                }
                
                // Set score
                resultScore.textContent = `${correctAnswers} من ${totalQuestions} (${percentage}%)`;
                
                // Disable submit button
                this.disabled = true;
                
                // Disable option selection
                const allOptions = document.querySelectorAll('.option');
                allOptions.forEach(option => {
                    option.style.pointerEvents = 'none';
                });
            } else {
                alert('الرجاء الإجابة على جميع الأسئلة!');
            }
        });
    }
});