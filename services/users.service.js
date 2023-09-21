const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const { urls, baseURL } = require('../constants/urls');

const usersService = {
    get: async () => {
        const json = await readFile(join(baseURL, urls.users.base), {encoding: 'utf-8'});
        return json ? JSON.parse(json) : [];
    },
    post: async (users) => {
        await writeFile(join(baseURL, urls.users.base), JSON.stringify(users));
    }
};

module.exports = {
    usersService
};