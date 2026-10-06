document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiForm');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const heightError = document.getElementById('heightError');
    const weightError = document.getElementById('weightError');
    
    const resultContainer = document.getElementById('resultContainer');
    const bmiScore = document.getElementById('bmiScore');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiMessage = document.getElementById('bmiMessage');
    const rangeMarker = document.getElementById('rangeMarker');

    function validateInput(input, errorElement, fieldName) {
        const value = parseFloat(input.value);
        if (isNaN(value)) {
            errorElement.textContent = `Please enter a valid ${fieldName}.`;
            errorElement.classList.add('show');
            return false;
        }
        if (value <= 0) {
            errorElement.textContent = `${fieldName} must be greater than zero.`;
            errorElement.classList.add('show');
            return false;
        }
        errorElement.classList.remove('show');
        return value;
    }

    function calculateBMI(weight, height) {
        // height in cm to meters
        const heightInMeters = height / 100;
        return weight / (heightInMeters * heightInMeters);
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return {
                category: 'Underweight',
                statusClass: 'status-underweight',
                message: 'You are underweight. Consider consulting a healthcare provider or a dietitian to help you gain weight safely.',
                position: Math.min((bmi / 18.5) * 25, 25) // 0-25%
            };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return {
                category: 'Normal weight',
                statusClass: 'status-normal',
                message: 'Great! You are in a healthy weight range. Maintain your healthy lifestyle.',
                position: 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25 // 25-50%
            };
        } else if (bmi >= 25 && bmi <= 29.9) {
            return {
                category: 'Overweight',
                statusClass: 'status-overweight',
                message: 'You are overweight. Consider consulting a healthcare provider for advice on managing your weight.',
                position: 50 + ((bmi - 25) / (29.9 - 25)) * 25 // 50-75%
            };
        } else {
            return {
                category: 'Obese',
                statusClass: 'status-obese',
                message: 'You are in the obese category. It is recommended to consult a healthcare provider for personalized advice.',
                position: Math.min(75 + ((bmi - 30) / 10) * 25, 100) // 75-100% (capping at +10 BMI for visual scale)
            };
        }
    }

    function displayResult(bmi) {
        // Rounding to 1 decimal place as requested in hints
        const roundedBMI = bmi.toFixed(1);
        const { category, statusClass, message, position } = getBMICategory(bmi);

        // Update DOM
        bmiScore.textContent = roundedBMI;
        bmiCategory.textContent = category;
        bmiMessage.textContent = message;
        
        // Update styling
        resultContainer.className = `result-container ${statusClass}`;
        resultContainer.style.display = 'block'; // Make it display block so animation works if it was hidden
        
        // Small timeout to allow display: block to apply before animating opacity/transform
        setTimeout(() => {
            resultContainer.classList.remove('hidden');
            rangeMarker.style.left = `${position}%`;
        }, 10);
        
        // Counter animation for the score
        animateValue(bmiScore, 0, parseFloat(roundedBMI), 1000);
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = (start + (end - start) * easeProgress).toFixed(1);
            obj.innerHTML = currentVal;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end.toFixed(1);
            }
        };
        window.requestAnimationFrame(step);
    }

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const height = validateInput(heightInput, heightError, 'Height');
        const weight = validateInput(weightInput, weightError, 'Weight');

        if (height && weight) {
            const bmi = calculateBMI(weight, height);
            displayResult(bmi);
        }
    });

    // Clear errors on input
    heightInput.addEventListener('input', () => heightError.classList.remove('show'));
    weightInput.addEventListener('input', () => weightError.classList.remove('show'));
});
