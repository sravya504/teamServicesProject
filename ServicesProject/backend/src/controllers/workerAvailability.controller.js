



import WorkerAvailability from "../models/WorkerAvailability.model.js";

// Set or update today's availability
export const setAvailability = async (req, res) => {
  try {
    const { workerId, availability } = req.body;

    // Check if there is an entry for today
    let todayEntry = await WorkerAvailability.findOne({
      workerId,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (!todayEntry) {
      // create new entry
      todayEntry = new WorkerAvailability({
        workerId,
        todayAvailability: availability,
      });
    } else {
      // update existing
      todayEntry.todayAvailability = availability;
    }

    await todayEntry.save();

    res.json({
      msg: `Availability set to ${availability}`,
      todayAvailability: todayEntry.todayAvailability,
      assignedWork: todayEntry.assignedWork,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get worker's status
// export const getStatus = async (req, res) => {
//   try {
//     const { workerId } = req.params;

//     const todayEntry = await WorkerAvailability.findOne({
//       workerId,
//       date: {
//         $gte: new Date().setHours(0, 0, 0, 0),
//         $lte: new Date().setHours(23, 59, 59, 999),
//       },
//     });

//     if (!todayEntry) return res.status(404).json({ msg: "No availability found for today" });

//     res.json({
//       todayAvailability: todayEntry.todayAvailability,
//       assignedWork: todayEntry.assignedWork,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// Get worker's status
export const getStatus = async (req, res) => {
  try {
    const { workerId } = req.params;

    const todayEntry = await WorkerAvailability.findOne({
      workerId,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 999),
      },
    }).populate("assignedWork", "name contactInfo address"); 
    // 👆 only select needed fields

    if (!todayEntry) {
      return res.status(404).json({ msg: "No availability found for today" });
    }

    res.json({
      todayAvailability: todayEntry.todayAvailability,
      assignedWork: todayEntry.assignedWork, // now includes customer details
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
