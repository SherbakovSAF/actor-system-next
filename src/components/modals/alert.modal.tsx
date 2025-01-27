"use client";

import { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import ButtonUI from "@/components/ui/button.ui";
import BaseModal from "@/components/modals/base.modal";

interface AlertControlProps {
  text: string;
  ok?: string;
  cancel?: string;
  onSuccessClick: () => void;
}

interface ControlAlertModal {
  open: (args: AlertControlProps) => Promise<void>;
  close: () => void;
}

export const controlAlertModal: ControlAlertModal = {
  open: async () => {},
  close: () => {},
};
const AlertModal: React.FC = () => {
  const [isVisible, setVisible] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [successText, setSuccessText] = useState("");
  const [cancelText, setCancelText] = useState("");
  const [callBackSuccess, setCallBackSuccess] = useState<(() => void) | null>(
    null
  );

  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleOpenModal = useCallback(
    async ({ cancel, text, ok, onSuccessClick }: AlertControlProps) => {
      setCancelText(cancel ?? "Отмена");
      setTextAlert(text);
      setSuccessText(ok ?? "Ок");
      setCallBackSuccess(() => onSuccessClick);
      setVisible(true);
    },
    []
  );
  const handleCallback = () => {
    callBackSuccess && callBackSuccess();
    handleCloseModal();
  };

  controlAlertModal.open = async (args: AlertControlProps) =>
    await handleOpenModal(args);
  controlAlertModal.close = () => handleCloseModal;

  return ReactDOM.createPortal(
    <BaseModal onClose={() => handleCloseModal()} isVisible={isVisible}>
      <p className="text-center">{textAlert}</p>

      <div className="flex items-center justify-center gap-4 mt-4">
        <ButtonUI onClick={() => handleCallback()}>{successText}</ButtonUI>
        <ButtonUI onClick={() => handleCloseModal()}>{cancelText}</ButtonUI>
      </div>
    </BaseModal>,
    document.body
  );
};

export default AlertModal;
