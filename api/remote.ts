type Request = {
  endpointId: string;
  queryParameters?: {
    action?: string;
    payload?: string;
  };
};

type ReplyFunction = (response: {
  status: 'success' | 'error';
  metadata: Record<string, any>;
  body: Uint8Array;
}) => void;

type Configuration = Record<string, any>;

type Container = {
  provides: (
    token: any,
    dependencies: readonly any[],
    factory: (existing: any[]) => any[]
  ) => void;
};

// Define the remoteApiService with type annotations
const remoteApiService = {
  // Your API Spec ID
  apiSpecId: '43f1212b-3cf6-4b12-a857-c42f32696169',

  // Define how to handle requests
  getRequestHandler(request: Request) {
    return (reply: ReplyFunction): void => {
      console.error('Error bootstrapping Camera:');

      // Ensure endpointId matches expected value
      if (request.endpointId !== 'apiremote') {
        reply({
          status: 'error',
          metadata: {},
          body: new TextEncoder().encode(
            JSON.stringify({ error: 'Invalid endpoint ID' })
          ),
        });
        return;
      }

      // Construct the URL with query parameters
      const action = request.queryParameters?.action || 'defaultAction';
      const payload = request.queryParameters?.payload || 'defaultPayload';
      const url = `https://snap-a-rmirrortest.vercel.app/api/remote?action=${encodeURIComponent(
        action
      )}&payload=${encodeURIComponent(payload)}`;

      // Make the API request
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.text(); // Read the response as text
        })
        .then((res) =>
          reply({
            status: 'success',
            metadata: {},
            body: new TextEncoder().encode(res), // Encode the body
          })
        )
        .catch((error) => {
          console.error('API Call Failed:', error);
          reply({
            status: 'error',
            metadata: {},
            body: new TextEncoder().encode(
              JSON.stringify({ error: 'API call failed' })
            ),
          });
        });
    };
  },
};

// Bootstrap Camera Kit
(async () => {
  try {
    const configuration: Configuration = {}; // Replace with your actual configuration object

    const cameraKit = await bootstrapCameraKit(
      configuration,
      (container: Container) =>
        container.provides(
          Injectable(
            remoteApiServicesFactory.token,
            [remoteApiServicesFactory.token] as const,
            (existing: any[]) => [...existing, remoteApiService]
          )
        )
    );
  } catch (error: any) {
    console.error('Error bootstrapping Camera Kit:', error.message);
  }
})();
