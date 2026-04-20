import { API_URL } from '../api/Api';
import type { BannerFeature } from "@/components/common/HomeBanner";

export interface ThreeBannerCards {
  column_items: BannerFeature[];
}

interface ThreeColumnData {
  acf_fc_layout: string;
  column_items?: BannerFeature[];
  [key: string]: unknown;
}

interface PageLayout {
  page_layout: ThreeColumnData[];
}

interface AcfData {
  acf: PageLayout;
}

// Strictly type getImageById
const getImageById = async (id: number | string | null | undefined): Promise<string | null> => {
  if (!id) return null;

  const res = await fetch(`${API_URL}/media/${id}`);
  if (!res.ok) return null;

  const imgData: { link?: string } = await res.json();
  return imgData.link ?? null;
};

export const fetchThreeBannerCards = async (id: number | string): Promise<ThreeBannerCards | undefined> => {
  try {
    const res = await fetch(`${API_URL}/pages/${id}`, {cache: "force-cache" });
    if (!res.ok) throw new Error(`Failed to fetch page: ${res.status}`);

    const data: AcfData = await res.json();
    const threeColumnData = data.acf.page_layout.find(
      (item: ThreeColumnData) => item.acf_fc_layout === "three_column_icon"
    );

    if (threeColumnData?.column_items?.length) {
      threeColumnData.column_items = await Promise.all(
        threeColumnData.column_items.map(async (col: BannerFeature) => {
          if (col.column_items_icon) {
            return {
              ...col,
              column_items_icon_url: await getImageById(col.column_items_icon),
            };
          }
          return col;
        })
      );
    }

    if (threeColumnData && threeColumnData.column_items) {
      return { column_items: threeColumnData.column_items };
    }
    return undefined;
  } catch (error) {
    console.error("Banner fetch error:", error);
    return undefined;
  }
};
