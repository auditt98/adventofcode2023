const fs = require('fs');

function readTextFileSync(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

module.exports = readTextFileSync;