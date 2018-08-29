import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ReviewEntryHeader from './ReviewEntryHeader';
import ReviewEntryBody from './ReviewEntryBody';

const Wrapper = styled.section`
  -webkit-font-smoothing: antialiased;
  color: #484848;
  margin-left: 120px;
  padding: 24px;
  width: ${({ widgetWidth }) => widgetWidth}px;
  height: 180px;
`;

const ReviewEntry = styled.div`
  border-bottom: 1px solid #EBEBEB !important;
`;

const ReviewsList = ({ reviews }) => (
  <Wrapper>
    {
      reviews.map((review) => {
        const { reviewBody } = review;

        return (
          <ReviewEntry
            key={review.id}
          >
            <ReviewEntryHeader
              review={review}
            />
            <ReviewEntryBody
              reviewBody={reviewBody}
            />
          </ReviewEntry>
        );
      })
    }
  </Wrapper>
);

ReviewsList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
};

export default ReviewsList;
