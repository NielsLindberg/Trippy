import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

const goToTrips = NavigationActions.reset({index: 0,actions: [NavigationActions.navigate({ routeName: 'Tabs'})]});
class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			response: '',
			user: '',
			token: ''
		};
  }
  componentWillReceiveProps(){
  	if(this.props.authenticated && this.props.userRef) {
  		this.props.navigation.dispatch(goToTrips);
  	}
  }
	render(){
		return (
	    <View style={styles.container}>
	        <View style={styles.wrapper}>
	        	<MaterialIcon name='flight-takeoff' style={styles.title}/>
	        	<Text style={styles.subTitle}>
	        		trippy
	        	</Text>
	        	<View style={styles.inputWrap}>
	        		<View style={styles.iconWrap}>
	        			<Icon name="envelope" style={styles.icon}/>
        			</View>		
	            <TextInput
	            		style={styles.input}
	                placeholder="Email"
	                onChangeText={(email) => this.setState({email})}
	                keyboardType="email-address"
	                autoCapitalize="none"
	                placeholderTextColor={CommonStyles.colorSemiBlack}
	                underlineColorAndroid="transparent"
	            />
	          </View>
	          <View style={styles.inputWrap}>
	          	<View style={styles.iconWrap}>
	          		<Icon name="lock" style={styles.icon}/>
	          	</View>
	            <TextInput
	            		style={styles.input}
	                placeholder="Password"
	                onChangeText={(password) => this.setState({password})}
	                secureTextEntry={true}
	                password={true}
	                autoCapitalize="none"
	                placeholderTextColor={CommonStyles.colorSemiBlack}
	                underlineColorAndroid="transparent"
	            />
	          </View>
	          <View style={styles.loginWrapper}>
              <TouchableOpacity
              	onPress={() => {Backend.signIn(this.state.email,this.state.password)}}
              	activeOpacity={0.5}
              	style={styles.login}
              >
              	<Text style={styles.loginText}>
              		Login
              	</Text>
              </TouchableOpacity>
              <TouchableOpacity
              	onPress={() => {Backend.signUp(this.state.email,this.state.password)}}
              	activeOpacity={0.5}
              	style={styles.signUp}
              >
              	<Text style={styles.signUpText}>
              		Sign up
              	</Text>
              </TouchableOpacity>
             </View>
            <Text style={styles.textOR}>
            	OR
            </Text>
            <TouchableOpacity
            	onPress={() => {this.props.getGoogleSignin()}}
            	activeOpacity={0.5}
            >
            	<View style={styles.loginGoogle}>
            		<Text style={styles.signUpText}>
            			Login with Google
            		</Text>
            	</View>
            </TouchableOpacity>
            <Text style={styles.responseText}>{this.state.response}</Text>
	        </View>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	wrapper: {
		paddingHorizontal: 40,
		justifyContent: 'center',
		flex: 1
	},
	inputWrap: {
		flexDirection: 'row',
		marginVertical: 5,
		borderBottomWidth: 1,
		borderBottomColor: CommonStyles.colorSemiBlack
	},
	iconWrap: {
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		color: CommonStyles.colorSemiBlack,
		padding: 0,
		paddingVertical: 0,
		fontSize: 28,
		alignSelf: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	input: {
		flex: 1,
		color: CommonStyles.colorSemiBlack,
		paddingVertical: 5,
		fontSize: 18,
		paddingHorizontal: 5
	},
	loginWrapper: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		marginVertical: 2.5
	},
	login: {
		backgroundColor: CommonStyles.colorSemiBlack,
		paddingVertical: 10,
		marginRight: 2.5,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	signUp: {
		backgroundColor: CommonStyles.colorSemiBlack,
		paddingVertical: 10,
		marginLeft: 2.5,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	textOR: {
		alignSelf: 'center',
		margin: 5,
		fontSize: 16,
		color: CommonStyles.colorSemiBlack
	},
	loginGoogle: {
		backgroundColor: '#dc4e42',
		paddingVertical: 10,
		marginVertical: 2.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 120,
		color: CommonStyles.colorSemiBlack,
    fontFamily: CommonStyles.fontPrimary
	},
	subTitle: {
		textAlign: 'center',
		color: CommonStyles.colorSemiBlack,
		fontSize:20,
		marginBottom:20
	},
	loginText: {
		color: CommonStyles.colorAccentText,
		fontSize: 18,
    fontFamily: CommonStyles.fontPrimary
	},
	signUpText: {
		color: CommonStyles.colorAccentText,
		fontSize: 18,
    fontFamily: CommonStyles.fontPrimary
	},
	responseText: {
		height: 40,
		marginTop:20,
		textAlign: 'center',
		color: '#00000050',
    fontFamily: CommonStyles.fontPrimary
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		authenticated: state.setFirebaseUser.authenticated,
		userRef: state.setFirebaseUserRef
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);