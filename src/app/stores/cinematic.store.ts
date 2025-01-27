import {
  deleteCinematicsService,
  updateCinematicsService,
} from "@/services/cinematic.service";
import { deleteMembersService } from "@/services/member.service";
import { CinematicWithUsers_DTO } from "@/types/cinematic.types";
import { MemberWithUser_DTO } from "@/types/member.types";
import { Cinematic_M } from "@prisma/client";
import { add } from "date-fns";
import { create } from "zustand";
import { updateMembersService } from "@/services/member.service";

interface CinematicsState {
  cinematics_S: CinematicWithUsers_DTO[];
  setupCinematic_S: Cinematic_M;
  setSetupCinematic_S: (cinematic: Cinematic_M) => void;
  resetSetupCinematic_S: () => void;
  setCinematics_S: (cinematics: CinematicWithUsers_DTO[]) => void;
  addCinematic_S: (cinematic: CinematicWithUsers_DTO) => void;
  removeMember_S: (
    idCinematic: CinematicWithUsers_DTO["id"],
    idMember: CinematicWithUsers_DTO["cinematicMember"][0]["id"]
  ) => void;
  deleteCinematic_S: (idCinematic: CinematicWithUsers_DTO["id"]) => void;
  updateCinematic_S: (cinematic: CinematicWithUsers_DTO) => void;
  updateCinematicClient_S: (cinematic: CinematicWithUsers_DTO) => void;
  updateMembers_S: (member: MemberWithUser_DTO) => void;
}

const defaultSetupCinematic: Cinematic_M = {
  id: 0,
  startAt: add(new Date(), { days: 1 }),
  endAt: null,
  title: "",
  description: "",
  countSheet: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useCinematicsStore = create<CinematicsState>()((set, get) => ({
  cinematics_S: [],
  setupCinematic_S: defaultSetupCinematic,

  setSetupCinematic_S: (cinematic) =>
    set(() => ({ setupCinematic_S: cinematic })),
  resetSetupCinematic_S: () =>
    set(() => ({ setupCinematic_S: defaultSetupCinematic })),

  setCinematics_S: (cinematics) => set({ cinematics_S: cinematics }),

  addCinematic_S: (cinematic) =>
    set((state) => ({
      cinematics_S: [cinematic, ...state.cinematics_S],
    })),

  removeMember_S: (idCinematic, idMember) => {
    const { cinematics_S: cinematics } = get();

    const finedIndex = cinematics.findIndex(
      (cinematic) => cinematic.id === idCinematic
    );

    const copyCinematic = structuredClone(cinematics[finedIndex]);

    set((state) => ({
      cinematics_S: state.cinematics_S.map((cinematic) => {
        if (cinematic.id === idCinematic) {
          cinematic.cinematicMember = cinematic.cinematicMember.filter(
            (member) => member.id !== idMember
          );
        }
        return cinematic;
      }),
    }));

    deleteMembersService(idMember).catch(
      () => (cinematics[finedIndex] = copyCinematic)
    );
  },

  updateCinematicClient_S: (cinematic: CinematicWithUsers_DTO) => {
    set((state) => ({
      cinematics_S: state.cinematics_S.map((item) =>
        item.id === cinematic.id ? cinematic : item
      ),
    }));
  },

  updateCinematic_S: async (cinematic) => {
    const { cinematics_S: cinematics, updateCinematicClient_S } = get();

    const copyCinematic = cinematics.find((item) => item.id === cinematic.id);

    if (!copyCinematic) return;
    try {
      updateCinematicClient_S(cinematic);
      const updatedCinematic = await updateCinematicsService(cinematic);
      updateCinematicClient_S(updatedCinematic);
    } catch {
      updateCinematicClient_S(cinematic);
    }
  },

  deleteCinematic_S: async (idCinematic) => {
    const { cinematics_S: cinematics } = get();
    const copyCinematic = JSON.parse(JSON.stringify(cinematics));
    set((state) => ({
      cinematics_S: state.cinematics_S.filter(
        (cinematic) => cinematic.id !== idCinematic
      ),
    }));
    try {
      await deleteCinematicsService(idCinematic);
    } catch {
      set(() => ({ cinematics_S: copyCinematic }));
    }
  },

  updateMembers_S: async (member) => {
    const { cinematics_S } = get();
    const newCinematic = structuredClone(cinematics_S);

    const cinematicIndex = newCinematic.findIndex(
      (cinematic) => cinematic.id === member.cinematicId
    );
    if (cinematicIndex < 0) return;

    const memberIndex = newCinematic[cinematicIndex].cinematicMember.findIndex(
      (currentMember) => currentMember.id === member.id
    );
    if (memberIndex < 0) return;

    const originalMember =
      newCinematic[cinematicIndex].cinematicMember[memberIndex];

    newCinematic[cinematicIndex].cinematicMember[memberIndex] = member;
    set(() => ({ cinematics_S: newCinematic }));

    await updateMembersService(member).catch(() => {
      newCinematic[cinematicIndex].cinematicMember[memberIndex] =
        originalMember;
      set(() => ({ cinematics_S: newCinematic }));
    });
  },
}));
