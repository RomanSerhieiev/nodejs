const {createDirsAndFiles} = require('./createDirsAndFiles');
const {listDirsAndFiles} = require('./listDirsAndFiles');

createDirsAndFiles().then(() => {
    listDirsAndFiles();
});
