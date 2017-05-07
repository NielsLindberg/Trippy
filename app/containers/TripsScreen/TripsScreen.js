import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import TripList from '../../components/TripList/TripList';
import CommonStyles from '../../lib/CommonStyles';
import AddButton from '../../components/AddButton/AddButton';

const buttonStyle = {
      padding: 5,
      elevation: 4,
      backgroundColor: CommonStyles.colorAccent,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    };
    const buttonTextStyle = {
      fontSize: 45,
      color: CommonStyles.lightText.primary
    };
    const itemAdd = {
      title: '', 
      active: false, 
      locations: []
    };

class TripsScreen extends Component{
  static navigationOptions = ({navigation}) => ({
      headerRight: <AddButton 
              styles={buttonStyle}
              textStyles={buttonTextStyle}
              addItem={this.props.addUserItem} 
              destination={'trips'} 
              item={itemAdd}
            />
  });
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <TripList navigation={this.props.navigation}/>
            
        </View>
      )
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripsScreen);