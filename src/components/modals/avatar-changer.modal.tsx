"use client";

import BaseModal from "@/components/modals/base.modal";
import { cn } from "@/lib/utils.lib";
import { useCallback, useState } from "react";
import ReactDOM from "react-dom";

interface AvatarModalProps {
  onChangeAvatarUrl: (selectedAvatar: string) => void;
}
interface ModalControlProps {
  currentAvatarUrl: string;
}

export const controlAvatarModal: {
  open: (args: ModalControlProps) => void;
} = {
  open: () => {},
};

const AvatarChangerModal: React.FC<AvatarModalProps> = ({
  onChangeAvatarUrl,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [selectedAvatarUrl, selectAvatarUrl] = useState("");

  const avatars = [
    "https://i.pinimg.com/736x/bc/0c/27/bc0c27cf1146985eaf256a41b85b356d.jpg",
    "https://i.pinimg.com/236x/66/07/27/660727d489ff95f1dd1f61e772e038bf.jpg",
    "https://i.pinimg.com/236x/98/8b/52/988b52e9eddfded21ff0c2c55b1f47c2.jpg",
    "https://i.pinimg.com/236x/0a/86/98/0a869817d59d521eed7619d45aca232a.jpg",
    "https://i.pinimg.com/236x/f1/41/2e/f1412e278064f89611ed03de6ace8444.jpg",
    "https://i.pinimg.com/236x/b2/7f/31/b27f31e8ddc96d54536e1f162948272a.jpg",
  ].filter((avatar) => avatar !== selectedAvatarUrl);

  const handleCloseModal = useCallback(() => setVisible(false), [setVisible]);

  const handleOpenModal = useCallback(
    async (args: ModalControlProps) => {
      selectAvatarUrl(args.currentAvatarUrl);
      setVisible(true);
    },
    [setVisible]
  );

  const handleSelectUser = (url: string) => {
    selectAvatarUrl(url);
    onChangeAvatarUrl(url);
    handleCloseModal();
  };

  controlAvatarModal.open = (args: ModalControlProps) => {
    handleOpenModal(args);
  };

  return ReactDOM.createPortal(
    <BaseModal
      isVisible={isVisible}
      onClose={() => handleCloseModal()}
      title="Выберите аватар"
    >
      <div className="flex-wrap flex gap-4 justify-center mt-4">
        {avatars.map((avatar) => (
          <div
            className={cn(
              "w-32 aspect-square bg-cover bg-center cursor-pointer hover:outline-accent hover:outline-4 hover:outline"
            )}
            key={avatar}
            style={{ backgroundImage: `url(${avatar})` }}
            onClick={() => handleSelectUser(avatar)}
          />
        ))}
      </div>
    </BaseModal>,
    document.body
  );
};

export default AvatarChangerModal;
