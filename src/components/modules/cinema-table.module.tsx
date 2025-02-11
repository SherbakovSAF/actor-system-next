"use client";

import { useCinematicsStore } from "@/app/stores/cinematic.store";
import DeleteIcon from "@/assets/icons/delete.svg?url";
import FinishIcon from "@/assets/icons/flag.svg?url";
import EditIcon from "@/assets/icons/settings.svg?url";
import CardBlock from "@/components/blocks/card.block";
import AlertModal, { controlAlertModal } from "@/components/modals/alert.modal";
import MemberModal, {
  controlMemberModal,
} from "@/components/modals/member.modal";
import ButtonUI from "@/components/ui/button.ui";
import CheckboxUI from "@/components/ui/checkbox.ui";
import InputUI from "@/components/ui/input.ui";
import LabelUI from "@/components/ui/label.ui";
import PopoverUI from "@/components/ui/popover.ui";
import TooltipUI from "@/components/ui/tooltip.ui";
import { CinematicWithUsers_DTO } from "@/types/cinematic.types";
import { MemberWithUser_DTO } from "@/types/member.types";
import { format, isAfter } from "date-fns";
import Image from "next/image";
import { useState } from "react";

interface CinematicTableModuleProps {
  isEdit: boolean;
}
const CinematicTableModule: React.FC<CinematicTableModuleProps> = ({
  isEdit = false,
}) => {
  const {
    cinematics_S: cinematics,
    removeMember_S,
    updateCinematicClient_S,
    updateMembers_S,
  } = useCinematicsStore();

  const addMembers = (members: MemberWithUser_DTO[]) => {
    const finedCinematic = cinematics.find(
      (cinematic) => cinematic.id === members[0].cinematicId
    );
    if (finedCinematic)
      updateCinematicClient_S({
        ...finedCinematic,
        cinematicMember: [...finedCinematic.cinematicMember, ...members],
      });
  };

  const cinematicInfo = (cinematic: CinematicWithUsers_DTO) => {
    const { description, countSheet, startAt, endAt } = cinematic;

    const info = [
      description && { title: "Описание", value: description },
      countSheet > 0 && { title: "Страниц", value: countSheet },
      startAt && {
        title: "Начало",
        value: format(new Date(startAt), "dd.MM.yyyy"),
      },
      endAt && {
        title: "Завершена",
        value: format(new Date(endAt), "dd.MM.yyyy"),
      },
    ];

    return info.filter(Boolean); // Фильтруем undefined/false значения
  };

  const tableHeadItems = () => {
    const result = ["Актёр", "Был часов", "Обещал прийти?"];
    if (isEdit) result.push("Убрать?");
    return result;
  };

  const handleUpdateMembersHub = async (
    member: CinematicWithUsers_DTO["cinematicMember"][0],
    key: keyof CinematicWithUsers_DTO["cinematicMember"][0],
    value: unknown
  ) => {
    updateMembers_S({
      ...member,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <MemberModal onCreateMember={addMembers} />

      {cinematics.map((cinematic) => (
        <CardBlock
          key={cinematic.id}
          attributeContent={{ className: "w-full gap-5 xl:flex" }}
          title={cinematic.title}
          rightTitleSlot={
            <RightTitleSlots isEdit={isEdit} cinematic={cinematic} />
          }
        >
          <ul className="flex-shrink-0 w-1/5">
            {cinematicInfo(cinematic).map(
              (item, itemIdx) =>
                item && (
                  <li key={itemIdx}>
                    {item.title}: <b>{item.value}</b>
                  </li>
                )
            )}
          </ul>
          <table className="w-full">
            <thead>
              <tr>
                {tableHeadItems().map((item) => (
                  <td
                    key={item}
                    className="card-border-secondary bg-surface-secondary px-2"
                  >
                    {item}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="bg-surface">
              {cinematic.cinematicMember.map((member) => (
                <tr key={member.id}>
                  <td className="card-border-secondary text-center">
                    {member.actor.user.nickName}
                  </td>
                  <td className="card-border-secondary text-center">
                    <InputUI
                      className="p-0 py-[0.1rem]"
                      value={String(member.wasHours)}
                      onChange={(event) =>
                        handleUpdateMembersHub(
                          member,
                          "wasHours",
                          Number(event.target.value) ?? member.wasHours
                        )
                      }
                    />
                    {/* Переделать метод на обычное обновление, но с debounce */}
                  </td>
                  <td className="card-border-secondary ">
                    <CheckboxUI
                      className="px-2 w-full"
                      checked={member.isPromiseCome}
                      onChecked={(event) =>
                        handleUpdateMembersHub(member, "isPromiseCome", event)
                      }
                      label={member.isPromiseCome ? "Да" : "Нет"}
                    />
                  </td>
                  {isEdit && (
                    <td>
                      <ButtonUI
                        className="w-full max-h-max"
                        onClick={() => removeMember_S(cinematic.id, member.id)}
                      >
                        Убрать
                      </ButtonUI>
                    </td>
                  )}
                </tr>
              ))}
              {isEdit && (
                <tr className="card-border-secondary ">
                  <td
                    colSpan={4}
                    onClick={() =>
                      controlMemberModal.open({
                        members: cinematic.cinematicMember,
                        cinematicId: cinematic.id,
                      })
                    }
                  >
                    <ButtonUI className="w-full"> Добавить</ButtonUI>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBlock>
      ))}
    </div>
  );
};

type RightTitleSlotsProps = Pick<CinematicTableModuleProps, "isEdit"> & {
  cinematic: CinematicWithUsers_DTO;
};

const RightTitleSlots: React.FC<RightTitleSlotsProps> = ({
  cinematic,
  isEdit,
}) => {
  const { deleteCinematic_S, updateCinematic_S, setSetupCinematic_S } =
    useCinematicsStore();

  const [endDate, setEndDate] = useState(new Date());

  const canDeleteCinematic = (cinematic: CinematicWithUsers_DTO) => {
    if (!isEdit) return false;
    if (!cinematic.endAt) return true;
    if (isAfter(new Date(cinematic.endAt), new Date())) return true;
    return false;
    // Добавить toast
  };

  const deleteCinematic = (idCinematic: CinematicWithUsers_DTO["id"]) => {
    if (!canDeleteCinematic) return;
    deleteCinematic_S(idCinematic);
  };

  const handleUpdateCinematic = (cinematic: CinematicWithUsers_DTO) => {
    updateCinematic_S({ ...cinematic, endAt: endDate });
    setEndDate(new Date());
  };

  const handleEditCinematic = (cinematic: CinematicWithUsers_DTO) => {
    setSetupCinematic_S(cinematic);

    document.getElementById("scroll")?.scrollTo({ top: 0 });
  };

  return (
    <>
      <AlertModal />
      <div className="flex gap-1 py-[2px] items-center justify-center">
        <TooltipUI text="Удалить">
          <ButtonUI
            size="small"
            className="p-0"
            onClick={() =>
              controlAlertModal.open({
                text: "Вы действительно хотите удалить съёмку?",
                onSuccessClick: () => deleteCinematic(cinematic.id),
              })
            }
          >
            <Image src={DeleteIcon} alt="" className="w-4 aspect-square" />
          </ButtonUI>
        </TooltipUI>

        <ButtonUI
          size="small"
          className="p-0"
          onClick={() => handleEditCinematic(cinematic)}
        >
          <Image src={EditIcon} alt="" className="w-4 aspect-square" />
        </ButtonUI>

        {!cinematic.endAt && (
          <PopoverUI
            overlay={
              <CardBlock className="p-1 bg-surface-secondary text-sm px-1 w-fit">
                <LabelUI value="Время завершения">
                  <InputUI
                    placeholder="Укажите время"
                    type="datetime-local"
                    value={format(endDate, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(event) =>
                      setEndDate(new Date(event.target.value))
                    }
                    min={format(
                      new Date(cinematic.startAt),
                      "yyyy-MM-dd'T'HH:mm"
                    )}
                  />
                </LabelUI>
                <ButtonUI
                  className="my-1 block mx-auto bg-surface"
                  onClick={() => handleUpdateCinematic(cinematic)}
                >
                  Завершить
                </ButtonUI>
              </CardBlock>
            }
          >
            <ButtonUI size="small" className="p-0 ">
              <Image src={FinishIcon} alt="" className="w-4 aspect-square" />
            </ButtonUI>
          </PopoverUI>
        )}
      </div>
    </>
  );
};

export default CinematicTableModule;
