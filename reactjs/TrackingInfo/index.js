import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookies'

const apiStatusConstant = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class TrackingInfo extends Component {
  state = {
    trackingDetails: {},
    apiStatus: apiStatusConstant.initial,
  }
  componentDidMount () {
    this.getTrackDetails()
  }
  getFormattedData = data => ({
   status: data.status,
    location: data.location,
  })

  getTrackDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.progress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/TrackNumber/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedSimilarProductsData = fetchedData.trackDetails.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        trackingDetails: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }
  
  renderSuccess = () => {
    const {trackingDetails} = this.state
    const {status, location} = trackingDetails
    return (
      <div>
        <h1>Track Details </h1>
        <div>
          <h1> {status} </h1>
          <p> {location} </p>
        </div>
      </div>
    )
  }
  renderFailure = () => (
    <div>
      <h1>No SUCH COURIERS</h1>
    </div>
  )

   renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  
  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.progress:
        return this.renderLoader()
      case apiStatusContant.failure:
        return this.renderFailure()
      case apiStatusConstant. success:
        return this.renderSuccess()
      default :
        return null
  }
  render() {
    return (
      <div>
       {this.renderApiStauts()}
      </div>
    )
  }
}

export default TrackingInfo;
