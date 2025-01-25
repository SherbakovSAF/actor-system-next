import UserCardModule from "@/components/modules/user-card.module";
import { getAllUser } from "@/services/user.service";

const AdminPageUsers = async () => {
  const users = await getAllUser().catch(() => null);
  if (!users) return <div>Ошибка</div>;

  return (
    // TODO: Позже сделать отдельный модуль с юзерами, где будет и фильтрация и пагинация и isEdit, чтобы не дублировать код
    <main>
      <h1>Пользователи</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCardModule key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
};

export default AdminPageUsers;
