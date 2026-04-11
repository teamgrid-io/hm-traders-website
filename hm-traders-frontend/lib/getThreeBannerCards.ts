const getImageById = async (id: any) => {
  if (!id) return null;

  const res = await fetch(
    `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/media/${id}`,
  );

  if (!res.ok) return null;

  const imgData = await res.json();
  return imgData.link;
};

export const fetchThreeBannerCards = async (id: any) => {
  try {
    const res = await fetch(
      `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/pages/${id}`,
      { cache: "no-store" },
    );

    const data = await res.json();

    const threeColumnData = data.acf.page_layout.find(
      (item: any) => item.acf_fc_layout === "three_column_icon",
    );

    if (threeColumnData?.column_items?.length) {
      threeColumnData.column_items = await Promise.all(
        threeColumnData.column_items.map(async (col: any) => {
          if (col.column_items_icon) {
            return {
              ...col,
              column_items_icon_url: await getImageById(col.column_items_icon),
            };
          }
          return col;
        }),
      );
    }

    return threeColumnData || null;
  } catch (error) {
    console.error("Banner fetch error:", error);
    return null;
  }
};
