import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Animation from 'lottie-react-native';

import anim from '../../assets/Watermelon.json';

class CounterView extends Component {
  static displayName = 'CounterView';
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    if (this.props.counter == 10){
     Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
    }).start();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.counter == 10){
      this.runAnimation();
    }
  }

  static navigationOptions = {
    title: 'Counter',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='plus-one' size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
    counter: PropTypes.number.isRequired,
    userName: PropTypes.string,
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    counterStateActions: PropTypes.shape({
      increment: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      random: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  increment = () => {
    this.props.counterStateActions.increment();
  };

  reset = () => {
    this.props.counterStateActions.reset();
    this.setState((prevState, props) => {
  return {progress: new Animated.Value(0)};
  });
};

runAnimation = () => {
       Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 5000,
        }).start();
    };

  random = () => {
    this.props.counterStateActions.random();
  };

  bored = () => {
    this.props.navigate({routeName: 'Color'});
  };

  renderUserInfo = () => {
    if (!this.props.userName) {
      return null;
    };


    return (
      <View style={styles.userContainer}>
        <Image
          style={styles.userProfilePhoto}
          source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80
          }}
          />
        <Text style={styles.linkButton}>
          Welcome, {this.props.userName}!
        </Text>
      </View>
    );
  };

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>

        {this.renderUserInfo()}
        

        <TouchableOpacity
          accessible={true}
          accessibilityLabel={'Increment counter'}
          onPress={this.increment}
          style={[styles.counterButton, loadingStyle]}>
          <Text style={styles.counter}>
            {this.props.counter}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Reset counter'}
            onPress={this.reset}>
          <Text style={styles.linkButton}>
            Reset
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Run Animation'}
            onPress={this.runAnimation}>
          <Text style={styles.linkButton}>
            Suprise !
          </Text>
        </TouchableOpacity>
        <View style={styles.animationContainer}>
        <Animation
          style={styles.animationContainer}
          source={anim}
          progress={this.state.progress}
        />
        </View>

      </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    // padding: 5
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  },
  animationContainer: {
    height: 300,
    width: 300,
    // marginBottom: 10
  }
});

export default CounterView;
