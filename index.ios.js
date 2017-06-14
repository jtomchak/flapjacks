import {Provider} from 'react-redux';
import store from './src/redux/store';
import codePush from "react-native-code-push";
import AppViewContainer from './src/modules/AppViewContainer';


import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class flapjacks extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}
const codePushApp = codePush(codePushOptions)(flapjacks);
AppRegistry.registerComponent('flapjacks', () => codePushApp);
