App = {
  web3Provider: null,
  contracts: {},



  //First-Step!
  init: function() {

    //Load guns.
    $.getJSON('../guns.json', function(data) {
      var gunsRow = $('#gunsRow');
      var gunTemplate = $('#gunTemplate');

      for (i = 0; i < data.length; i ++) {
        gunTemplate.find('.panel-title').text(data[i].name);
        gunTemplate.find('img').attr('src', data[i].picture);
        gunTemplate.find('.gun-breed').text(data[i].breed);
        gunTemplate.find('.gun-age').text(data[i].age);
        gunTemplate.find('.gun-location').text(data[i].location);
        gunTemplate.find('.btn-get').attr('data-id', data[i].id);

        gunsRow.append(gunTemplate.html());
      }
    });

    return App.initWeb3();
  },


  //Second-Step!
  initWeb3: function() {

    //For situation that user don't have Metamask att all!
    if (typeof web3 !== undefined) {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
    },



  //Third-Step!
  initContract: function() {

    $.getJSON("Buying.json", function(data){
      var buyingArtifact = data;

      App.contracts.buying = TruffleContract(buyingArtifact);

      App.contracts.buying.setProvider(App.web3Provider);

      return App.markGeted();
    });

    return App.bindEvents();
  },



  bindEvents: function() {
    $(document).on('click', '.btn-get', App.handleGet);
  },



  //Forth-Step!
  markGeted: function(buyers, account) {

    App.contracts.buying.deployed().then(function(instace){
      return instace.getBuyers.call();
    }).then(function(buyers){
      for (let i = 0; i < buyers.length; i++) {
        if(!web3.toBigNumber(buyers[i]).isZero()){
          $('.panel-gun').eq(i).find("button").text("Success").attr("disabled", true);
        }
      }
    }).catch(function(error){
      console.log(error.massage);
    });

  },



  //Fifth-Step!
  handleGet: function(event) {
    event.preventDefault();

    var gunId = parseInt($(event.target).data('id'));

    web3.eth.getAccounts(function(error, accounts){
      if(error){
        console.log(error);
      }

      App.contracts.buying.deployed().then(function(instance){
        return instance.get.sendTransaction(gunId, {from: accounts[0]})
      }).then(function(result){
        return App.markGeted();
      }).catch(function(error){
        console.log(error.massage);
      });

    });

  }

};



$(function() {
  $(window).load(function() {
    App.init();
  });
});
