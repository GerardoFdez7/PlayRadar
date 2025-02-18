import ClientHomePage from "../app/home/page";
import { getGames } from "../app/services/api";

export default async function HomePage() {
  const initialData = await getGames();
  
  // Fuerza estructura segura incluso si la API falla
  const initialGames = initialData?.results || [];
  const initialNextUrl = initialData?.next || null;

  return (
    <ClientHomePage
      initialGames={initialGames}
      initialNextUrl={initialNextUrl}
    />
  );
}