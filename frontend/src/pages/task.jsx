import React, { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";
import { PlusCircle, Trash2 } from "lucide-react"; // Icons for better UI

const ReverseTodo = () => {
    const { authUser } = useAuthStore();
    const { streak, tasks, postTask, getTask, getStreak, deleteTask } = useTaskStore();
    const [formData, setFormData] = useState({
        task: "",
        category: "Personal",
    });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        getTask();
        getStreak();
    }, [getStreak, getTask]);

    const addTask = async () => {
        if (!formData.task.trim()) return;
        setIsAdding(true);
        await postTask(formData);
        setFormData({ task: "", category: "Personal" });
        getTask();
        getStreak();
        setIsAdding(false);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        getTask();
        getStreak();
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 text-gray-900 p-5">
            <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">

                {/* Streak Tracker */}
                <h2 className="text-center text-blue-600 text-xl font-semibold mb-3">
                    🔥 Streak: <span className="font-bold">{streak}</span> days
                </h2>

                <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
                    Reverse To-Do List
                </h1>

                {/* Task Input Section */}
                <div className="flex items-center space-x-3 mb-6">
                    <input
                        type="text"
                        placeholder="What did you accomplish today?"
                        className="flex-1 p-4 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:ring focus:ring-blue-400 outline-none text-lg"
                        value={formData.task}
                        onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                        disabled={isAdding}
                    />
                    <select
                        className="bg-gray-100 text-gray-900 px-4 py-4 border border-gray-300 rounded-lg"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="Personal">🧑 Personal</option>
                        <option value="Study">📚 Study</option>
                        <option value="Fitness">💪 Fitness</option>
                        <option value="Work">💼 Work</option>
                    </select>
                    <button
                        onClick={addTask}
                        className={`flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg text-lg font-semibold transition duration-300 
                        ${isAdding ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 transform hover:scale-105"}
                        `}
                        disabled={isAdding}
                    >
                        <PlusCircle size={24} className="mr-2" />
                        {isAdding ? "Adding..." : "Add"}
                    </button>
                </div>

                {/* Daily Summary */}
                <p className="text-center text-blue-600 mt-3 font-medium text-lg">
                    ✅ You accomplished <span className="font-bold">{tasks.length}</span> tasks today!
                </p>

                {/* Task List */}
                <div className="mt-5 space-y-4">
                    {tasks.length === 0 && (
                        <p className="text-center text-gray-500 text-lg">No tasks yet. Start adding!</p>
                    )}

                    {tasks.map((t) => (
                        <div
                            key={t._id}
                            className="flex justify-between items-center p-5 bg-white rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition duration-300"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{t.task}</h3>
                                <span
                                    className={`text-xs font-bold px-3 py-1 rounded-full mt-1 inline-block 
                                    ${t.category === "Study" ? "bg-blue-500 text-white" :
                                        t.category === "Fitness" ? "bg-red-500 text-white" :
                                            t.category === "Work" ? "bg-purple-500 text-white" :
                                                "bg-yellow-500 text-gray-900"}
                                    `}
                                >
                                    {t.category}
                                </span>
                                <p className="text-sm text-gray-500 mt-1">{new Date(t.createdAt).toDateString()}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(t._id)}
                                className="text-red-500 hover:text-red-700 transition duration-300"
                            >
                                <Trash2 size={22} />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ReverseTodo;
