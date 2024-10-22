import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
  return (
    <div className="flex h-40 items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin h-[4vw] w-[4vw]" />
    </div>
  )
}

export default Loading
