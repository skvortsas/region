export async function getServerStatus(): Promise<{ count: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_RAGEMP_URL;

  if (!baseUrl) {
    return { count: 742 };
  }

  try {
    const res = await fetch(`${baseUrl}/players.json`);
    if (!res.ok) return { count: 0 };
    const data: unknown[] = await res.json();
    return { count: data.length };
  } catch {
    return { count: 0 };
  }
}
