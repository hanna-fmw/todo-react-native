import { Stack, useRouter, useNavigation, Link } from 'expo-router'

export default function Layout() {
	const router = useRouter()
	const navigation = useNavigation()

	return (
		<Stack
			screenOptions={{
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}></Stack>
	)
}
