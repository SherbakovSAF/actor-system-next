"use client";

import { useCinematicsStore } from "@/app/stores/cinematic.store";
import { CinematicWithUsers_DTO } from "@/types/cinematic.types";
import { useEffect } from "react";

interface HydrateCinematicsProps {
  cinematics: CinematicWithUsers_DTO[];
}

const HydrateCinematics: React.FC<HydrateCinematicsProps> = ({
  cinematics,
}) => {
  const { setCinematics_S, resetSetupCinematic_S } = useCinematicsStore();

  // Передаём данные в Zustand при первой загрузке
  useEffect(() => {
    setCinematics_S(cinematics);

    return () => resetSetupCinematic_S();
  }, [setCinematics_S, resetSetupCinematic_S, cinematics]);

  return null;
};

export default HydrateCinematics;
