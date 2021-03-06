// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import Label from 'components/Label';
import Icon from 'components/Icon';
import { BREAKPOINTS } from 'containers/App/constants';

// component styles
const Styled = styled.div`
  width: 100%;
  padding-right: 50px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding-right: 0;
  }
`;

const Table = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  height: 50px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    height: 40px;
    margin-bottom: 15px;
    line-height: 20px;
  }
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    font-size: 15px;
    vertical-align: top;
    padding-top: 10px;
  }
`;
const IconCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 28px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    vertical-align: top;
    width: 40px;
  }
`;
const IconWrap = styled.div`
  position: relative;
  left: -2px;
  padding-right: 4px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding-right: 2px;
    left: -5px;
  }
`;

/**
  * Page title with icon as used in sidebar (or above content on mobile)
  * Requires either title as displayed or label id
  *
  * @return {Component} Page title with icon
  *
  */
const PageTitle = ({ labelId, icon, title }) => (
  <Styled>
    <Table>
      <IconCell>
        <IconWrap>
          <Icon name={icon} />
        </IconWrap>
      </IconCell>
      <Cell>
        { title &&
          <span>{title}</span>
        }
        { labelId &&
          <Label id={labelId} />
        }
      </Cell>
    </Table>
  </Styled>
);

PageTitle.propTypes = {
  /** title as displayed */
  title: PropTypes.string,
  /** title by label id */
  labelId: PropTypes.string,
  /** icon id */
  icon: PropTypes.string,
};

export default PageTitle;
