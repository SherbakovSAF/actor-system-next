"use client";
import ButtonUI from "@/components/blocks/ui/button.ui";
import InputUI from "@/components/blocks/ui/input.ui";
import {
  createFilmingService,
  removeActorFromFilmingService,
} from "@/services/filming.service";
import { Filming_DTO } from "@/types/filming.types";
import { useMemo, useState } from "react";

// Компонент для отображения таблицы съемок
const FilmingTable = ({
  filming,
  onRemoveActor,
}: {
  filming: Filming_DTO;
  onRemoveActor: (filmingId: number, actorId: number) => void;
}) => (
  <div key={filming.filming.id}>
    <table>
      <thead>
        <tr>
          <td>Название</td>
          <td>Дата начала</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{filming.filming.title}</td>
          <td>
            {new Date(filming.filming.dateStart).toISOString().slice(0, 10)}
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <td>Id актёра</td>
          <td>Удалить</td>
        </tr>
      </thead>
      <tbody>
        {filming.users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td
              onClick={() => onRemoveActor(filming.filming.id, user.id)}
              className="cursor-pointer"
            >
              {user.id}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function AdminFilmingPage() {
  const defaultDate = new Date(new Date().setDate(new Date().getDate() + 1));
  const [dateStart, setDateStart] = useState(defaultDate);
  const [titleFilming, setTitleFilming] = useState("");
  const [filmings, setFilmings] = useState<Filming_DTO[]>([]);
  const [isLoadingCreate, setLoadingCreate] = useState(false);
  const [isLoadingRemove, setLoadingRemove] = useState(false);

  const isDisabledCreateBtn = useMemo(
    () => !titleFilming.length || !dateStart,
    [dateStart, titleFilming]
  );

  const createFilming = async (titleFilming: string, dateStart: Date) => {
    try {
      setLoadingCreate(true);
      const newFilming = await createFilmingService(titleFilming, dateStart);
      setFilmings((prev) => [...prev, newFilming]);
      setTitleFilming("");
      setDateStart(defaultDate);
    } finally {
      setLoadingCreate(false);
    }
  };

  const removeActorFromFilming = async (idFilming: number, idActor: number) => {
    setLoadingRemove(true);
    try {
      await removeActorFromFilmingService(idFilming, idActor);
      setFilmings((prevFilmings) =>
        prevFilmings.map((filming) =>
          filming.filming.id === idFilming
            ? {
                ...filming,
                users: filming.users.filter((user) => user.id !== idActor),
              }
            : filming
        )
      );
    } finally {
      setLoadingRemove(false);
    }
  };

  return (
    <main className="h-full">
      <div className="p-5 flex flex-col gap-2">
        <InputUI
          placeholder="Название съёмок"
          value={titleFilming}
          onChange={(event) => setTitleFilming(event.target.value)}
        />
        <InputUI
          type="date"
          value={dateStart.toISOString().slice(0, 10)}
          onChange={(event) => setDateStart(new Date(event.target.value))}
        />
        <ButtonUI
          disabled={isDisabledCreateBtn}
          // loading
          // className={cn(isDisabledCreateBtn && "bg-gray-100")}
          onClick={() => createFilming(titleFilming, dateStart)}
        >
          {isLoadingCreate ? "Создаём" : "Создать"}
        </ButtonUI>
        <ButtonUI
          disabled={isDisabledCreateBtn}
          loading
          // className={cn(isDisabledCreateBtn && "bg-gray-100")}
          onClick={() => createFilming(titleFilming, dateStart)}
        >
          {isLoadingCreate ? "Создаём" : "Создать"}
        </ButtonUI>
      </div>
      {isLoadingRemove && <p>Удаляем актёра</p>}
      <div>
        {/* Посмотреть все с пагинацией */}
        {filmings.map((filming) => (
          <FilmingTable
            key={filming.filming.id}
            filming={filming}
            onRemoveActor={removeActorFromFilming}
          />
        ))}
      </div>
    </main>
  );
}
