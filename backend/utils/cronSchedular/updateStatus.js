import Interview from "../../models/InterviewModel.js";

export async function updateStatus() {
    const now = new Date();
    let changes = 0;
    // 1️⃣ Mark active interviews that reached endTime as completed
    const res = await Interview.updateMany(
        { scheduledStatus: "active", endTime: { $lte: now } },
        { $set: { scheduledStatus: "completed" } }
    );

    changes += res.modifiedCount;

    // update scheduled status to active 
    const x = await Interview.updateMany(
        {
            scheduledStatus: "scheduled",
            scheduledDate: { $lte: now },             // today or earlier
            activeWindow: { $gt: now },            // still inside 24h window
        },
        { $set: { scheduledStatus : "active" } }
    );

    const z = await Interview.updateMany(
        { 
            scheduledStatus: { $in: ["scheduled", "active"] },
            sessionStatus : "attempted"
        },
        { $set: { scheduledStatus : "completed" } }
    );
    changes += z.modifiedCount;


    // 2️⃣ Expire interviews past their 24-hour window (if never started)
    const y = await Interview.updateMany(
        { scheduledStatus: { $in: ["scheduled", "active"] }, activeWindow: { $lte: now } },
        { $set: { scheduledStatus: "completed" } }
    );
    changes += y.modifiedCount;

    console.log(`✅ Completed updated: ${changes}`);

}

