
const catFactsService: RemoteApiService = {
    apiSpecId: "03d765c5-20bd-4495-9a27-30629649cf57",

    getRequestHandler(request) {
        if (request.endpointId !== "fact") return;

        return (reply) => {
            fetch("https://catfact.ninja/fact", {
                headers: {
                    Accept: "application/json",
                },
            })
                .then((res) => res.text())
                .then((res) =>
                    reply({
                        status: "success",
                        metadata: {},
                        body: new TextEncoder().encode(res),
                    })
                );
        };
    },
};

const cameraKit = await bootstrapCameraKit(configuration, (container) =>
    container.provides(
        Injectable(
            remoteApiServicesFactory.token,
            [remoteApiServicesFactory.token] as const,
            (existing: RemoteApiServices) => [...existing, catFactsService]
        )
    )
);
