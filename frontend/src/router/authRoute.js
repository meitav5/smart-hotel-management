import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import decode from "jwt-decode";
import {
  clear_session,
  sign_in,
  user_data,
  all_users,
  all_devices,
  all_issues
} from "../redux";
import axiosInstance from "../components/AxiosInstance";
import { USERS_API_URL } from "../constants"
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

class AuthRoute extends Component {
  constructor(props) {
    super(props);

    this.override = css`
      display: block;
      margin: 10% 0% 10% 50%;
      top: 200px;
      border-color: #017EFA;
      position: fixed;
      z-index: 10;
      opacity: 1 !important;
    `;

    this.state = {
      isAuth: false,
      curr_user_data: {},
      loading: false,
      override: this.override,
      color: '#017EFA'
    };
    
  }

  async componentDidMount() {
    let { history, auth, location, session, layout } = this.props;
    let isLoggedIn = this.props.session.isLoggedIn;
    
    if (auth) {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!token || !refreshToken) {
        history.push("/");
      }
      try {
        const { exp } = decode(refreshToken);
        const curr_time = new Date().getTime() / 1000;
        let token_response = exp >= curr_time;
        if (isLoggedIn) {
          if (!(isLoggedIn && token_response)) {
            history.push("/");
          } else {
            this.setState({ isAuth: true, curr_user_data: this.props.session.userData });
          }
        } else {
          this.setState({...this.state, loading: true});
          const resp = await axiosInstance.get(USERS_API_URL+"is_authenticated/");
          const user = await resp.data.user;
          const allUsers = await resp.data.all_data;
          const ok = await resp.data.ok;
          this.setState({ curr_user_data: user });
          if (ok) {
            this.setState({...this.state, loading: false});
            let devices = user.devices;
            let issues = user.issues;
            delete user["devices"];
            delete user["issues"];
            this.props.dispatch(sign_in());
            if(user["role"] === "staff"){
                this.props.dispatch(all_users(allUsers));
                this.props.dispatch(all_issues(issues))
            }
            this.props.dispatch(all_devices(devices));
            this.props.dispatch(user_data(user));
            this.setState({ isAuth: true });
          } else {
            this.setState({...this.state, loading: false});
            history.push("/");
            this.props.dispatch(clear_session())
          }
        }
      } catch (error) {
        this.setState({...this.state, loading: false});
        console.log(error)
        console.log("TOKEN AUTH Error");
        history.push("/");
      }
    } else {
      this.setState({ isAuth: true });
    }
  }

  render() {
    return (
      <div style={{ padding: "0px", margin: "0px"}}>
        <PulseLoader speedMultiplier={1} color={this.state.color} loading={this.state.loading} css={this.state.override} size={40} />
        {(this.props.layout ? React.createElement(this.props.layout, {'footer': this.props.footer, 'loading': this.state.loading}, React.createElement(this.props.component)) : React.createElement(this.props.component))}
      </div> )
    }
}

const mapStateToProps = state => ({
    session: state.session
});


export default withRouter(connect(mapStateToProps)(AuthRoute));
