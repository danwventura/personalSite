import styled from 'styled-components';

const NavStyles = styled.ul`
  /* margin: 0; */
  margin-top: 52px;
  padding: 0;
  justify-self: end;
  text-align: center;
  float:right;
  vertical-align:middle;
  font-size: 2rem;
  @font-face {
        font-family: 'CenturyGothic';
        src: url('/static/CenturyGothic.ttf')
        format('truetype');
        font-weight: normal;
        font-style: normal;
    }
  a,
  button {
    padding: 1rem 3rem;
    display: inline;
    font-family: 'CenturyGothic';
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: black;
    font-weight: 800;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      content: '';
      width: 2px;
      background: white;
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-10deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: #A93B38;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 4rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    @media (max-width: 700px) {
        width: calc(100% - 10px);
    }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
