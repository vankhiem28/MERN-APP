import { create } from "zustand";

const useCreatePostModal = create((set) => ({
  isOpenModal: false,
  openModal: () => set({ isOpenModal: true }),
  closeModal: () => set({ isOpenModal: false }),
}));

const useUpdatePostModal = create((set) => ({
  isOpenModal: false,
  openModal: () => set({ isOpenModal: true }),
  closeModal: () => set({ isOpenModal: false }),
}));

export { useCreatePostModal, useUpdatePostModal };
