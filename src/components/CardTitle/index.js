// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
  min-height: ${(props) => props.hasTitle ? '49px' : 0};
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-top: 8px;
  font-size: 15px;
`;

const IconCell = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 38px;
`;

const IconStyled = styled(Icon)`
  position: relative;
  left: -5px;
  height: 38px;
`;

/**
  * Card title component to display card titles with icon or icon only
  *
  * @return {Component} Card title
  *
  */
const CardTitle = ({ title, icon, altTitle }) => (
  <Styled hasTitle={title !== ''}>
    <IconCell>
      <IconStyled name={icon} title={altTitle} themeColor={icon} />
    </IconCell>
    <Cell>
      { title }
    </Cell>
  </Styled>
);

CardTitle.propTypes = {
  /** the optional card title */
  title: PropTypes.string,
  /** the optional alt attribute title - should be provided if title ommitted */
  altTitle: PropTypes.string,
  icon: PropTypes.node,
};

CardTitle.defaultProps = {
  title: '',
};

export default CardTitle;
