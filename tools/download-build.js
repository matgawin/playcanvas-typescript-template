const axios = require('axios');
const zip = require('adm-zip');

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
const scenes = [];
const name = 'pc-template';

(async () => {
    const token = process.env.PLAYCANVAS_API_KEY;
    const projectId = process.env.PLAYCANVAS_PROJECT_ID;
    const branchId = process.env.PLAYCANVAS_BRANCH_ID;
    const outDir = './out/';

    let response = await axios({
        method: 'POST',
        url: 'https://playcanvas.com/api/apps/download',
        headers: {
            Authorization: 'Bearer ' + token,
            ContentType: 'application/json',
        },
        data: {
            project_id: Number(projectId),
            branch_id: branchId,
            name,
            scenes,
            scripts_concatenate: false,
            optimize_scene_format: true,
            scripts_minify: false,
            scripts_sourcemaps: false
        }
    });

    const id = response.data.id;
    while (response.data.status !== 'complete') {
        await sleep(3000);
        response = await axios({
            method: 'GET',
            url: 'https://playcanvas.com/api/jobs/' + id,
            headers: { 'Authorization': 'Bearer ' + token }
        });
    }

    response = await axios({
        method: 'GET',
        url: response.data.data.download_url,
        headers: { 'Authorization': 'Bearer ' + token },
        responseType: 'arraybuffer',
    });

    const file = new zip(Buffer.from(response.data));
    file.extractAllTo(outDir, true);
    console.log('Downloaded build: ' + outDir);
})();