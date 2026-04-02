import { API_URL } from "@/api/Api";

export async function getGlobalNetwork() {
  try {
    const res = await fetch(`${API_URL}/global-network?depth=1`);
    if (!res.ok) {
      throw new Error("Failed to fetch global network data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching global network data:", error);
    return null;
  }

}
 

// import data from "@/data/global-network.json";

// export async function getGlobalNetwork() {
//   try {
//     return data; // keep same API shape
//   } catch (error) {
//     console.error("[frontend] global network load failed", error);
//     return null;
//   }
// }