import React, { FC } from 'react';

import './styles.css';

type propTypes = {
  title: string;
};

const TitleContainer: FC<propTypes> = ({ title }) => (
  <div className="title-container">
    <h1 className="title">{title}</h1>
  </div>
);

export default TitleContainer;
