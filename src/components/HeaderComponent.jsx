import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div>
        {/* ======= Header ======= */}
        <header id="header" className="header fixed-top d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="logo d-flex align-items-center">
              <img src="assets/img/ins_Icon.gif" alt="" />
              <span className="d-none d-lg-block">Resirvations</span>
            </Link>
            <div className="d-flex align-items-center d-block d-md-none">

              <div className="dropdown pe-3">
                <div className="nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                  <i className="bi bi-list toggle-sidebar-btn" />

                </div>{/* End Profile Iamge Icon */}
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile align-items-start">
                <li className="dropdown-header align-items-start justify-content-start">
                    <Link className="nav-link collapsed" to="/">
                      <i className="bi bi-grid mx-2"/>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="dropdown-header align-items-start justify-content-start">
                    <Link className="nav-link collapsed" to="/resirvation">
                      <i className="bi bi-cart-plus-fill mx-2"></i>
                      <span>Resirvations</span>
                    </Link>
                  </li>
                  <li className="dropdown-header align-items-start justify-content-start">
                    <Link className="nav-link collapsed" to="/chat">
                      <i className="bi bi-chat-quote mx-2"></i>
                      <span>Chat</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>


                </ul>{/* End Profile Dropdown Items */}
              </div>{/* End Profile Nav */}
            </div>
          </div>{/* End Logo */}
          <div className="search-bar">
            <div className="search-form d-flex align-items-center" >
              <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
              <button type="submit" title="Search"><i className="bi bi-search" /></button>
            </div>
          </div>{/* End Search Bar */}
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">

              <li className="nav-item dropdown pe-3">
                <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="/" data-bs-toggle="dropdown">
                  <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/75/cc/7c/75cc7cf2-516f-b0f4-a8ed-3baccc1abcbf/source/512x512bb.jpg" alt="Profile" className="rounded-circle" />
                  <span className="d-none d-md-block dropdown-toggle ps-2">Admin</span>
                </Link>{/* End Profile Iamge Icon */}
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>ADMIN</h6>
                    <span>LogOut</span>
                  </li>
                  
                  <li>
                    <hr className="dropdown-divider" />
                  </li>


                </ul>{/* End Profile Dropdown Items */}
              </li>{/* End Profile Nav */}
            </ul>
          </nav>{/* End Icons Navigation */}
        </header>{/* End Header */}
      </div>

    )
  }
}
export default HeaderComponent