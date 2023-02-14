const fs = require('fs/promises');
const path = require('path');

const readJson = async () => {
    const talkers = await fs.readFile(path.resolve(__dirname, './talker.json'));
    const data = JSON.parse(talkers);
    return data;
};

const pushNewData = async (newFile) => {
  const data = await readJson();
  data.push(newFile);
  await fs.writeFile('src/talker.json', JSON.stringify(data));
};

const removeTalker = async (file) => {
  await fs.writeFile('src/talker.json', JSON.stringify(file));
};

module.exports = { readJson, pushNewData, removeTalker };
