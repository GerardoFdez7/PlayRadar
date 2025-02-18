import ClientHomePage from "../app/home/page";
import { getGames } from "../app/services/api";


export default async function HomePage() {
  const initialData = await getGames();

  if (!initialData) {
    return <div>Error al cargar juegos</div>;
  }

  const initialGames = Array.isArray(initialData.results)
    ? initialData.results
    : [];
  const initialNextUrl = initialData.next;

  return (
    <ClientHomePage
    initialGames={initialGames}
      initialNextUrl={initialNextUrl}
    />
  );
}