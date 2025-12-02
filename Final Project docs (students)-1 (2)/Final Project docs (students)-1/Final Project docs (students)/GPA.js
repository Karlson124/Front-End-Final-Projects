"use strict";

// Map letter grades to GPA points
const gradePoints = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
};

// Focus on the first credit input when the page loads
window.onload = function() {
    const firstCreditInput = document.querySelector('.credit');
    if (firstCreditInput) firstCreditInput.focus();
};

// Function to calculate GPA
function calculateGPA() {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credit');

    let totalPoints = 0;
    let totalCredits = 0;
    let validEntries = 0;

    for (let i = 0; i < grades.length; i++) {
        const grade = grades[i].value.trim().toUpperCase();
        const credit = parseFloat(credits[i].value);

        if (!grade && isNaN(credit)) continue;

        if (!gradePoints.hasOwnProperty(grade) || isNaN(credit) || credit <= 0) {
            alert(`Invalid entry at row ${i + 1}. Use grade A-F and positive credit hours.`);
            grades[i].focus();
            return;
        }

        totalPoints += gradePoints[grade] * credit;
        totalCredits += credit;
        validEntries++;
    }

    if (validEntries < 2) {
        alert("Please enter at least 2 valid grade and credit hour entries.");
        return;
    }

    const gpa = totalPoints / totalCredits;
    document.getElementById('result').value = gpa.toFixed(2);
}

// Reset all input fields
function resetFields() {
    document.querySelectorAll('.grade').forEach(input => input.value = '');
    document.querySelectorAll('.credit').forEach(input => input.value = '');
    document.getElementById('result').value = '';

    const firstCreditInput = document.querySelector('.credit');
    if (firstCreditInput) firstCreditInput.focus();
}

// Attach event handlers to buttons
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('submitGPA').onclick = calculateGPA;
    document.getElementById('resetGPA').onclick = resetFields;
});
