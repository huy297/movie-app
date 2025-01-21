const TVShowInformation = ({ tvInfo = {} }) => {
  return (
    <div>
      <p className="text-[1.4]vw mb-4 font-bold">Information</p>
      <div className="mb-4">
        <p className="font-bold">Origional Name</p>
        <p>{tvInfo.original_name}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Origional Country</p>
        {(tvInfo.origin_country || []).map((countryCode) => (
          <img
            key={countryCode}
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
            className="mr-1 mt-1 w-[1.4vw]"
          />
        ))}
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{tvInfo.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Network</p>
        {
          (tvInfo.networks || []).map((network) => {
            return (
              <img
                className="invert"
                key={network.id}
                src={`https://image.tmdb.org/t/p/h30${network.logo_path}`}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default TVShowInformation;
