import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AsideComponent extends Component {
  render() {
    return (
      <div>
        {/* ======= Sidebar ======= */}
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item active">
              <Link className="nav-link collapsed" to="/">
                <i className="bi bi-grid" />
                <span>Dashboard</span>
              </Link>
            </li>{/* End Dashboard Nav */}
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/resirvation">
                <i className="bi bi-cart-plus-fill"></i>
                <span>Resirvations</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/chat">
              <i className="bi bi-chat-quote"></i>
                <span>Chat</span>
              </Link>
            </li>
          </ul>
        </aside>{/* End Sidebar*/}
      </div>

    );
  }
}

export default AsideComponent;