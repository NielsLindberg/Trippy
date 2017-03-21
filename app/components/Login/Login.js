import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Backend from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			response: ''
		};

		this.signUp = this.signUp.bind(this);
		this.signIn = this.signIn.bind(this);
	}

	async signUp() {

    try {
        await Backend.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({
            response: "account created"
        });
        this.props.navigator.push({
        	id: 'trips',
        	title: 'Trips'
        });

    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }

  }

	async signIn() {

    try {
        await Backend.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

        this.setState({
            response: "Logged In!"
        });
        this.props.navigator.push({
        	id: 'trips',
        	title: 'Trips'
        });

    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }
  }

	render(){
		return (
	    <View style={styles.container}>
	        <View style={styles.wrapper}>
	        	<Icon name='flight-takeoff' style={styles.title}/>
	        	<Text style={styles.subTitle}>
	        		trippy
	        	</Text>
	        	<View style={styles.inputWrap}>
	        		<View style={styles.iconWrap}>
	        			<Icon name="email" style={styles.icon}/>
        			</View>		
	            <TextInput
	            		style={styles.input}
	                placeholder="Email Address"
	                onChangeText={(email) => this.setState({email})}
	                keyboardType="email-address"
	                autoCapitalize="none"
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
	                underlineColorAndroid="transparent"
	            />
	          </View>
              <TouchableOpacity
              	onPress={() => {this.signIn()}}
              	activeOpacity={0.5}
              >
              	<View style={styles.login}>
              		<Text style={styles.loginText}>
              			Login
              		</Text>
              	</View>
              </TouchableOpacity>
              <TouchableOpacity
              	onPress={() => {this.signUp()}}
              	activeOpacity={0.5}
              >
              	<View style={styles.signUp}>
              		<Text style={styles.signUpText}>
              			Sign Up
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
		flex: 1,
    backgroundColor: CommonStyles.colorPrimary800,
	},
	wrapper: {
		paddingHorizontal: 60,
		justifyContent: 'center',
		flex: 1
	},
	inputWrap: {
		flexDirection: 'row',
		marginVertical: 5,
		backgroundColor: CommonStyles.colorPrimary800,
		elevation:2,
		borderRadius: 5
	},
	iconWrap: {
		alignSelf: 'stretch',
		backgroundColor: CommonStyles.colorAccent,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	icon: {
		paddingHorizontal: 10,
		color: CommonStyles.colorAccentText,
		paddingVertical: 5,
		fontSize: 18,
		alignSelf: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	input: {
		flex: 1,
		paddingVertical: 5,
		fontSize: 14,
		paddingHorizontal: 10,
		backgroundColor: '#FFF',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	login: {
		backgroundColor: CommonStyles.colorAccent,
		paddingVertical: 10,
		marginVertical: 5,
		alignItems: 'center',
		justifyContent: 'center',
		elevation:2,
		borderRadius: 5
	},
	signUp: {
		borderColor: CommonStyles.colorAccent,
		borderWidth: 2,
		backgroundColor: 'transparent',
		paddingVertical: 10,
		marginVertical: 5,
		alignItems: 'center',
		justifyContent: 'center',
		elevation:2,
		borderRadius: 5
	},
	title: {
		textAlign: 'center',
		fontSize: 120,
		color: '#00000050'
	},
	subTitle: {
		textAlign: 'center',
		color: '#00000050',
		fontSize:20,
		marginBottom:20
	},
	loginText: {
		color: CommonStyles.colorAccentText,
		fontSize: 18
	},
	signUpText: {
		color: CommonStyles.colorAccentText,
		fontSize: 18
	},
	responseText: {
		height: 40,
		marginTop:20,
		textAlign: 'center',
		color: '#00000050'
	}
});

AppRegistry.registerComponent('Login', () => Login);