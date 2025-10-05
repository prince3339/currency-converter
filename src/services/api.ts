const baseUrl = import.meta.env.VITE_CURRENCY_BEACON_BASE_URL;
const apiKey = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;

export const fetcher = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const apiUrl = new URL(`${baseUrl}${url}`);
  apiUrl.searchParams.set("api_key", apiKey);

  const res = await fetch(apiUrl.toString(), init);

  console.log("Fetching URL:", apiUrl.toString());

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};


