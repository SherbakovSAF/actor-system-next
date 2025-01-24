import UserCardModule from "@/components/modules/user-card.module";
import { getAllUser } from "@/services/user.service";

const HomePage = async () => {
  const users = await getAllUser().catch(() => null);
  if (!users) return <div>Не удалось получить пользователей</div>;
  return (
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

export default HomePage;
