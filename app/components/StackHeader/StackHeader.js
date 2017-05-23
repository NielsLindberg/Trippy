import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import AddButton from '../../components/AddButton/AddButton';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class StackHeader extends Component{
  constructor(props){
    super(props);
    this.backHandler = this.backHandler.bind(this);
  }
  backHandler(){
    this.props.navigateByType('Navigation/BACK');
  }
  
  render(){
    return(
    		<View>
          <View style={styles.header}>
            {this.props.backButton ? <TouchableOpacity style={styles.backButton} onPress={() => {this.backHandler()}}>
            <Icon name="navigate-before" style={styles.backButtonText}/>
            </TouchableOpacity> : null}
            <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
          </View>
          {this.props.itemAdd ? <AddButton 
              destination={this.props.destination} 
              item={this.props.itemAdd}
          /> : null }
        </View>
      )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: CommonStyles.colorPrimary,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
    elevation: 2
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonText: {
    color: CommonStyles.lightText.primary,
    fontSize: 25,
    paddingRight: 16
  },
  headerTitle: {
    color: CommonStyles.lightText.primary,
    fontWeight: 'normal',
    fontSize: 16
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StackHeader);