// const { BlobServiceClient, ContainerClient } = require("@azure/storage-blob");
const { EventData, EventHubProducerClient } = require("@azure/event-hubs");

const DEVICE_ID = "Web_Server";
const EVENT_HUB_CONNECTION =
	"Endpoint=sb://thesisehealthcare.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUeMD+PSZx675wFA4kPllGfSnMwhATPOGPPDWex5jSU=";
const EVENT_HUB_NAME = "receivemsg";

const producer = new EventHubProducerClient(
	EVENT_HUB_CONNECTION,
	EVENT_HUB_NAME
);

async function triggerEvHubPatient(userId) {
	const batch = await producer.createBatch();
	const msg = {
		type_request: "6",
		device_ID: DEVICE_ID,
		user_id: userId.toString(),
		request_id: "123"
	};
	batch.tryAdd({ properties: msg, body: "" });

	// Send the batch to the event hub.
	await producer.sendBatch(batch);

	// Close the producer client.
	await producer.close();
	// await callback(1);
	// console.log("A batch of three events have been sent to the event hub");
}

module.exports = triggerEvHubPatient;
