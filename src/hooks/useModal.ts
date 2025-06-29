import { useState } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export const useModal = (initialState: boolean = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

// Hook for alert modals
interface AlertModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

interface UseAlertModalReturn extends AlertModalState {
  showAlert: (title: string, message: string, type?: 'info' | 'warning' | 'error' | 'success') => void;
  closeAlert: () => void;
}

export const useAlertModal = (): UseAlertModalReturn => {
  const [alertState, setAlertState] = useState<AlertModalState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = (title: string, message: string, type: 'info' | 'warning' | 'error' | 'success' = 'info') => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    ...alertState,
    showAlert,
    closeAlert,
  };
};

// Hook for confirmation modals
interface ConfirmationModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  onConfirm: () => void;
}

interface UseConfirmationModalReturn extends ConfirmationModalState {
  showConfirmation: (
    title: string,
    message: string,
    onConfirm: () => void,
    type?: 'info' | 'warning' | 'error' | 'success'
  ) => void;
  closeConfirmation: () => void;
}

export const useConfirmationModal = (): UseConfirmationModalReturn => {
  const [confirmationState, setConfirmationState] = useState<ConfirmationModalState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: () => {},
  });

  const showConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void,
    type: 'info' | 'warning' | 'error' | 'success' = 'info'
  ) => {
    setConfirmationState({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
    });
  };

  const closeConfirmation = () => {
    setConfirmationState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    ...confirmationState,
    showConfirmation,
    closeConfirmation,
  };
};