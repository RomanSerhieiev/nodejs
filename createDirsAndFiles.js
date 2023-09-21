const { mkdir, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const createDirsAndFiles = async () => {
    for (let i = 1; i <= 5; i++) {
        try {
            await mkdir(join(process.cwd(), 'baseFolder', `folder${i}`), { recursive: true });
            await writeFile(join(__dirname, 'baseFolder', `file${i}.txt`), '');
        } catch (err) {
            throw new Error(err.message);
        }
    }
};

module.exports = {
    createDirsAndFiles
};