import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const Footer = ({ icon }) => {
	const [date, setDate] = useState(
		new Date().toLocaleString('sv-SE', {
			day: 'numeric',
			month: 'short',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		})
	)

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(
				new Date().toLocaleString('sv-SE', {
					day: 'numeric',
					month: 'short',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
					hour12: false,
				})
			)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<LinearGradient colors={['#FFA499', '#FEA373', '#FFA755']} start={[0, 0]} end={[1, 1]} style={styles.gradient}>
			<View style={styles.footer}>
				<View>
					<Text style={{ color: '#fff', fontWeight: 'bold' }}>{date}</Text>
				</View>
				<View>
					<View>{icon}</View>
				</View>
			</View>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 90,
		paddingHorizontal: 20,
		borderTopColor: 'white',
		zIndex: 100,
	},
})

export default Footer
