import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTaskStore } from "../store/useTaskStore";

const Report = () => {
    const {reportData,fetchReport} = useTaskStore();
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Completion Report</h1>

            {reportData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <p className="mb-2 text-lg">📌 Total Tasks: <b>{reportData.totalTasks}</b></p>
                    <p className="mb-2 text-lg">📊 Avg Tasks per Day: <b>{reportData.avgTasksPerDay}</b></p>

                    {/* Task Breakdown */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-3">📅 Tasks per Day</h2>
                        {Object.entries(reportData.report).map(([date, data]) => (
                            <div key={date} className="border-b pb-2 mb-2">
                                <div className="flex justify-between text-gray-700 font-medium">
                                    <span>{date}</span>
                                    <span>{data.count} tasks</span>
                                </div>
                                <ul className="list-disc ml-5 text-gray-600">
                                    {data.tasks.map((task, index) => (
                                        <li key={index}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Chart */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-3">📈 Visualization</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={Object.entries(reportData.report).map(([date, data]) => ({ date, count: data.count }))}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#4A90E2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        🔙 Back
                    </button>
                </div>
            ) : (
                <p className="text-gray-600">Loading report...</p>
            )}
        </div>
    );
};

export default Report;
