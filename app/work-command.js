const { readWorkYML } = require("../utils");
const { getWorkspacePath } = require("./helper");
const shell = require('shelljs');

function build(workName, args) {
    const workspacePath = getWorkspacePath(workName);
    console.log('build: ', workName, workspacePath);
    const origin = 'origin';
    
    // "ref": "refs/heads/release",
    // 先拉git再读my-ci.yml判断是否触发  
    // const workConfig = readWorkYML(workName);

    let commitId = args.head_commit.id;
    shell.cd(workspacePath);
    console.log('shell cd: ', shell.pwd().toString());
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }

    // --- Git -----------------------------------------
    shell.exec(`
        git status
        git fetch ${origin}
        git reset --hard ${commitId}
    `).to('.my-ci/work.log');

    // --- Script -------------------------------------
    // const workConfig = readWorkYML(workName);
    // console.log(job.script)
    const job = matchedJob(workName, args.ref);
    console.log('matched!!!!: ', job)
    if (!job) return;

    let jobScripts = job.script || [];
    jobScripts.forEach((script) => {
        shell.exec(script).toEnd('.my-ci/work.log');
    })
}

function matchedJob(workName, ref) {
    const workConfig = readWorkYML(workName);
    console.log('workConfig', workConfig);
    const matchedJobArr = workConfig.jobs.filter((job) => {
        // job.only
        // console.log('job.only', job.only);
        let onlyStr = job.only;
        if (Array.isArray(onlyStr)) onlyStr = job.only[0];
        if (onlyStr) {
            // 用slice删掉前后两个斜杠（为了和gitlab-ci.yml保持兼容)
            onlyStr = onlyStr.slice(1, -1);
            let onlyReg = new RegExp(onlyStr);
            console.log(onlyReg, ref);
            return onlyReg.test(ref);
        }
    })
    return matchedJobArr[0];
}

function stop(workName) {
    const workspacePath = getWorkspacePath(workName);
    console.log('stop: ', workName, workspacePath);
}

function status(workName) {
    const workspacePath = getWorkspacePath(workName);
    console.log('status: ', workName, workspacePath);
}

module.exports = {
    build,
    stop,
    status,
}