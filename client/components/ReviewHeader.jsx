import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FiveStar from './FiveStar';
import ReviewCriteriaAverage from './ReviewCriteriaAverage';

const Wrapper = styled.section`
  margin-left: 120px;
  padding: 24px;
  width: ${({ widgetWidth }) => widgetWidth}px;
  height: 180px;
`;

const ReviewHeading = styled.h2`
  border-bottom: 1px solid #EBEBEB !important;
  color: #484848;
  font-weight: bold;
`;

const LeftSideHeader = styled.div`
  display: inline-block;
  width: ${({ widgetWidth }) => (widgetWidth * 0.65)}px;
  height: 56px;
`;

const RightSideHeader = styled.div`
  display: inline-block;
  position: absolute;
  width: ${({ widgetWidth }) => (widgetWidth * 0.35)}px;
  height: 56px;
`;

const AverageReview = styled.span`
  height: 50px;
  display: inline-block;
`;

class ReviewHeader extends React.Component {
  constructor(props) {
    super(props);

    this.calculateAverageTotalStarRating = this.calculateAverageTotalStarRating.bind(this);
    this.calculateAverageCriteriaStarRating = this.calculateAverageCriteriaStarRating.bind(this);
  }

  calculateAverageTotalStarRating() {
    const categories = ['accuracy', 'communication', 'cleanliness', 'location', 'checkin', 'value'];
    const { reviews } = this.props;
    let numberOfStars = 0;

    reviews.forEach((review) => {
      categories.forEach((category) => {
        numberOfStars += review[category];
      });
    });

    const numberOfReviews = reviews.length * categories.length;
    const averageRating = numberOfStars / numberOfReviews;
    const averagePercentageRating = (averageRating / 5 * 100).toFixed(2);

    return averagePercentageRating;
  }

  calculateAverageCriteriaStarRating() {
    const categories = ['accuracy', 'communication', 'cleanliness', 'location', 'checkin', 'value'];
    const { reviews } = this.props;

    const criteriaReviews = {
      accuracy: 0,
      communication: 0,
      cleanliness: 0,
      location: 0,
      checkin: 0,
      value: 0,
    };

    reviews.forEach((review) => {
      categories.forEach((category) => {
        criteriaReviews[category] += review[category];
      });
    });

    const numberOfReviews = reviews.length;

    categories.forEach((category) => {
      const totalRating = criteriaReviews[category];
      const averageRating = totalRating / numberOfReviews;
      criteriaReviews[category] = (averageRating / 5 * 100).toFixed(2);
    });

    return criteriaReviews;
  }

  render() {
    const { reviews, widgetWidth } = this.props;
    const averageRating = this.calculateAverageTotalStarRating();
    const averageCriteriaRatings = this.calculateAverageCriteriaStarRating();
    const numReviews = `${reviews.length} Reviews`;

    return (
      <Wrapper
        widgetWidth={widgetWidth}
      >
        <ReviewHeading>
          <LeftSideHeader
            widgetWidth={widgetWidth}
          >
            <AverageReview>
              { numReviews }
            </AverageReview>
            <FiveStar
              averageRating={averageRating}
              starSize={18}
            />
          </LeftSideHeader>
          <RightSideHeader
            widgetWidth={widgetWidth}
          />
        </ReviewHeading>
        <ReviewCriteriaAverage
          averageCriteriaRatings={averageCriteriaRatings}
          widgetWidth={widgetWidth}
        />
      </Wrapper>
    );
  }
}

ReviewHeader.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  widgetWidth: PropTypes.number.isRequired,
};

export default ReviewHeader;
