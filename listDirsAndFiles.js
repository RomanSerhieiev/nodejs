const { readdir, stat } = require('node:fs/promises');
const { join } = require('node:path');

const listDirsAndFiles = async () => {
    try {
        const baseFolderPath = join(__dirname, 'baseFolder');
        const items = await readdir(baseFolderPath);

        for (const item of items) {
            const stats = await stat(join(baseFolderPath, item));
            console.log(stats.isFile() ? 'FILE:' : 'FOLDER:', item);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    listDirsAndFiles
};