# cardano-dapp-connector

### Cardano Dapp Connector with Authentication.

An example of the wallet connector standard [CIP30](https://cips.cardano.org/cips/cip30/) being implemented in order for a user to "connect" to the dapp via their Cardano wallet.

It also implements the [CIP-0008](https://developers.cardano.org/docs/governance/cardano-improvement-proposals/cip-0008/) signing spec in order for a user to authenticate via signing a message. On successfully doing so, and being validated that they did so on the [backend](https://github.com/brendansiraky/cardano-dapp-connector-backend)., the user will be returned a Bearer token, in which they will be able to access secure endpoints, just as they would with any other type of signup/login authentication.

The motivation of this dapp is to show the powerful feature of connecting **and authenticating**, which the **latter** is prevelant in other ecosystem, but not as much yet in the Cardano ecosystem.

Check out a live working demo of this [here](https://www.cardanodappconnector.tech).

Check out the repo for the backend [here](https://github.com/brendansiraky/cardano-dapp-connector-backend).

## Setup

Install the packages.
```bash
npm install
```

Start the project
```bash
npm start
```