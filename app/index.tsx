import { useSSO } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'

export default function Index() {
  const { startSSOFlow } = useSSO()
  // const { top } = useSafeAreaInsets()

  const handleAppleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_apple',
      })
      console.log('handleAppleOAuth - createdSessionId', createdSessionId)

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      })
      console.log('handleGoogleOAuth - createdSessionId', createdSessionId)

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const openLink = async () => {
    WebBrowser.openBrowserAsync('https://google.com')
  }

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Image
          source={require('@/assets/images/todoist-logo.png')}
          style={styles.loginImage}
        />
        <Image
          source={require('@/assets/images/login.png')}
          style={styles.bannerImage}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAppleOAuth}>
            <Ionicons name='logo-apple' size={24} />
            <Text style={styles.textButton}>Sign in with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGoogleOAuth}>
            <Ionicons name='logo-google' size={24} />
            <Text style={styles.textButton}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name='mail' size={24} />
            <Text style={styles.textButton}>Sign in with Email</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            By continuing, you agree to Todoist's{' '}
            <Text style={styles.link} onPress={openLink}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={openLink}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    // backgroundColor: 'blue',
    alignSelf: 'center',
  },
  bannerImage: {
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
    // backgroundColor: 'lightgreen',
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
    // backgroundColor: 'gray',
  },
  button: {
    flexDirection: 'row',
    // backgroundColor: 'tomato',
    padding: 12,
    gap: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
  },
  textButton: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})
