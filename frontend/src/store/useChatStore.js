import {create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance} from "../lib/axios";
import { getMessages, sendMessage } from "../../../backend/src/controllers/message.controller";

export const useChatStore = create((set) => ({
    message: [],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true});
        try{
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data});

        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading: false });
        }
    },

    getMessages: async(userId) => {
        set({ isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
        }catch (error) {
            toast.error(error.response.data.message);

        }finally{
            set({ isMessagesLoading: false})
        }
    },

    sendMessage: async (message) => {
        const { selectedUser ,messages} = get();

        try{
            const res = await axiosInstance.post(`/messages/${selectedUser._id}`,  messageData);
            set({ messages: [...messages, res.data]});

        }catch(error){
            toast.error(error.response.data.message);
        }
    },







    setSelectedUser: (user) => {
        set({ selectedUser: user});
    }
}))
