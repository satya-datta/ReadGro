const connection = require("../backend");

exports.CreateWR = (req, res) => {
    const { user_id } = req.params; // Get user_id from URL
    const { withdrawal_amount } = req.body; // Get withdrawal amount from request body

    if (!withdrawal_amount || isNaN(withdrawal_amount) || withdrawal_amount <= 0) {
        return res.status(400).json({ message: "Invalid withdrawal amount" });
    }

    // Step 1: Retrieve user's wallet balance
    const walletQuery = "SELECT balance FROM wallet WHERE user_id = ?";
    connection.query(walletQuery, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching wallet balance:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Wallet not found for this user" });
        }

        const walletBalance = results[0].balance;

        // Step 2: Check if balance is sufficient
        if (walletBalance < withdrawal_amount) {
            return res.status(400).json({ message: "Insufficient funds in wallet" });
        }

        // Step 3: Insert withdrawal request with status 'pending' and current timestamp
        const insertQuery = "INSERT INTO withdrawal_requests (user_id, amount, status, created_at) VALUES (?, ?, 'pending', NOW())";
        connection.query(insertQuery, [user_id, withdrawal_amount], (err, result) => {
            if (err) {
                console.error("Error inserting withdrawal request:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            return res.status(201).json({ message: "Withdrawal request submitted successfully", status: "pending" });
        });
    });
};

exports.getWithdrawalRequests = (req, res) => {
    const { user_id } = req.params; // Get user_id from URL

    // Fetch withdrawal requests for the given user_id
    const requestQuery = "SELECT id, amount, status, created_at FROM withdrawal_requests WHERE user_id = ? ORDER BY created_at DESC";
    connection.query(requestQuery, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching withdrawal requests:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No withdrawal requests found for this user" });
        }

        return res.status(200).json({ withdrawalRequests: results });
    });
};
