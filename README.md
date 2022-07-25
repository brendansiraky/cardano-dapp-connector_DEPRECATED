# cardano-dapp-connector

### Cardano Dapp Connector with Authentication.

An example of the wallet connector standard CIP30 being implemented in order for a user to "connect" to the dapp via their Cardano wallet.

It also implements the CIP-0008 signing spec in order for a user to authenticate via signing a message. On successfully doing so, and being validated that they did so on the backend, the user will be returned a Bearer token, in which they will be able to access secure endpoints, just as they would with any other type of signup/login authentication.

The motivation of this dapp is to show the powerful feature of connecting **and authenticating**, which is prevelant in other ecosystem, but not as much yet in the Cardano ecosystem.

## License
[MIT](https://choosealicense.com/licenses/mit/)