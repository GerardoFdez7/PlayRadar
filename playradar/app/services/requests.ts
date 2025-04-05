import { User } from 'firebase/auth';

// Check if user exists
export const checkUserExists = async (email: string, username: string) => {
  const response = await fetch(
    `/api/register?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );
  return response.json();
};

// Register user
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Create  user when signing in with Google
export const createGoogleUser = async (
  user: User,
  usernameFallback: string,
) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, usernameFallback }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'API request failed');
  }
  return response.json();
};

// Like operations
export const likeGame = async (id: string, gameId: string) => {
  const response = await fetch('/api/liked', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to like game');
  }
  return response.json();
};

export const alllikeGames = async (id: string) => {
  const response = await fetch(`/api/liked?id=${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch liked games');
  }
  return response.json();
};

export const unlikeGame = async (id: string, gameId: string) => {
  const response = await fetch('/api/liked', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to unlike game');
  }
  return response.json();
};

// Dislike operations
export const dislikeGame = async (id: string, gameId: string) => {
  const response = await fetch('/api/disliked', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to dislike game');
  }
  return response.json();
};

export const alldislikeGames = async (id: string) => {
  const response = await fetch(`/api/disliked?id=${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch disliked games');
  }
  return response.json();
};

export const undislikeGame = async (id: string, gameId: string) => {
  const response = await fetch('/api/disliked', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to undislike game');
  }
  return response.json();
};

// Play operations
export const playLaterGame = async (id: string, gameId: string) => {
  const response = await fetch('/api/play-later', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to add game to play later');
  }
  return response.json();
};

export const getPlayLaterGames = async (id: string) => {
  const response = await fetch(`/api/play-later?id=${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch play later games');
  }
  return response.json();
};

export const delPlayLaterGame = async (id: string, gameId: string) => {
  const response = await fetch('/api/play-later', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete game from play later');
  }
  return response.json();
};

// Genre operations
export const addGenre = async (id: string, gameId: string) => {
  const response = await fetch('/api/genres', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to add game to genres');
  }
  return response.json();
};

export const getGenre = async (id: string) => {
  const response = await fetch(`/api/genres?id=${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch genres');
  }
  return response.json();
};

export const delGenre = async (id: string, gameId: string) => {
  const response = await fetch('/api/genres', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete game from genres');
  }
  return response.json();
};

// Platform operations
export const addPlatform = async (id: string, gameId: string) => {
  const response = await fetch('/api/platforms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to add game to platforms');
  }
  return response.json();
};

export const getPlatform = async (id: string) => {
  const response = await fetch(`/api/platforms?id=${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch platforms');
  }
  return response.json();
};

export const delPlatform = async (id: string, gameId: string) => {
  const response = await fetch('/api/platforms', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, gameId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete game from genres');
  }
  return response.json();
};

// Profile operations
export const getUsername = async (id: string) => {
  const response = await fetch(`/api/profile?id=${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch username');
  }
  return response.json();
};

export const updateUsername = async (id: string, username: string) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, username }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update username');
  }
  return response.json();
};

export const delUser = async (id: string) => {
  const response = await fetch('/api/profile', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update username');
  }
  return response.json();
};

export const getImage = async (id: string) => {
  const response = await fetch(`/api/profile/image?id=${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch username');
  }
  return response.json();
};

export const updateImage = async (id: string, image: string) => {
  const response = await fetch('/api/profile/image', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, image }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update image');
  }
  return response.json();
};
