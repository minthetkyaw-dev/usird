const fs = require('fs');
const readlineSync = require('readline-sync');
const XLSX = require('xlsx');

// Fixed array of questions
const questions = ["A-Number","SSN","USCIS Account Number","Last Name","First Name","Middle Name","Other Names","Current Address","Mailing Address","Gender","Marital Status","Date of Birth","City of Birth","Country of Birth","Present Nationality","Nationality at Birth","Race","Religion","Immigration proceeding status","Last Leave country","I94","List entry to US","Passport Issue Country","Passport Number","Expiration Date","Native Language","Fluent in English","Other Languages"
];

// Function to prompt user for input and store answers
function getUserAnswers(questions) {
    const answers = {};
    questions.forEach(question => {
        const answer = readlineSync.question(`Enter ${question}: `);
        answers[question] = answer;
    });
    return answers;
}

// Function to update JSON file with new data
function updateJSONFile(answers) {
    const jsonData = JSON.parse(fs.readFileSync('data.json'));
    jsonData.push(answers);
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
}

// Function to convert JSON to XLSX and save
function convertJSONtoXLSX() {
    const jsonData = JSON.parse(fs.readFileSync('data.json'));
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'output.xlsx');
}

// Main function
function main() {
    const answers = getUserAnswers(questions);
    updateJSONFile(answers);
    convertJSONtoXLSX();
    console.log('Data updated and saved successfully.');
}

main();
