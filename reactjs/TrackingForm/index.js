import {Component} from 'react'
import Cookies from 'js-cookies

class TackingForm extends Component {
 state = {
   trackingNumber: '',
   errorMsg: '',
   showError: false,
  }
  setTrackingNumber = event => {
    this.setState({trackingNumber : event.target.value})
  }
   onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/tracking/:trackingNumber')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }
  handleTrack = () => {
    const { trackingNumber} = this.state
    const userDetails = {trackingNumber}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  };
  render() {
    const {showError, trackingNumber, errorMsg} = this.state
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={this.setTrackNumber}
        />
        <button onClick={this.handleTrack}>Track</button>
        {showError ? <p>{errorMsg}</p> : null }
      </div>
  );
};

export default TrackingForm;
