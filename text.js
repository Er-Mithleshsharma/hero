const fs = require('fs');
const simpleGit = require('simple-git');

// Path to your Git repository
const repoPath = 'C:\Users\hp\Desktop\hero';

// Create the directory if it doesn't exist
if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath, { recursive: true });
    console.log(`Directory ${repoPath} created successfully`);
}

// Initialize simple-git
const git = simpleGit(repoPath);

// Get the current date
const currentDate = new Date();

// Loop through the range of dates (1st to 30th January)
for (let i = 1; i <= 30; i++) {
    // Calculate the date
    const commitDate = new Date(currentDate.getFullYear(), 0, i);

    // Create a new empty file with a unique name
    const fileName = `commit_${commitDate.getFullYear()}${String(commitDate.getMonth() + 1).padStart(2, '0')}${String(commitDate.getDate()).padStart(2, '0')}.txt`;
    const filePath = `${repoPath}/${fileName}`;
    // Create an empty file
    fs.writeFileSync(filePath, '');

    // Stage and commit the file with the specified date
    git.add(fileName)
        .commit(`Auto commit on ${commitDate.toISOString().split('T')[0]}`, {'--date': commitDate.toISOString()})
        .then(() => console.log(`Committed file ${fileName} on ${commitDate.toISOString().split('T')[0]}`))
        .catch(err => console.error(err));
}

// Push the changes to the remote repository
git.push('origin', 'main', (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
});
