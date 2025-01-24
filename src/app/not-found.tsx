import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h2>Страница не существует</h2>
        <Link href="/">Вернуться на главную</Link>
      </div>
    </div>
  );
}
