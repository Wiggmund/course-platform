class RequestError extends Error {
	constructor(details: string) {
		super(`Failed to fetch course or course.\n\tDetails: ${details}`);
	}
}

export default RequestError;
