'use server';

// import { redirect } from 'next/navigation'
import ClientHomePage from "../app/home/page";
import { getGames } from "../app/services/api";

export default async function HomePage() {
  const games = await getGames();
  
  // Asegurar que siempre sea un array
  if (!Array.isArray(games)) {
    console.error('Games no es un array:', games);
    return <div>Error al cargar juegos</div>;
  }

  return <ClientHomePage games={games} />;
}