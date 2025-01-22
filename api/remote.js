export default function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      return res.status(204).end(); // No content
    }

    // Ensure the request method is GET
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Extract parameters from query, headers, or path
    const action = req.query.action || '';
    const payload = req.query.payload || '';

    // Validate parameters
    if (!action || !payload) {
      return res.status(400).json({ message: 'Invalid request parameters' });
    }

    // Log the action and payload (for debugging)
    console.log(`Action received: ${action}`);
    console.log('Payload:', payload);

    // Respond to the client
    res.status(200).json({
      status: 'success',
      message: 'Data processed successfully!',
      data: { action, payload },
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Server Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
