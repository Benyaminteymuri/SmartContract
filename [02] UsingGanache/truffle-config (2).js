


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    /*develop: {
      port: 7545
    }*/
  }
};


/*module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      from: "0x06191d83Ef73cdE0411803B8D8315a1c79f713b6",
      network_id: "*" ,// Match any network id
      websockets: true,
      gas: 18900000000000000000000000000
    },
    develop: {
      port: 7545
    },
};*/
