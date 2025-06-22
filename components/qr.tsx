import * as React from "react"
import { useCallback, useState } from "react"
import {
  StyleSheet,
  View,
  AppState,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera"
import { useIsFocused } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import type { Code } from "react-native-vision-camera"
const SCREEN_WIDTH = Dimensions.get("window").width
const qrFrameSize = SCREEN_WIDTH * 0.7
const cornerSize = 80
const overlayColor = "rgba(0, 0, 0, 0.5)" // Black with 50% opacity
// QR Frame with Curved Corners
const QRFrameWithCurvedCorners = () => {
  return (
    <View style={styles.qrFrameContainer}>
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  )
}
// Camera with Flash and Back Icons
export const QrCodeScanner = ({
  onCodeScanned,
  loading,
  isVisitorScreen = false,
}: {
  loading: boolean
  onCodeScanned: (codes: Code[]) => void
  isVisitorScreen?: boolean
}) => {
  const device = useCameraDevice("back")
  const isFocused = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocused && isForeground
  const onCodeScannedCallback = useCallback(onCodeScanned, [])
  const navigation = useNavigation()
  // Calculate screen height dynamically
  const screenHeight = isVisitorScreen
    ? Dimensions.get("window").height * 0.8
    : Dimensions.get("window").height
  const [flashMode, setFlashMode] = useState<"off" | "on">("off")
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: onCodeScannedCallback,
  })
  const onFlashToggle = () => {
    setFlashMode((prev) => (prev === "off" ? "on" : "off"))
  }
  return (
    <View style={styles.container}>
      {device != null && !loading ? (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
            torch={flashMode}
          />
          <View style={styles.overlay}>
            {/* Semi-transparent background */}
            {/* QR Frame */}
            <QRFrameWithCurvedCorners />
            {/* Flash Icon */}
            <TouchableOpacity style={styles.flashIcon} onPress={onFlashToggle}>
              <View style={styles.iconCircle}>
              </View>
            </TouchableOpacity>
            {/* Back Icon */}
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() =>
                isVisitorScreen ? navigation.goBack() : navigation.navigate("HomeScreen" as never)
              }
            >
              <View style={styles.iconCircle}>
              </View>
            </TouchableOpacity>
            <View style={[styles.overlayTop, { height: (screenHeight - qrFrameSize) / 2 + 2 }]} />
            <View
              style={[styles.overlayBottom, { height: (screenHeight - qrFrameSize) / 2 + 2 }]}
            />
            <View
              style={[
                styles.overlayLeft,
                {
                  top: (screenHeight - qrFrameSize) / 2 + 2,
                  bottom: (screenHeight - qrFrameSize) / 2 + 2,
                },
              ]}
            />
            <View
              style={[
                styles.overlayRight,
                {
                  top: (screenHeight - qrFrameSize) / 2 + 2,
                  bottom: (screenHeight - qrFrameSize) / 2 + 2,
                },
              ]}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}
// Helper hook for checking if the app is in the foreground
const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(true)
  React.useEffect(() => {
    if (["android", "ios"].includes(Platform.OS) === false) return
    const onChange = (state: any): void => {
      setIsForeground(state === "active")
    }
    const listener = AppState.addEventListener("change", onChange)
    return () => listener.remove()
  }, [setIsForeground])
  return isForeground
}
const styles = StyleSheet.create({
  overlayTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: overlayColor,
  },
  overlayBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: overlayColor,
  },
  overlayLeft: {
    position: "absolute",
    left: 0,
    width: (SCREEN_WIDTH - qrFrameSize) / 2 + 7,
    backgroundColor: overlayColor,
  },
  overlayRight: {
    position: "absolute",
    right: 0,
    width: (SCREEN_WIDTH - qrFrameSize) / 2 + 7,
    backgroundColor: overlayColor,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  qrFrameContainer: {
    width: qrFrameSize,
    height: qrFrameSize,
    position: "absolute",
    left: (SCREEN_WIDTH - qrFrameSize) / 2,
    zIndex: 1,
  },
  corner: {
    position: "absolute",
    width: cornerSize,
    height: cornerSize,
    borderColor: "white",
    borderWidth: 8,
    borderRadius: 2,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopLeftRadius: 25,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopRightRadius: 25,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 25,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 25,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  flashIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
})