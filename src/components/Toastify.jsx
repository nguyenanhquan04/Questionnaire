import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {
  return <ToastContainer />;
};

// Export different types of toasts as functions
export const notifySuccess = (message) => toast.success(message);
export const notifyError = (message) => toast.error(message);

export default ToastNotification;
