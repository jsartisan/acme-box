import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const typeToAnimationClassDic = {
  bottom: 'translateBottom',
  left: 'translateLeft',
};

export default function Animate({ type = 'bottom', children, className = '' }) {
  return (
    <ReactCSSTransitionGroup
      transitionName={typeToAnimationClassDic[type]}
      transitionAppear={true}
      className={className}
      transitionAppearTimeout={250}
      transitionEnterTimeout={250}
      transitionLeaveTimeout={100}
      style={{ display: 'block' }}
    >
      {children}
    </ReactCSSTransitionGroup>
  );
}
