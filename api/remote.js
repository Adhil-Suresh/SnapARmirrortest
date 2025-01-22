// Define the Remote API Service
const remoteApiService: RemoteApiService = {
    // Your API Spec ID
    apiSpecId: "43f1212b-3cf6-4b12-a857-c42f32696169",

    // Define how to handle requests
    getRequestHandler(request) {
        // Check if the endpoint ID matches the expected one
        //if (request.endpointId !== "apiremote") return;

        // Handle the request
        return (reply) => {
            fetch("https://snap-a-rmirrortest.vercel.app/api/remote", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            })
                .then((res) => res.text()) // Read the response as text
                .then((res) =>
                    reply({
                        status: "success",
                        metadata: {},
                        body: new TextEncoder().encode(res), // Encode the body
                    })
                )
                .catch((error) => {
                    console.error("API Call Failed:", error);
                    reply({
                        status: "error",
                        metadata: {},
                        body: new TextEncoder().encode(
                            JSON.stringify({ error: "API call failed" })
                        ),
                    });
                });
        };
    },
};

// Bootstrap Camera Kit
const cameraKit = await bootstrapCameraKit(configuration, (container) =>
    container.provides(
        Injectable(
            remoteApiServicesFactory.token,
            [remoteApiServicesFactory.token] as const,
            (existing: RemoteApiServices) => [...existing, remoteApiService]
        )
    )
);