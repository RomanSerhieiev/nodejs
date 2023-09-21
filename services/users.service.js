const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const { urls, baseURL } = require('../constants/urls');

const usersService = {
    get: async () => {
        const buffer = await readFile(join(baseURL, urls.users.base));
        const json = buffer.toString();
        return json ? JSON.parse(json) : [];
    },
    post: async (users) => {
        await writeFile(join(baseURL, urls.users.base), JSON.stringify(users));
    }
};

module.exports = {
    usersService
};