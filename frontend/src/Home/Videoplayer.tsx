import React, { Component } from 'react';
import Styles from './homepage.module.scss';
import ReactPlayer from 'react-player';

export default function VideoPlayer(): JSX.Element {
  return (
    <div className={Styles.playerWrapper}>
      <ReactPlayer
        className={Styles.reactPlayer}
        url='https://youtu.be/uvZF4xUwRVs'
        width='150%'
        height='100%'
      />
    </div>
  );
}
