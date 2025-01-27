"use client";

import { useCinematicsStore } from "@/app/stores/cinematic.store";
import ButtonUI from "@/components/ui/button.ui";
import InputUI from "@/components/ui/input.ui";
import LabelUI from "@/components/ui/label.ui";
import TextareaUI from "@/components/ui/textarea.ui";
import {
  createCinematicService,
  updateCinematicsService,
} from "@/services/cinematic.service";
import { Cinematic_M } from "@prisma/client";
import { format } from "date-fns";
import { useMemo, useState } from "react";

const AdminCinematicCreate = () => {
  const {
    setupCinematic_S,
    setSetupCinematic_S: setSetupCinematic,
    addCinematic_S,

    resetSetupCinematic_S,
    updateCinematic_S,
  } = useCinematicsStore();

  const [isRequestCinematic, setRequestCinematic] = useState(false);

  const isDisabledCreateBtn = useMemo(
    () => !setupCinematic_S.title || !setupCinematic_S.startAt,
    [setupCinematic_S.title, setupCinematic_S.startAt]
  );

  const sendCinematic = async () => {
    try {
      setRequestCinematic(true);
      setupCinematic_S.id
        ? await handleUpdateCinematic()
        : await handleCreateCinematic();
      resetSetupCinematic_S();
    } finally {
      setRequestCinematic(false);
    }
  };

  const handleCreateCinematic = async () => {
    const newCinematic = await createCinematicService(setupCinematic_S);
    addCinematic_S(newCinematic);
  };

  const handleUpdateCinematic = async () => {
    const newCinematic = await updateCinematicsService(setupCinematic_S);
    updateCinematic_S(newCinematic);
  };

  const handleUpdateCinematicHub = async (
    key: keyof Cinematic_M,
    value: unknown
  ) => {
    setSetupCinematic({
      ...setupCinematic_S,
      [key]: value,
    });
  };

  return (
    <div className=" flex flex-col gap-2">
      <LabelUI value="Что снимаем?">
        <InputUI
          placeholder="Введи название съёмок"
          value={setupCinematic_S.title}
          onChange={(event) =>
            handleUpdateCinematicHub("title", event.target.value)
          }
          readOnly={isRequestCinematic}
        />
      </LabelUI>
      <LabelUI value="Когда снимаем?">
        <InputUI
          placeholder="Укажи ориентировочную дату"
          type="datetime-local"
          value={format(setupCinematic_S.startAt, "yyyy-MM-dd'T'HH:mm")}
          onChange={(event) =>
            handleUpdateCinematicHub("startAt", new Date(event.target.value))
          }
          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          readOnly={isRequestCinematic}
        />
      </LabelUI>
      <LabelUI value="Может что то добавить? (Необязательно)">
        <TextareaUI
          placeholder="Введите описание"
          value={setupCinematic_S.description ?? ""}
          onChange={(event) =>
            handleUpdateCinematicHub("description", event.target.value)
          }
        />
      </LabelUI>
      <LabelUI value="На сколько страниц сценарий">
        <InputUI
          placeholder="Введите кол-во страниц"
          type="number"
          value={setupCinematic_S.countSheet}
          onChange={(event) =>
            handleUpdateCinematicHub("countSheet", Number(event.target.value))
          }
        />
      </LabelUI>

      <ButtonUI
        disabled={isDisabledCreateBtn}
        loading={isRequestCinematic}
        className="mt-4 m-auto"
        onClick={() => sendCinematic()}
      >
        Создать
      </ButtonUI>
    </div>
  );
};

export default AdminCinematicCreate;
