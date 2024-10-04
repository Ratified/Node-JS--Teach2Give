const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');
const fs = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${uuidv4()}\t${dateTime}\t${message}\n`;

    const folderName = path.join(__dirname, 'logs');
    try {
        if (!await fs.stat(folderName).catch(() => false)) {
            await fs.mkdir(folderName);
        }
        await fs.appendFile(path.join(folderName, 'eventLogs.txt'), logItem);
    } catch (err) {
        console.error(err);
    }
};

module.exports = logEvents;