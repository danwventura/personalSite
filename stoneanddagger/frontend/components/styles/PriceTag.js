import styled from 'styled-components';

const PriceTag = styled.span`
  @font-face {
    font-family: 'CenturyGothic';
    src: url('/static/CenturyGothic.ttf')
    format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'CenturyGothic';
  color: #393939;
  font-weight: 600;
  padding: 5px;
  margin-bottom: 20px;
  line-height: 1.1;
  font-size: 2rem;
  display: inline-block;
  position: relative;
  right: -3px;
`;

export default PriceTag;
