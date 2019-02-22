const infeos = require('infeos').init();
const config = require('./../config/infeos_config.json');

const deploy = async () => {
    let accountDeployer = new infeos.EOSIOAccount(config.account.name, config.account.permissions.system, config.account.permissions.system);

    let jupiterContract = new infeos.EOSIODeployer(config.masterContract, accountDeployer, true);
    let jupiterContractInstance = await jupiterContract.deploy();
};

module.exports = {
    run: deploy
};