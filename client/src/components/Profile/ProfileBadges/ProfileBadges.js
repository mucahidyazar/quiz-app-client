import React from "react";

export default function ProfileBadges() {
  return (
    <div className="badges">
      <div className="badges__title">Badges</div>
      <div className="badges__body">
        <div className="badges__body--item">
          <i class="fas fa-ribbon"></i>
          <span>Ribbon Hunter</span>
        </div>
        <div className="badges__body--item">
          <i class="fas fa-allergies"></i>
          <span>Allergy Man</span>
        </div>
        <div className="badges__body--item">
          <i class="fab fa-angellist"></i>
          <span>Angellist</span>
        </div>
        <div className="badges__body--item">
          <i class="far fa-angry"></i>
          <span>Angry Quizer</span>
        </div>
        <div className="badges__body--item">
          <i class="fas fa-at"></i>
          <span>Postman</span>
        </div>
        <div className="badges__body--item">
          <i class="fas fa-baby-carriage"></i>
          <span>Baby Baby</span>
        </div>
        <div className="badges__body--item">
          <i class="fas fa-binoculars"></i>
          <span>Scoper</span>
        </div>
        <div className="badges__body--item">
          <i class="fab fa-black-tie"></i>
          <span>Gentlemen</span>
        </div>
      </div>
    </div>
  );
}
