import { checkEnvironment } from "./checkEnvironment";

export const getEpisodes = async (id, status, refresh = false) => {
  try {
    const response = await fetch(
      `${checkEnvironment()}/api/episode/${id}?releasing=${status === "RELEASING" ? "true" : "false"}&refresh=${refresh}`,{ next: { revalidate: status === "FINISHED" ? false : 3600 } }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch episodes')
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Consumet Episodes:", error);
  }
}

export const getSources = async (id, provider, epid, epnum, subdub) => {
  try {
    const response = await fetch(`${checkEnvironment()}/api/source/${id}`,{
      method: 'POST',
      body: JSON.stringify({
        source: `${provider === "gogoanime" && !id.startsWith("/") ? "consumet" : "anify"}`,
        provider,
        episodeid: epid,
        episodenum: epnum,
        subtype: subdub
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
   if (!response.ok) {
      throw new Error('Failed to fetch episodes')
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Episode sources:", error);
  }
}