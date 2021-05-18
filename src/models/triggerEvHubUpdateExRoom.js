// const { BlobServiceClient, ContainerClient } = require("@azure/storage-blob");
const { EventData, EventHubProducerClient } = require("@azure/event-hubs");
const eventHub = require("../../setting.json").eventHub;

const producer = new EventHubProducerClient(
	eventHub.eventHubConnection,
	eventHub.eventHubName
);

async function triggerEvHubUpdateExRoom(hosId) {
	const batch = await producer.createBatch({
		partitionId: eventHub.partitionId,
	});
	const msg = {
		type_request: eventHub.exRoomRequestType,
		device_ID: eventHub.deviceId,
		hospital_ID: hosId.toString(),
		request_id: eventHub.exRoomRequestId,
	};
	batch.tryAdd({ properties: msg, body: "" });

	// Send the batch to the event hub.
	await producer.sendBatch(batch);

	// Close the producer client.
	await producer.close();
	// await callback(1);
	// console.log("A batch of three events have been sent to the event hub");
}

module.exports = triggerEvHubUpdateExRoom;
