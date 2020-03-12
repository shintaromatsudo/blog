import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
} from 'react-share';

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () => {
    this.setState({ currentPath: this.props.location.pathname })
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      { subNav } = this.props,
      { shareUrl } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/">
            <Logo />
          </Link>
          <div className="Nav--Space">
            <div className="Nav--Links">
              {subNav.posts.map((link, index) => (
                <NavLink
                  to={link.slug}
                  key={'posts-subnav-link-' + index}
                >
                  {link.title}
                </NavLink>
              ))}
              <NavLink to="/contact/" className="Nav--Contact">Contact</NavLink>
            </div>
          </div>
          <div className="Nav--Actions">
            <div>
              <FacebookShareButton url={shareUrl} className="Nav--shareButton">
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} className="Nav--shareButton">
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <LineShareButton url={shareUrl} className="Nav--shareButton">
                <LineIcon size={40} round />
              </LineShareButton>
              <PocketShareButton url={shareUrl} className="Nav--shareButton">
                <PocketIcon size={40} round />
              </PocketShareButton>
            </div>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav, shareUrl }) => (
  <Location>{route => <Navigation subNav={subNav} shareUrl={shareUrl} {...route} />}</Location>
)
