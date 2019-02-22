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

    it('should create a new noble warrior hero', async () => {
        let warriorName = 'Carol Danvers';
        let colony = 'A30';
        let race = 'kree';

        await jupiterContractInstance.crwarrior(warriorName, colony, race);
        let warriorsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'warrior'});
        let warriors = warriorsTable['rows'];
        let warrior = warriors[warriors.length - 1];

        assert.strictEqual(warrior.name, warriorName, `Invalid warrior name. [${warriorName}] was expected but [${warrior.name}] was returned.`);
        assert.strictEqual(warrior.colony, colony, `Invalid colony. [${colony}] was expected but [${warrior.colony}] was returned.`);
        assert.strictEqual(warrior.race, race, `Invalid race. [${race}] was expected but [${warrior.race}] was returned.`);
    });

    it('should add new ship to existing warrior', async () => {
        let warriorName = 'Peter Quill';
        let colony = 'Earth';
        let race = 'human';

        await jupiterContractInstance.crwarrior(warriorName, colony, race);
        let warriorsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'warrior'});
        let warriors = warriorsTable['rows'];
        let warrior = warriors[warriors.length - 1];

        assert.strictEqual(warrior.name, warriorName, `Invalid warrior name. [${warriorName}] was expected but [${warrior.name}] was returned.`);
        assert.strictEqual(warrior.colony, colony, `Invalid colony. [${colony}] was expected but [${warrior.colony}] was returned.`);
        assert.strictEqual(warrior.race, race, `Invalid race. [${race}] was expected but [${warrior.race}] was returned.`);

        let shipName = 'Benatar';

        await jupiterContractInstance.createship(shipName);
        let shipsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'ship'});
        let ships = shipsTable['rows'];
        let ship = ships[ships.length - 1];

        assert.strictEqual(ship.ship_name, shipName, `Invalid ship name. [${shipName}] was expected but [${ship.ship_name}] was returned.`);

        await jupiterContractInstance.addship(ship.id, warrior.id);

        warriorsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'warrior'});
        warriors = warriorsTable['rows'];
        warrior = warriors[warriors.length - 1];

        assert.strictEqual(warrior.ship_id, ship.id, `Invalid ship id. [${ship.id}] was expected but [${warrior.ship_id}] was returned.`);
    });

    it('should throw when adding a non-existing ship to a warrior', async () => {
        let warriorName = 'David';
        let colony = 'Earth';
        let race = 'human';

        await jupiterContractInstance.crwarrior(warriorName, colony, race);
        let warriorsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'warrior'});
        let warriors = warriorsTable['rows'];
        let warrior = warriors[warriors.length - 1];

        let nonExistingShipId = 9999;

        await eosioTest.expectThrow(async () => {
            await jupiterContractInstance.addship(nonExistingShipId, warrior.id);
        }, 'Expected to throw when adding a non-existing ship');
    });
});