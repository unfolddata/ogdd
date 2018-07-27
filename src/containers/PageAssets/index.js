import React from 'react';
import { Helmet } from 'react-helmet';

import getLabel from 'utils/get-label';

import Label from 'components/Label';

class PageAssets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const key = 'assets';
    return (
      <div>
        <Helmet>
          <title>{getLabel(`component.${key}.title`)}</title>
          <meta
            name="description"
            content={getLabel(`component.${key}.metaDescription`)}
          />
        </Helmet>
        <h2 id="pageTitle">
          <Label id={`component.${key}.title`} />
        </h2>
      </div>
    );
  }
}

export default PageAssets;