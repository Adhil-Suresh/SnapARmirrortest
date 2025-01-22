export default function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Ensure the request method is POST
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Parse request body
    const { action, payload } = req.body;

    // Validate request body
    if (!action || !payload) {
      return res.status(400).json({ message: 'Invalid request payload' });
    }

    // Log the action and payload (for debugging)
    console.log(`Action received: ${action}`);
    console.log('Payload:', payload);

    // Respond to the client
    res.status(200).json({
      status: 'success',
      message: 'Data processed successfully!',
      data: { customKey: 'customValue' },
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
