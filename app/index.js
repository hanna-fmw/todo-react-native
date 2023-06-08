import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Pressable,
	Keyboard,
	Alert,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	Image,
	ScrollView,
} from 'react-native'
import { useRouter, Stack } from 'expo-router'
import Footer from './components/Footer'
import uuid from 'react-native-uuid'
import { useState } from 'react'
import TodoCard from './components/TodoCard'
import { Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const HomePage = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [isAlertVisible, setIsAlertVisible] = useState(false)
	const [todos, setTodos] = useState([])
	const [todo, setTodo] = useState({
		id: uuid.v1(),
		title: '',
		description: '',
		completed: false,
	})

	const router = useRouter()

	function addTodo() {
		if (todo.title && todo.description) {
			setTodos((prevTodos) => [...prevTodos, todo])
			setTodo({
				id: uuid.v1(),
				title: '',
				description: '',
			})
			setIsVisible(false)
		} else {
			setIsAlertVisible(!isAlertVisible)
		}
	}

	function handleInputChange(name, value) {
		setTodo((prevTodo) => ({ ...prevTodo, [name]: value }))
	}

	function handleCompleted(id) {
		setTodos(
			todos.map((item) => {
				if (item.id === id) {
					return { ...item, completed: !item.completed }
				}
				return item
			})
		)
	}

	function deleteTodo(id) {
		setTodos(todos.filter((item) => item.id !== id))
	}

	return (
		<LinearGradient colors={['#D868FF', '#FFA755']} start={[0, 0]} end={[1, 1]} style={styles.gradient}>
			<SafeAreaView style={styles.fill}>
				<Stack.Screen
					options={{
						title: 'Todos',
						headerStyle: { backgroundColor: '#D868FF' },
						headerShown: true,
						headerShadowVisible: false,
						headerRight: () => (
							<Pressable onPress={() => setIsVisible(true)}>
								<Text style={{ fontWeight: 600, color: '#fff' }}>Add</Text>
							</Pressable>
						),
					}}
				/>

				<Modal animationType='slide' visible={isVisible} onRequestClose={() => setIsVisible(false)}>
					<KeyboardAwareScrollView keyboardShouldPersistTaps={'never'} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
						<SafeAreaView style={styles.fill}>
							<View style={styles.container}>
								<Text style={{ textAlign: 'center', marginTop: 50, marginBottom: 20, color: '#191919', fontWeight: 600, fontSize: 18 }}>
									+ Add New Task
								</Text>

								<View>
									<View style={styles.textInput}>
										<Text style={{ color: '#191919', fontWeight: 600, fontSize: 18 }}>Title</Text>
										<TextInput
											value={todo.title}
											style={{ fontSize: 15, color: '#191919' }}
											maxLength={20}
											placeholder='Enter todo title...'
											onChangeText={(text) => handleInputChange('title', text)}
										/>
									</View>
									<View style={styles.textInput}>
										<Text style={{ color: '#191919', fontWeight: 600, fontSize: 18 }}>Description</Text>
										<TextInput
											value={todo.description}
											style={{ fontSize: 15, color: '#191919' }}
											maxLength={250}
											placeholder='Enter todo description...'
											onChangeText={(text) => handleInputChange('description', text)}
										/>
									</View>
								</View>

								<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 }}>
									<TouchableOpacity onPress={addTodo} style={styles.btn}>
										<Text style={styles.btnText}>Add</Text>
									</TouchableOpacity>
									<Modal
										animationType='slide'
										transparent={true}
										visible={isAlertVisible}
										swipeDirection='down'
										onRequestClose={() => {
											Alert.alert('Modal has been closed.')
										}}>
										<View style={styles.alertView}>
											<View style={styles.alertBox}>
												<Text style={styles.alertText}>Fill in the fields!</Text>

												<Pressable
													style={styles.btn}
													onPress={() => {
														setIsAlertVisible(!isAlertVisible)
													}}>
													<Text style={styles.textStyle}>OK</Text>
												</Pressable>
											</View>
										</View>
									</Modal>

									<TouchableOpacity onPress={() => setIsVisible(false)} style={styles.btn}>
										<Text style={styles.btnText}>Cancel</Text>
									</TouchableOpacity>
								</View>
								<Image source={require('../assets/blob.png')} style={styles.image} />
							</View>
						</SafeAreaView>
					</KeyboardAwareScrollView>
				</Modal>

				<ScrollView>
					<View style={styles.content}>
						<Text style={{ color: '#fff', fontWeight: 400, fontSize: 58, marginBottom: 20 }}>What is deferred is not avoided</Text>
						<View>
							<FlatList
								data={todos}
								renderItem={({ item }) => (
									<View>
										<TodoCard
											id={item.id}
											todo={item}
											title={item.title}
											handleCompleted={() => handleCompleted(item.id)}
											completed={item.completed}
											deleteTodo={() => deleteTodo(item.id)}
											handleDescription={() => handleDescription(item.id)}
											description={item.description}
										/>
									</View>
								)}
								keyExtractor={(item) => item.id}
								showsVerticalScrollIndicator={false}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
			<Footer />
		</LinearGradient>
	)
}
const styles = StyleSheet.create({
	fill: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		flex: 1,
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	btn: {
		backgroundColor: '#191919',
		color: '#fff',
		fontWeight: 400,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 73,
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 80,
	},
	btnText: {
		color: '#fff',
		fontSize: 16,
	},
	textInput: {
		width: 345,
		height: 90,
		marginBottom: 70,
		marginLeft: 30,
	},
	image: {
		position: 'absolute',
		left: '55%',
		top: '-4%',
		bottom: '52.08%',
		zIndex: -5,
	},
	gradient: {
		width: '100%',
		height: '100%',
		zIndex: -2,
	},
	alertView: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
	},
	alertBox: {
		margin: 20,
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	alertText: {
		marginBottom: 15,
		textAlign: 'center',
	},
})

export default HomePage
