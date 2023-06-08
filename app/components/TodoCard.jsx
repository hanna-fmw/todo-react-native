import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TodoCard = ({ id, title, description, handleCompleted, completed, deleteTodo }) => {
	const router = useRouter()

	return (
		<View style={styles.container}>
			<View style={{ marginTop: 25, marginBottom: 5, borderTopColor: '#fff', borderTopWidth: 0.5, borderStyle: 'solid' }}>
				<Text style={{ color: '#fff', marginTop: 15 }}>Done?</Text>
			</View>
			<View style={styles.content}>
				<Pressable style={[styles.checkbox, completed && styles.checkboxChecked]} onPress={handleCompleted}>
					{completed && <Ionicons name='checkmark' size={24} style={{ color: 'white' }} />}
				</Pressable>
				<View>
					<Text style={styles.text}>{title}</Text>
				</View>

				<Link
					href={{ pathname: '/details', params: { description } }}
					style={[styles.link, { color: 'white', fontWeight: 600, textDecorationLine: 'underline' }]}>
					Open
				</Link>
			</View>

			<View style={styles.btnContainer}>
				<Pressable onPress={deleteTodo} style={styles.deleteBtn}>
					<Text style={{ color: '#191919', fontWeight: 400 }}>Delete</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	checkbox: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'baseline',
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#fff',
	},
	checkboxChecked: {
		backgroundColor: '#191919',
	},
	container: {
		flex: 1,
		borderRadius: 4,
		marginBottom: 10,
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5,
	},
	text: {
		color: '#fff',
		fontWeight: 500,
		fontSize: 16,
	},
	btnContainer: {
		alignSelf: 'flex-start',
		marginTop: 10,
	},
	deleteBtn: {
		borderRadius: 5,
		padding: 8,
		backgroundColor: '#fff',
		marginRight: 10,
	},
	openBtn: {
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
	textContainer: {
		flex: 1,
		marginLeft: 10,
	},
})

export default TodoCard
