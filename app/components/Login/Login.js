import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Backend from '../../modules/Backend/Backend';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
	        	<Text style={styles.title}>
	        		Trippy
	        	</Text>
	        	<Text style={styles.subTitle}>
	        		A travellers best friend!
	        	</Text>
	        	<View style={styles.inputWrap}>
	        		<Icon name="email" style={styles.icon}/>
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
	          <Icon name="lock" style={styles.icon}/>
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
    backgroundColor: '#00BCD4',
    elevation: -2
	},
	wrapper: {
		paddingHorizontal: 40,
		justifyContent: 'center',
		flex: 1
	},
	inputWrap: {
		flexDirection: 'row',
		marginVertical: 5,
		height: 40,
		backgroundColor: '#00BCD4',
		elevation:2
	},
	icon: {
		padding: 10,
		backgroundColor: '#FF4081',
		color: '#FFF',
		fontSize: 20,
		textAlign: 'center'
	},
	input: {
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: '#FFF'
	},
	login: {
		backgroundColor: '#FF4081',
		paddingVertical: 10,
		marginVertical: 5,
		alignItems: 'center',
		justifyContent: 'center',
		elevation:2
	},
	signUp: {
		backgroundColor: '#FF80AB',
		paddingVertical: 10,
		marginVertical: 5,
		alignItems: 'center',
		justifyContent: 'center',
		elevation:2
	},
	title: {
		textAlign: 'center',
		fontSize: 80,
		color: '#000'
	},
	subTitle: {
		textAlign: 'center',
		fontSize:15,
		fontStyle: 'italic',
		marginBottom:20
	},
	loginText: {
		color:'#FFF',
		fontSize: 18
	},
	signUpText: {
		color:'#000',
		fontSize: 18
	},
	responseText: {
		height: 40,
		marginTop:20,
		textAlign: 'center'
	}
});

AppRegistry.registerComponent('Login', () => Login);