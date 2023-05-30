const fs = require('fs');

fs.mkdirSync('baseFolder');

for (let i = 1; i <= 5; i++) {
    fs.mkdirSync(`baseFolder/folder${i}`);
}

for (let i = 1; i <= 5; i++) {
    fs.writeFileSync(`baseFolder/file${i}.txt`, `file${i}.txt in the folder${i}`);
}

fs.readdirSync('baseFolder').forEach((item) => {
    const itemPath = `baseFolder/${item}`;
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
        console.log(`FOLDER: ${item}`);
    } else if (stats.isFile()) {
        console.log(`FILE: ${item}`);
    }
});