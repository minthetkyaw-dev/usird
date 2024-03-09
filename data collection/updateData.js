const fs = require('fs');
const readlineSync = require('readline-sync');
const XLSX = require('xlsx');

// Fixed array of questions
const questions = ["A-Number","SSN","USCIS Account Number","Last Name","First Name","Middle Name","Other Names","Current Address","Mailing Address","Gender","Marital Status","Date of Birth","City of Birth","Country of Birth","Nationality","Religion","Last Leave country","List entry to US: Date","List entry to US: i94","List entry to US: Place","List entry to US: Visa Category","List entry to US: Status Expire","Passport Number","Passport Expiration Date"];
const lists = ["Address","Employment", "Education"];

// Function to prompt user for input and store answers
function getUserAnswers(questions, lists) {
    const answers = {};
    questions.forEach(question => {
        const answer = readlineSync.question(`Enter ${question}: `);
        answers[question] = answer;
        if(question == "A-Number" && answer == "") {
            answers[question] = "N/A"
        }
        if(question == "SSN" && answer == "") {
            answers[question] = "N/A"
        }
        if(question == "USCIS Account Number" && answer == "") {
            answers[question] = "N/A"
        }
        if(question == "City of Birth" && answer == "") {
            answers[question] = "Yangon"
        }
        if(question == "Country of Birth" && answer == "") {
            answers[question] = "Myanmar"
        }
        if(question == "Religion" && answer == "") {
            answers[question] = "Buddhism"
        }
        if(question == "Nationality" && answer == "") {
            answers[question] = "Burmese"
        }
    });
    lists.forEach(list => {
        const answer = readlineSync.question(`Enter ${list}: `);
        answers[list] = `[${answer}]`; 
    });
    return answers;
}

// Function to update JSON file with new data
function updateJSONFile(answers) {
    const jsonData = JSON.parse(fs.readFileSync('data.json'));
    jsonData.push(answers);
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
}

// // Function to convert JSON to XLSX and save
// function convertJSONtoXLSX() {
//     const jsonData = JSON.parse(fs.readFileSync('data.json'));
//     const ws = XLSX.utils.json_to_sheet(jsonData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//     XLSX.writeFile(wb, 'output.xlsx');
// }

// Function to convert JSON to XLSX and save
function convertJSONtoXLSX() {
    const jsonData = JSON.parse(fs.readFileSync('data.json'));
    const wb = XLSX.utils.book_new();
    
    jsonData.forEach((data, index) => {
        const ws = XLSX.utils.json_to_sheet([data]);
        XLSX.utils.book_append_sheet(wb, ws, `Client${index.toString().padStart(4,"0")}`);
    });
    
    XLSX.writeFile(wb, 'output.xlsx');
}


// Main function
function main() {
    const answers = getUserAnswers(questions, lists);
    updateJSONFile(answers);
    convertJSONtoXLSX();
    console.log('Data updated and saved successfully.');
}

main();
