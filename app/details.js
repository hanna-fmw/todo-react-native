import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRouter, useSearchParams, Stack } from 'expo-router'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const Details = () => {
	const router = useRouter()

	const { description } = useSearchParams()

	return (
		<LinearGradient colors={['#0CF0FF', '#0C6DFF']} start={[0, 0]} end={[1, 1]} style={styles.gradient}>
			<SafeAreaView style={[styles.fill]}>
				<Stack.Screen
					options={{
						title: 'Details',
						headerStyle: { backgroundColor: '#0CF0FF' },
						headerShown: true,
						headerShadowVisible: false,

						headerLeft: () => (
							<Pressable onPress={() => router.push('/')}>
								<Text style={{ color: '#fff', fontWeight: 600 }}>Back</Text>
							</Pressable>
						),
					}}
				/>

				<View style={styles.container}>
					<View style={styles.content}>
						<Text style={{ color: '#fff', fontWeight: 400, fontSize: 48 }}>
							“Procrastination is the art of keeping up with yesterday”
							<Text style={{ color: '#fff', fontWeight: 400, fontSize: 18 }}>―&nbsp;Don Marquis</Text>
						</Text>
						<View style={styles.descriptionBox}>
							<Text style={{ color: '#fff', fontSize: 18 }}>{description}</Text>
							{console.log(description)}
						</View>
						<View>
							<View style={styles.btnContainer}>
								<Pressable onPress={() => router.push('/')} style={styles.backBtn}>
									<Text style={{ color: '#191919', fontWeight: 500 }}>Back</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	fill: { flex: 1 },
	container: {
		flex: 1,
		margin: 15,
		justifyContent: 'space-between',
	},
	link: {
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	btnContainer: { alignSelf: 'center', marginTop: 30 },
	backBtn: {
		borderRadius: 5,
		padding: 8,
		backgroundColor: '#fff',
		marginRight: 10,
	},
	descriptionBox: {
		alignSelf: 'center',
		marginTop: 50,
		width: '80%',
		minHeight: 200,
		padding: 15,
		borderWidth: 0.5,
		borderColor: '#fff',
		borderStyle: 'solid',
		borderRadius: 10,
	},
	gradient: {
		width: '100%',
		height: '100%',
		zIndex: 2,
	},
})

export default Details
