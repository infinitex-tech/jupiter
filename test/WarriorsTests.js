const infeos = require('infeos').init();

const EOSIOApi = infeos.EOSIOApi;   
const EOSIORpc = infeos.EOSIOApi.rpc;

describe('Warrior Contract Tests', function () {
    let eosioTest;
    let account;
    let jupiterContractInstance;
    let isContractDeployed;

    before(async () => {
        eosioTest = new infeos.EOSIOTest();
        account = eosioTest.deployerAccount;

        /**
         * At the moment you can choose how & when the smart contract will be deployed.
         * We advise you to deploy your contract in the deploy script and to get its instance in the test as the example below
         */
        if (false) {
            /**
             * Deploying the contract if not yet deployed
             */
            let jupiterContract = new infeos.EOSIODeployer('jupiter', account);
            jupiterContractInstance = await jupiterContract.deploy();

            isContractDeployed = true;
        } else {
            /**
             * Loading already deployed smart contract
             */
            jupiterContractInstance = new infeos.EOSIOContract('jupiter', account);
        }
    });
});