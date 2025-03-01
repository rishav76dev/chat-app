import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Fetch users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users.");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for a user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data }); // Save messages in the store
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  // Send a message
sendMessage: async (messageText) => {
    const { selectedUser, messages } = get();
   
    if (!selectedUser) {
      toast.error("No user selected.");
      return;
    }
  
    try {
      // Add "/send" to the URL path
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {
        text: messageText.text || messageText
      });
  
      if (res && res.data) {
        set({ messages: [...messages, res.data] });
      } else {
        throw new Error("Message sending failed: No data returned");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      if (error.response) {
        toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
      } else {
        toast.error("Failed to send message. Please check your network.");
      }
    }
  },
  
  

  // Subscribe to messages for real-time updates
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      // Check if the message is from the selected user
      if (newMessage.senderId !== selectedUser._id) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  // Unsubscribe from message updates
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // Set the selected user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
