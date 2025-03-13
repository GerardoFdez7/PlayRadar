import ClientHomePage from "../app/home/page";
import { getGames } from "../app/services/api";

export default async function HomePage() {
  const initialData = await getGames();
  
  // Force secure structure even if the API fails
  const initialGames = initialData?.results || [];
  const initialNextUrl = initialData?.next || null;

  return (
    <ClientHomePage
      initialGames={initialGames}
      initialNextUrl={initialNextUrl}
    />
  );
}