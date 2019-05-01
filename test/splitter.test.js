const chai = require('chai');
chai.use(require('chai-as-promised')).should();

const Splitter = artifacts.require("Splitter");

contract('Splitter', accounts => {
    // Setup accounts
    const [sender, Bob, Alice] = accounts;

    let splitterInstance;

    beforeEach(async () => {
        splitterInstance = await Splitter.new({ from: sender });
    });

    describe('Splitting functionality', () => {
        it('Should split amount evenly', async () => {
            // Split sent ether between receivers.
            const amount = 10;
            const txObject = await splitterInstance.split(Bob, Alice, {from: sender, value: amount});
            assert.strictEqual(txObject.receipt.status, 1, 'Split failed');

            // Checking if everything as expected
            await checkFunds(Bob, amount / 2);
            await checkFunds(Alice, amount / 2);
        });

        it('Should split odd number of ether correctly', async () => {
            // Split sent ether between receivers.
            const amount = 11;
            const txObject = await splitterInstance.split(Bob, Alice, {from: sender, value: amount});
            assert(txObject.receipt.status, 'Split failed');
        });

    });

});
