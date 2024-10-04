# Node Exercise

## Setup

1. **Create Files**:
    - `LogEvents.js`
    - `index.js`

2. **Initialize Project**:
    ```bash
    npm init -y
    ```

3. **Install Packages**:
    ```bash
    npm install nodemon uuid date-fns
    ```

4. **Configure `package.json` Scripts**:
    ```json
    "scripts": {
        "start": "nodemon index.js"
    }
    ```

## LogEvents.js

1. **Import Packages**:
    - `uuid`
    - `date-fns`

2. **Create `LogEvents` Function**:
    - Ensure it is an async function.
    - Print a new UUID, new date, and a message in one variable called `logItem`.
    - Append `logItem` to a new file `eventLogs.txt` inside the `Logs` folder.
    - Create the folder using Node and Promises if it doesn't exist.

## index.js

1. **Import `LogEvents` and `EventEmitter`**:
    - Import the `LogEvents` function from `LogEvents.js`.
    - Use `EventEmitter`.

2. **Use EventEmitter**:
    - Emit an event with a message "new log event emitted" inside a `setTimeout` function of 2000 ms.
    - Pass the message as a parameter to the `LogEvents` function.

## Check and Create Directory

1. **Example Code**:
    ```javascript
    const fs = require('node:fs');

    const folderName = '/Users/joe/test';

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
    ```
