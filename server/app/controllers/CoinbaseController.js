const model = require("../models/TransactionModel.js");
var Webhook = require('coinbase-commerce-node').Webhook;
const config = require('../config/config');
var Tx = require('ethereumjs-tx');
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER_URL));

exports.checkoutCharges = (req, res) => {
  var event;
  // return res.status(200).send('Webhook Error:' + JSON.stringify(req.body).toString());
	console.log(config.webhookSecret);
  // return getCodeByToken('2DZ7MXVM').then((data) => {
  //   console.log(data);
  //   updateTransactionFlag(data.code, 'confirmed').then(data1 => {
  //     return res.send(200, data1);
  //   }).catch(err1 => {
  //     return res.status(200).send('Error is shown');
  //   });
  // }).catch(err => {
  //   return res.status(200).send('Error is shown');
  // });
  // sendCoin('0xB6f120D5AEE87768bD47d17adC9e1B2C9BDEdD49', '100');
	try {
		event = Webhook.verifyEventBody(
			JSON.stringify(req.body).toString(),
			req.headers['x-cc-webhook-signature'],
			config.webhookSecret
		);
	} catch (error) {
		console.log('Error occured', error);
		return res.status(403).send('Webhook Error:' + error.message);
	}

  var eventId = event.id;
  var eventCode = event.data.code;
  var eventType = event.type;

  if (eventType == 'charge:confirmed') {
    getCodeByToken(eventCode).then((data) => {
      updateTransactionFlag(data.code, 'confirmed').then((data1) => {
        sendCoin(data.address, String(data.token_count));
      }).catch(err => {
        return res.status(400).send('Error is shown');
      });
    }).catch(err => {
      return res.status(400).send('Error is shown');
    });
  } else if (eventType == 'charge:failed'){
    updateTransactionFlag(data.code, 'failed').then((data1) => {
      return res.status(200).send('failed');
    }).catch(err => {
      return res.status(400).send('Error is shown');
    });
  } 

	res.status(200).send('Signed Webhook Received: ');
}

function getCodeByToken(code){
  return new Promise(function(resolve, reject){
    model.getCodeByToken(code, (err, data) => {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function updateTransactionFlag(code, flag) {
  return new Promise(function(resolve, reject){
    model.updateTransactionFlag(code, flag, (err, data) => {
      console.log(err, data);
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function sendCoin(toAddress, amount) {
  console.log(1);
  var myAddress = config.MY_WALLET_ADDRESS;
  var privateKey = config.MY_WALLET_PRIVATE_KEY;
  var abiArray = JSON.parse(config.ABI);
  var contractAddress = config.CONTRACT_ADDRESS

  web3.eth.accounts.wallet.add(privateKey);
  contract = new web3.eth.Contract(abiArray, contractAddress)

  try {
    let receipt = await contract.methods.transfer(toAddress, web3.utils.numberToHex(web3.utils.toWei(amount, 'ether'))).send({ 
      from: myAddress,
      gasPrice: '1000000000000',
      gas: '5100000',
    });

    let res = {
      success: true,
      block: receipt.blockNumber,
      txHash: receipt.transactionHash
    };

    console.log(res);

    return res;

  } catch(err) {
    console.log('error: ', err);
    return {
      success: false
    }
  }
}