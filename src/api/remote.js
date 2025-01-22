export default function handler(req, res) {
    if (req.method === "POST") {
        const { action, payload } = req.body;

        console.log(Action received: ${action});
        console.log(Payload:, payload);

        // Respond to the Lens
        res.status(200).json({
            status: "success",
            message: "Data processed successfully!",
            data: { customKey: "customValue" }
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}