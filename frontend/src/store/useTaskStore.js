import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
export const useTaskStore = create((set) => ({
    tasks: [],
    streak: 0,
    reportData: null,
    isPostingTask: false,
    isGettingTask: false,
    isGettingStreak: false,

    postTask: async (data) => {
        set({isPostingTask: true});
        try {
            await axiosInstance.post('/task/posttask', data);
            set({isPostingTask: false});
            toast.success("Task posted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            set({isPostingTask: false});
        }
    },

    getTask: async () => {
        set({isGettingTask: true});
        try {
            const res = await axiosInstance.get('/task/gettask');
            set({tasks: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isGettingTask: false});
        }
    },

    getStreak: async () => {
        set({isGettingStreak: true});
        try {
            const res = await axiosInstance.get('/task/getstreak');
            set({streak: res.data.streak});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isGettingStreak: false});
        }
    },
    deleteTask: async (id) => {
        try {
            await axiosInstance.delete(`/task/deletetask/${id}`); // Use DELETE request
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== id),
            }));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting task");
        }
    },
    fetchReport: async () => {
        try {
            const res = await axiosInstance.get('/task/report');
            set({reportData: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    

}));