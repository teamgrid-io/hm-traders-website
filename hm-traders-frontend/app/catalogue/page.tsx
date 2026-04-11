import Container from "@/components/layout/Container";
import Image from "next/image";
import { getEcatalogues } from "@/lib/getEcatalogue";
import { getBrands } from "@/lib/getBrands";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";

export default async function CataloguePage() {
  const ecatalogues = await getEcatalogues();
  const brands = await getBrands();
  const banner = await fetchBannerBySlug(329);

  // Create a map of catalogue PDFs from brands
  const cataloguePdfMap = brands.reduce((acc: any, brand: any) => {
    if (brand.catalogPdf?.url) {
      const url = constructMediaUrl(brand.catalogPdf.url);

      // Check if the URL has PDF extension
      if (url && url.toLowerCase().endsWith(".pdf")) {
        acc[brand.name] = url;
      }
    }
    return acc;
  }, {});

  return (
    <>
    <HomeBanner slug={banner} />
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Catalogues
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Download and explore our comprehensive e-catalogues and brand
          catalogues
        </p>

        {/* E-CATALOGUES SECTION */}
        {ecatalogues && ecatalogues.length > 0 && (
          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ecatalogues?.map((eCat: any) => {
                const coverImage = eCat.imageUrl;

                const imageUrl = constructMediaUrl(coverImage);

                const catalogueFileUrl = constructMediaUrl(
                  eCat.catalogueUrl,
                );

                return (
                  <div
                    key={eCat.id}
                    className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* IMAGE */}
                    <div className="relative w-full h-[300px]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={eCat.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-center px-4">
                            {eCat.title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">
                        {eCat.title}
                      </h3>
                      {eCat.description && (
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                          {eCat.description}
                        </p>
                      )}

                      {/* BUTTON */}
                      {catalogueFileUrl &&
                        catalogueFileUrl.toLowerCase().endsWith(".pdf") && (
                          <a
                            href={catalogueFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#f5a623] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#e09112] transition-colors text-center w-full"
                          >
                            Download PDF ↓
                          </a>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BRAND CATALOGUES SECTION */}
        {/* {brands &&
          brands.length > 0 &&
          Object.keys(cataloguePdfMap).length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Brand Catalogues
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {brands?.map((brand: any) => {
                  if (!cataloguePdfMap[brand.name]) return null;

                  const logoUrl = constructMediaUrl(brand.logo?.url);

                  return (
                    <div
                      key={brand.id}
                      className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                    >
     
                      <div className="relative w-full h-[250px] bg-gray-100">
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={brand.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain p-4"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-500 text-center px-4 font-semibold">
                              {brand.name}
                            </span>
                          </div>
                        )}
                      </div>

                 
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          {brand.name}
                        </h3>
                        {brand.description && (
                          <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                            {brand.description}
                          </p>
                        )}

                 
                        <a
                          href={cataloguePdfMap[brand.name]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#f5a623] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#e09112] transition-colors text-center w-full"
                        >
                          View Catalogue PDF ↓
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )} */}

        {/* NO CATALOGUES MESSAGE */}
        {(!ecatalogues || ecatalogues.length === 0) &&
          (!brands || Object.keys(cataloguePdfMap).length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No catalogues available at the moment.
              </p>
            </div>
          )}
      </div>
    </Container>
    </>
    
  );
}
