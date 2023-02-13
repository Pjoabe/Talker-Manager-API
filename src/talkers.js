const fs = require('fs/promises');
const path = require('path');

const readJson = async () => {
    const talkers = await fs.readFile(path.resolve(__dirname, './talker.json'));
    const data = JSON.parse(talkers);
    return data;
};

module.exports = { readJson };