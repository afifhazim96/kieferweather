import React from 'react';
import { Router as RNRouter, Scene } from 'react-native-router-flux';

import Home from './components/home';
import Forecast from './components/forecast';
import Search from './components/search';

transitionEffect = () => ({
  containerStyle: {
    backgroundColor: "transparent"
  }
});

export default Router = () => (
  <RNRouter getSceneStyle={() => ({ backgroundColor: 'transparent' })}>
    <Scene key="root"
    transitionConfig={this.transitionEffect}
    >
      <Scene
        key="home"
        component={Home}
        title="Home"
        initial
        hideNavBar
      />
      <Scene
        key="forecast"
        component={Forecast}
        title="Forecast"
        hideNavBar
      />
      <Scene
        key="search"
        component={Search}
        title="Search"
        hideNavBar
      />
    </Scene>
  </RNRouter>
);
