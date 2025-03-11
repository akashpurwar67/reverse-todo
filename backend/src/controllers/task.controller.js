import User from '../models/user.model.js';
import Task from '../models/task.model.js';
export const posttask = async (req, res) => {
    const { task,category } = req.body;
    try {
        if (!task) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const newTask = new Task({
            userId: req.user._id,
            task,
            category,
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.log('Error in posttask: ', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const gettask = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Start of the next day

        const tasks = await Task.find({
            userId: req.user._id,
            createdAt: { $gte: today, $lt: tomorrow } // Between today and tomorrow
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in gettask:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getstreak = async (req, res) => {
    try {
        // Fetch tasks sorted by creation date in descending order
        const tasks = await Task.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        if (tasks.length === 0) {
            return res.json({ streak: 0 });
        }

        let streak = 0;
        let lastDate = new Date();
        lastDate.setHours(0, 0, 0, 0); // Normalize time to midnight

        let uniqueDays = new Set();

        for (let task of tasks) {
            let completedDate = new Date(task.createdAt);
            completedDate.setHours(0, 0, 0, 0); // Normalize to midnight

            if (uniqueDays.has(completedDate.getTime())) {
                continue; // Skip if task already counted for this day
            }
            uniqueDays.add(completedDate.getTime());

            const diffDays = (lastDate - completedDate) / (1000 * 60 * 60 * 24);
            if (diffDays === 0 || diffDays === 1) {
                streak++;
            } else {
                break; // If a day is missed, streak ends
            }

            lastDate = completedDate; // Update lastDate
        }

        res.json({ streak });
    } catch (error) {
        res.status(500).json({ message: "Error calculating streak" });
    }
};


export const deleteTask = async (req, res) => {
  try {
      const { id } = req.params;
      
      const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      } 

      res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
      console.log('Error in deleteTask:', error.message);
      res.status(500).json({ message: 'Server Error' });
  }
};




export const getReport = async (req, res) => {
    try {
        const userId = req.user.id;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        let tasks = await Task.find({ userId }).sort({ createdAt: -1 });

        const filteredTasks = tasks.filter(task => new Date(task.createdAt) >= sevenDaysAgo);
        if (filteredTasks.length < 7) {
            tasks = tasks.reverse();
        } else {
            tasks = filteredTasks.reverse();
        }

        const report = {};
        tasks.forEach(task => {
            const date = new Date(task.createdAt).toISOString().split("T")[0];
            if (!report[date]) report[date] = { count: 0, tasks: [] };
            report[date].count += 1;
            report[date].tasks.push(task.task); // Store task descriptions
        });

        const totalDays = Object.keys(report).length;
        const totalTasks = tasks.length;
        const avgTasksPerDay = totalDays > 0 ? (totalTasks / totalDays).toFixed(2) : 0;

        res.json({ report, totalTasks, avgTasksPerDay });
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ message: "Error fetching report" });
    }
};
