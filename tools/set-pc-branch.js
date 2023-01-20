const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

const getBranch = () => new Promise((resolve) => {
    return exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
        let result = '';
        if (err)
            console.log(`getBranch Error: ${err}`);
        else if (typeof stdout === 'string')
            result = stdout.trim();
        resolve(result);
    });
});

async function getPCBranch(gitBranch) {
    const token = process.env.PLAYCANVAS_API_KEY;
    const projectId = process.env.PLAYCANVAS_PROJECT_ID;
    let response = await axios({
        method: 'GET',
        url: `https://playcanvas.com/api/projects/${projectId}/branches`,
        headers: {
            Authorization: 'Bearer ' + token,
            ContentType: 'application/json',
        }
    });

    const result = response.data.result.filter(b => b.name === gitBranch);
    if (result.length === 0) return null;
    return result[0].id;
}

(async () => {
    if (process.env.PLAYCANVAS_BRANCH_ID)
        return;
    let currentBranch = process.env.CI_COMMIT_REF_NAME;
    if (!currentBranch)
        currentBranch = await getBranch();
    currentBranch = currentBranch.split('/').reverse()[0];
    const branchId = await getPCBranch(currentBranch);
    if (branchId === null) {
        console.log('Unable to find branch on playcanvas project: ' + currentBranch);
        return;
    }

    const exists = fs.existsSync('.env');
    if (exists) {
        await fs.promises.appendFile('.env', `\nPLAYCANVAS_BRANCH_ID=${branchId}`);
        return;
    }
    await fs.promises.writeFile('.env', `\nPLAYCANVAS_BRANCH_ID=${branchId}`);
})();