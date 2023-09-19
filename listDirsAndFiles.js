const {readdir, stat} = require('node:fs/promises');
const {join} = require('node:path');

const listDirsAndFiles = async () => {
    try {
        const baseFolderPath = join(__dirname, 'baseFolder');
        const items = await readdir(baseFolderPath);

        for (const item of items) {
            const itemPath = join(baseFolderPath, item);
            const stats = await stat(itemPath);

            if (stats.isDirectory()) {
                console.log(`FOLDER: ${item}`);
            } else if (stats.isFile()) {
                console.log(`FILE: ${item}`);
            }
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    listDirsAndFiles
};