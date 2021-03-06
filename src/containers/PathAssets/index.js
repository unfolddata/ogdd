// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { List } from 'immutable';
// utils
import getLabel from 'utils/get-label';
import getPageMetaTitle from 'utils/get-page-meta-title';
import quasiEquals from 'utils/quasi-equals';
// containers, app selectors, metaDescription
import {
  selectIndicatorsWithOutcomes,
  selectSurveys,
} from 'containers/App/selectors';
import { ASSETS_INDICATOR_ID_MAP } from 'containers/App/constants';
// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FullScreenModal from 'components/FullScreenModal';
import AsideContent from 'components/AsideContent';
import PlotAssets from 'components/PlotAssets';
import Loading from 'components/Loading';
// simple styles (styled components)
import Row from 'styles/Row';
import Column from 'styles/Column';
import PageLongTitle from 'styles/PageLongTitle';
import ContentContainer from 'styles/ContentContainer';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';
import PageTitleWrapper from 'styles/PageTitleWrapper';
import ReadMoreWrapper from 'styles/ReadMoreWrapper';
import PrintOnly from 'styles/PrintOnly';
import PlotTitle from 'styles/PlotTitle';
// assets
import description from 'text/data-assets.md'; // loaded as HTML from markdown

// initial component state
const INITIAL_STATE = {
  showModal: false, // show/hide modal
  surveyHighlightedId: null, // highlighted survey
};

/**
  * The 'data assets' component
  * Shows compenet description and displays plots for assets indicators:
  * - Data assets published in machine readable formats vs all assets
  * - Data assets published using NZGOAL vs all assets
  *
  */
class PathAssets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
    * Component constructor, sets initial state
    * @param {object} props component props
    */
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  /**
    * 'Read more' button handler - shows/hides modal
    * @param {boolean} [showModal=true] show or hide modal
    */
  onReadMore(showModal = true) {
    this.setState({ showModal });
  }
  /**
    * 'Modal dismiss' button handler - hides modal
    */
  onModalDismiss() {
    this.setState({
      showModal: false,
    });
  }
  /**
    * 'Highlight survey' handler - highlights survey in plot
    * @param {string} surveyHighlightedId the survey to highlight
    */
  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
  }
  /**
    * 'Card' mouse out handler - rests highlighted survey
    */
  onCardMouseLeave() {
    this.setState({
      surveyHighlightedId: null,
    });
  }
  /**
    * Render page title
    * @return {Component} Page title component
    */
  renderPageTitle() {
    return (
      <PageTitle labelId="component.assets.title" icon="assets" />
    );
  }
  /**
    * Render sidebar content
    */
  renderAsideContent() {
    return (
      <AsideContent
        title={this.renderPageTitle()}
        html={description}
        isOffset
      />
    );
  }

  render() {
    const { indicators, surveys } = this.props;

    // default to last (most recent) survey
    const surveyHighlightedId = this.state.surveyHighlightedId
      || (surveys ? surveys.last().get('survey_id') : null);
    // check if all data is available
    const ready = indicators && surveys && surveyHighlightedId !== null;

    // Plot 1 indicator: machine readable formats
    const machineReadableIndicator = ready &&
      indicators.find((item) => quasiEquals(item.get('indicator_id'), ASSETS_INDICATOR_ID_MAP.MACHINEREADABLE_ID));
    // Plot 2 indicator: NZGOAL licenses
    const nzgoalIndicator = ready &&
      indicators.find((item) => quasiEquals(item.get('indicator_id'), ASSETS_INDICATOR_ID_MAP.NZGOAL_ID));
    // Reference indicator for comparison in both plots
    const assetsIndicator = ready &&
      indicators.find((item) => quasiEquals(item.get('indicator_id'), ASSETS_INDICATOR_ID_MAP.ASSETS_ID));

    return (
      <ContentContainer>
        <Helmet>
          <title>{getPageMetaTitle('component.assets.title')}</title>
          <meta
            name="description"
            content={getLabel('component.assets.metaDescription')}
          />
        </Helmet>
        <Hidden min={0}>
          <PageTitleWrapper>
            { this.renderPageTitle() }
            <ReadMoreWrapper>
              <ReadMore onClick={() => this.onReadMore()} />
            </ReadMoreWrapper>
          </PageTitleWrapper>
        </Hidden>
        { this.state.showModal &&
          <FullScreenModal dismiss={() => this.onModalDismiss()}>
            { this.renderAsideContent() }
          </FullScreenModal>
        }
        <PrintOnly>
          { this.renderAsideContent() }
        </PrintOnly>
        <PageLongTitle id="pageTitle">
          <Label id="component.assets.longTitle" />
        </PageLongTitle>
        <Row>
          <Column width={[1, 1 / 4]} order={2} paddingvertical="true">
            <Visible min={0} print="false" >
              { this.renderAsideContent() }
            </Visible>
          </Column>
          <Column width={[1, 3 / 4]} order={1}>
            { !ready &&
              <Loading />
            }
            { ready &&
              <Row>
                <Column
                  width={[1, 1, 1 / 2]}
                  paddingvertical="true"
                  padding={{ bottom: '30px' }}
                >
                  <PlotTitle>{machineReadableIndicator.get('title')}</PlotTitle>
                  <PlotAssets
                    indicator={machineReadableIndicator}
                    referenceIndicator={assetsIndicator}
                    surveys={surveys}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onCardMouseLeave={() => this.onCardMouseLeave()}
                  />
                </Column>
                <Column
                  width={[1, 1, 1 / 2]}
                  paddingvertical="true"
                  padding={{ bottom: '30px' }}
                >
                  <PlotTitle>{nzgoalIndicator.get('title')}</PlotTitle>
                  <PlotAssets
                    indicator={nzgoalIndicator}
                    referenceIndicator={assetsIndicator}
                    surveys={surveys}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onCardMouseLeave={() => this.onCardMouseLeave()}
                  />
                </Column>
              </Row>
            }
          </Column>
        </Row>
      </ContentContainer>
    );
  }
}

PathAssets.propTypes = {
  /** list of all indicators joined with outcomes from state */
  indicators: PropTypes.instanceOf(List),
  /** list of all surveys from state */
  surveys: PropTypes.instanceOf(List),
};

/**
 * Mapping redux state to component props
 *
 * @param {object} state application store
 * @return {object} object of selected store content
 */
const mapStateToProps = (state) => ({
  indicators: selectIndicatorsWithOutcomes(state),
  surveys: selectSurveys(state),
});

export default connect(mapStateToProps)(PathAssets);
