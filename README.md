# celestia-pfb-webui

The PayForBlob Web UI is a graphical user interface that allows users to submit PayForBlob transactions to a Celestia node and view the response from the node. It provides a convenient way to interact with the `/submit_pfb` endpoint of the Celestia Gateway API.

## Getting Started

To use the PayForBlob Web UI, follow these steps:

1. Clone the repository: 
    ```shell
    git clone https://github.com/GImbrailo/celestia-pfb-webui.git
    ```
2. Install dependencies:
    ```shell
    npm install
    ```
3. Start the server:
    ```shell
    npm start
    ```
4. Open a web browser and navigate to `http://localhost:3000` (or the appropriate URL if you've configured a different port)
5. Fill in the transaction details in the provided form and click the "Submit" button.
6. Wait for the response from the Celestia node to be displayed on the same page. A successful response should look something like the following
    ```json
    {
    "height": 462831,
    "txhash": "DBCA0BE4CD68138B2A0907A2BC759E78F7509B48E5007E11FDF539586E03FCA4",
    "data": "122A0A282F63656C65737469612E626C6F622E76312E4D7367506179466F72426C6F6273526573706F6E7365",
    "raw_log": "[{\"msg_index\":0,\"events\":[{\"type\":\"celestia.blob.v1.EventPayForBlobs\",\"attributes\":[{\"key\":\"blob_sizes\",\"value\":\"[44]\"},{\"key\":\"namespace_ids\",\"value\":\"[\\\"YnJhaWxvAAA=\\\"]\"},{\"key\":\"signer\",\"value\":\"\\\"celestia1vdjkcetnw35kzvt4wa4h5ctswamnqmfcd34kvwpe09ukwenc8pnx263hwgm85vm4xgmxxvmkdfcslndyrp\\\"\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"/celestia.blob.v1.MsgPayForBlobs\"}]}]}]",
    "logs": [
        {
        "msg_index": 0,
        "events": [
            {
            "type": "celestia.blob.v1.EventPayForBlobs",
            "attributes": [
                {
                "key": "blob_sizes",
                "value": "[44]"
                },
                {
                "key": "namespace_ids",
                "value": "[\"YnJhaWxvAAA=\"]"
                },
                {
                "key": "signer",
                "value": "\"celestia1vdjkcetnw35kzvt4wa4h5ctswamnqmfcd34kvwpe09ukwenc8pnx263hwgm85vm4xgmxxvmkdfcslndyrp\""
                }
            ]
            },
            {
            "type": "message",
            "attributes": [
                {
                "key": "action",
                "value": "/celestia.blob.v1.MsgPayForBlobs"
                }
            ]
            }
        ]
        }
    ],
    "gas_wanted": 80000,
    "gas_used": 63468,
    ...
    }
    ```

## Dependencies

The following dependencies are used in this project:

- Express: Fast, unopinionated web framework for Node.js
- Axios: Promise-based HTTP client for making HTTP requests
- EJS: Embedded JavaScript templates for rendering HTML views


## Transaction Details

The PayForBlob Web UI requires users to fill in the following transaction details:

1. **Namespace ID**: The plane text namespace ID. This value will be hex encoded before being sent to the Celestia node. The first 8 bytes of the encoded value will be used as the namespace ID and if the value is less than 8 bytes, it will be padded with zeros.
2. **Data**: The data for the PayForBlob transaction. The data entered here must be in plane text and  will be hex encoded before being sent to the Celestia node.
3. **Gas Limit**: The gas limit for the transaction.
4. **Fee**: The fee to be paid for the transaction.
5. **Node URL**: The URL of the Celestia node to which the transaction will be submitted.

Please note that the PayForBlob Web UI assumes users are familiar with the Celestia Gateway API and have a configured Celestia node accessible via the provided Node URL.