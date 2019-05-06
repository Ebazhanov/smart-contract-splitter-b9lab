const chai = require('chai');
chai.use(require('chai-as-promised')).should();

const Splitter = artifacts.require("Splitter");

contract('Splitter', accounts => {
    // Setup accounts
    const [owner, sender, Bob, Alice] = accounts;

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
            assert.strictEqual(txObject.receipt.status, 0, 'Split failed');
        });

    });

    describe('Pausing, resuming and self destructing functionality', () => {

        it('Should be able to withdraw only when contract is not paused', async () => {
            // Splitting
            await splitterInstance.split(Bob, Alice, {from: sender, value: 100});

            // Pausing
            await splitterInstance.pause({from: owner});

            // Withdrawing
            await splitterInstance.withdraw({from: Bob}).should.be.rejectedWith(Error);

            // Resuming
            await splitterInstance.resume({from: owner});

            // Withdrawing 1
            txObject = await splitterInstance.withdraw({from: Bob});
            assert(txObject.receipt.status, 'Withdrawal failed when contract was resumed');

            // Withdrawing 2
            txObject = await splitterInstance.withdraw({from: Alice});
            assert(txObject.receipt.status, 'Withdrawal failed when contract was resumed');
        });

    });

});
