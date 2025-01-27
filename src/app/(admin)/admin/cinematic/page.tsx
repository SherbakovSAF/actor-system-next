import AdminCinematicCreate from "@/app/(admin)/admin/cinematic/admin-cinematic-create";
import HydrateCinematics from "@/app/(admin)/admin/cinematic/admin-cinematic-hydrate";
import CinematicTableModule from "@/components/modules/cinema-table.module";
import LabelUI from "@/components/ui/label.ui";
import { getAllCinematics } from "@/services/cinematic.service";

const AdminCinematicPage = async () => {
  const cinematics = await getAllCinematics().catch(() => null);
  if (!cinematics) return <div>Ошибка</div>;

  return (
    <main>
      <HydrateCinematics cinematics={cinematics} />
      <AdminCinematicCreate />
      <LabelUI value="История съёмок">
        <CinematicTableModule isEdit />
      </LabelUI>
    </main>
  );
};

export default AdminCinematicPage;
