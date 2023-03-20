const Buying = artifacts.require("Buying");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("Buying", function(accounts) {

    describe("First GP of test", async() => {

        let instance;

        //"get a gun using accounts[0]"
        before(async() => {

            instance = await Buying.deployed();

        });

        it("User should get a gun", async() => {
            await instance.get.sendTransaction(8, { from: accounts[0] });
            let buyer = await instance.buyers.call(8);
            assert.equal(buyer, accounts[0], "Incorrect owner address!");
        });

        it('Should get buyer address by gun id in array!', async() => {
            let buyers = await instance.getBuyers.call();
            assert.equal(buyers[8], accounts[0], "Owner of gun id should be recorder in the array!");
        });

        it('Sholud throw if invalid gun id is given!', async() => {

            try {
                await instance.get.sendTransaction(17, {from: accounts[0]});
                assert.fail(true, false, "This function didn't throw!");
            } catch (error) {
                assert.include(String(error), "revert", `Expected "revert" but insted got ${error}`);
            }

        });

    });

});