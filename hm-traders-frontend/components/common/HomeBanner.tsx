

export default async function HomeBanner({ slug }: any) {

  return (
    <section className="banner relative bg-gray-100 p-8 md:p-16">
      {/* Hero Image */}
      {slug?.heroImage?.url && (
        <img
          src={slug?.heroImage.url}
          alt={slug?.heroTitle || slug?.title}
          className="w-full h-auto object-cover rounded-md mb-8"
        />
      )}

      {/* Hero Title & Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {slug?.heroTitle || slug?.title}
        </h1>
        {slug?.heroSubtitle && (
          <p className="text-lg md:text-xl text-gray-700">{slug?.heroSubtitle}</p>
        )}
      </div>

      {/* Buttons */}
      {slug?.buttons?.length > 0 && (
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {slug?.buttons.map((btn, idx) => (
            <a
              key={idx}
              href={btn.link}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {btn.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Features */}
      {slug?.heroFeatures?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {slug?.heroFeatures.map((feature, idx) => (
            <div key={idx} className="feature p-4 bg-white rounded shadow">
              {feature.icon?.url && (
                <img
                  src={feature.icon.url}
                  alt={feature.title}
                  className="mx-auto mb-4 w-16 h-16 object-contain"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              {feature.description && <p className="text-gray-600">{feature.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}