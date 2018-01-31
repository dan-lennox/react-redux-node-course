import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {
  renderContent() {
    console.log('status', this.props.auth);
    switch(this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li><a href="/auth/google">Login With Google</a></li>
        );

      default:
        return <li><a href="/api/user/logout">Logout</a></li>;
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">Emaily</a>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// Using object destructuring.
function mapStateToProps({ auth }) {
  // Auth is already equal to { auth: auth }, so we can just return auth.
  return { auth };
  //return { auth: auth };
}

// Regular version
// function mapStateToProps(state) {
//   return { auth: state.auth };
// }

export default connect(mapStateToProps)(Header);