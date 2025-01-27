"use client";

import MultiSelectUi from "@/components/ui/multi-select.ui";
import { getActorsService } from "@/services/actor.service";
import { createMembersService } from "@/services/member.service";
import { ActorWithUser_DTO } from "@/types/actor.types";
import { MemberWithUser_DTO } from "@/types/member.types";
import { User_M } from "@prisma/client";
import { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useLockBodyScroll } from "react-use";
import ButtonUI from "@/components/ui/button.ui";
import LabelUI from "@/components/ui/label.ui";
import LoadingUi from "@/components/ui/loading.ui";
import BaseModal from "@/components/modals/base.modal";

interface MemberModalProps {
  onCreateMember: (members: MemberWithUser_DTO[]) => void;
}
interface ModalControlProps {
  members: MemberWithUser_DTO[];
  cinematicId: number;
}

export const controlMemberModal: {
  open: (args: ModalControlProps) => void;
  close: () => void;
} = {
  open: () => {},
  close: () => {},
};

const MemberModal: React.FC<MemberModalProps> = ({ onCreateMember }) => {
  const [isVisible, setVisible] = useState(false); // Везде
  const [isLoadingContent, setLoadingContent] = useState<boolean>(false); // Везде
  const [isLoadingRequest, setLoadingRequest] = useState<boolean>(false); // Везде
  useLockBodyScroll(isVisible); // Везде
  const [actorList, setActorList] = useState<ActorWithUser_DTO[]>([]);
  const [selectedActors, selectActors] = useState<ActorWithUser_DTO[]>([]);
  const [cinematicId, setCinematicId] = useState(0);

  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  // Всё что Выше это будет везде, может как то вынести надо

  const handleOpenModal = useCallback(
    async (members: ModalControlProps["members"]) => {
      setVisible(true);
      setLoadingContent(true);
      const allActors = await getActorsService();
      const idsMembers = members.map((member) => member.actor.id);
      setActorList(allActors.filter((actor) => !idsMembers.includes(actor.id)));
      setLoadingContent(false);

      // По сути что будут при открытии
      // setReaction({ ...reaction, doubtId: doubt.id });
      // setDoubt(doubt);
    },
    [setVisible]
  );

  const createMembers = async () => {
    if (!selectedActors.length) return;
    try {
      setLoadingRequest(true);
      const newMembers = await createMembersService(
        selectedActors.map((actor) => {
          return {
            cinematicId,
            actorId: actor.id,
          };
        })
      );

      onCreateMember && onCreateMember(newMembers);
    } finally {
      setLoadingRequest(false);
      handleCloseModal();
    }
  };

  const handleChangeActors = (users: User_M[]) => {
    const idxUser = users.map((user) => user.id);
    selectActors(actorList.filter((actor) => idxUser.includes(actor.userId)));
  };

  controlMemberModal.open = ({ members, cinematicId }: ModalControlProps) => {
    handleOpenModal(members);
    setCinematicId(cinematicId);
  };

  controlMemberModal.close = () => handleCloseModal();

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <BaseModal isVisible={isVisible} onClose={() => handleCloseModal()}>
      {isLoadingContent ? (
        <LoadingUi className="mx-auto block mt-4" />
      ) : (
        <div>
          <LabelUI value="Кого добавить?">
            <MultiSelectUi
              selectedItems={selectedActors.map((actor) => actor.user)}
              items={actorList.map((actor) => actor.user)}
              uniqueKey={"id"}
              displayKey={"nickName"}
              onChange={(value) => handleChangeActors(value)}
            />
          </LabelUI>
          <ButtonUI
            className="mt-2 mx-auto block"
            onClick={() => createMembers()}
            loading={isLoadingRequest}
          >
            Создать
          </ButtonUI>
        </div>
      )}
    </BaseModal>,
    document.body
  );
};

export default MemberModal;
