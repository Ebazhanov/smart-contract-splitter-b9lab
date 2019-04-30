const chai = require('chai');
chai.use(require('chai-as-promised')).should();

const Splitter = artifacts.require("Splitter");

contract('Splitter', accounts => {
    // Setup accounts
    const sender = accounts[1];
    const Bob = accounts[2];
    const Alice = accounts[3];

    let splitterInstance;

    beforeEach(async () => {
        splitterInstance = await Splitter.new();
    });

    describe('Splitting functionality', () => {

        it('Should split amount evenly', async () => {
            // Split sent ether between receivers.
            const amount = 10;
            const txObject = await splitterInstance.split(Bob, Alice, {from: sender, value: amount});
            assert(txObject.receipt.status, 'Split failed');

            // Checking if everything as expected
            await checkFunds(Bob, amount / 2);
            await checkFunds(Alice, amount / 2);

            it('Should split odd number of ether correctly', async () => {
                // Split sent ether between receivers.
                const amount = 11;
                const txObject = await splitterInstance.split(Bob, Alice, {from: sender, value: amount});
                assert(txObject.receipt.status, 'Split failed');
            });
        });

    });

});
