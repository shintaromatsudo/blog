import React from 'react'

class PageTopButton extends React.Component {
  // componentDidMount() {
  //   window.addEventListener('scroll', event => this.handleScroll(), true)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', event => this.handleScroll(), false)
  //   console.log(
  //     window.removeEventListener('scroll', event => this.handleScroll(), false)
  //   )
  // }

  // handleScroll = () => {
  //   const ScrollY = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  //   )
  //   const element = document.getElementById('scrollToTop')
  //   console.log(element)
  //   if (ScrollY < 50) {
  //     element.classList.remove('fadeIn')
  //     element.classList.add('fadeOut')
  //   } else {
  //     element.classList.add('fadeIn')
  //     element.classList.remove('fadeOut')
  //   }
  // }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <div id="scrollToTop" onClick={this.scrollToTop}>
        <i className="fas fa-angle-double-up" />
        <style jsx>{`
          #scrollToTop {
            position: fixed;
            right: 30px;
            bottom: 30px;
            width: 42px;
            height: 42px;
            font-size: 2em;
            color: #a1d8e6;
            background-color: #00afcc;
            border: 2px solid #a1d8e6;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
            transition: all 0.5s linear 0s;
            opacity: 0;
            visibility: hidden;
          }
          #scrollToTop :hover {
            color: #00afcc;
            background-color: #a1d8e6;
            border: 2px solid #00afcc;
          }
          .fadeIn {
            animation: fadein 0.5s linear 0s;
            animation-fill-mode: forwards;
          }
          .fadeOut {
            animation: fadeout 0.5s linear 0s;
            animation-fill-mode: forwards;
          }
          @keyframes fadein {
            0% {
              opacity: 0;
              visibility: hidden;
            }
            100% {
              opacity: 1;
              visibility: visible;
            }
          }
          @keyframes fadeout {
            from {
              opacity: 1;
              visibility: visible;
            }
            to {
              opacity: 0;
              visibility: hidden;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default PageTopButton
