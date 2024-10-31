import { currencyFormatter } from "../../libs/utils"


const MovieInformation = ({movieInfo = {}}) => {
  return (
    <div>
      <p className="text-[1.4]vw mb-4 font-bold">Information</p>
      <div className="mb-4">
        <p className="font-bold">Origional Name</p>
        <p>{movieInfo.original_title}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Origional Country</p>
        {
          (movieInfo.origin_country || []).map((countryCode) => (
            <img
              key = {countryCode}
              src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`} 
              className="w-[1.4vw] mt-1 mr-1"
            />
          ))
        }
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{movieInfo.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Budget</p>
        <p>{currencyFormatter(movieInfo.budget, 'USD')}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormatter(movieInfo.revenue)}</p>
      </div>
    </div>
  )
}

export default MovieInformation
