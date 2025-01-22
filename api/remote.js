export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (for testing)
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "POST") {
        const { action, payload } = req.body;

        console.log(Action received: ${action});
        console.log("Payload:", payload);

        res.status(200).json({
            status: "success",
            message: "Data processed successfully!",
            data: { customKey: "customValue" }
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}