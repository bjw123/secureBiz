import React, { useEffect, useState, useContext } from 'react';
import Style from './common.module.scss';

// CONTAINER TEMPLATE
export default function BodyContainer(props: any) {
  return (
    <div className={Style.mainContainer}>
      <h1 className={Style.mainTitle}>{props.title}</h1>

      {props.children}
    </div>
  );
}
