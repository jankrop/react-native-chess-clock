import {Text, Button, View, StyleSheet} from "react-native";
import {Link, Stack} from "expo-router";
import {useState} from "react";
import {useSafeAreaInsets, SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
    const insets = useSafeAreaInsets();

    const [initialMinutes, setInitialMinutes] = useState<number>(10);
    const [addedSeconds, setAddedSeconds] = useState<number>(0);

    const possibleInitialMinutes = [
        1, 2, 5, 10, 15, 30, 60
    ]

    const possibleAddedSeconds = [
        0, 1, 2, 3, 5, 10, 20
    ]

    return (
        <>
            <Stack.Screen options={{
                headerShown: false,
            }} />
            <SafeAreaView style={styles.container}>
                <View style={styles.title}>
                    <Text>Ultimate Chess Clock</Text>
                </View>
                <View style={styles.mainMenu}>
                    <View style={styles.subMenu}>
                        {
                            possibleInitialMinutes.map((minutes, index) => (
                                <View key={index} style={[ initialMinutes == minutes && styles.buttonContainerActive ]} >
                                    <Button title={minutes + ' min'} onPress={() => setInitialMinutes(minutes)} />
                                </View>
                            ))
                        }
                    </View>

                    <Text style={styles.largeText}>+</Text>

                    <View style={styles.subMenu}>
                        {
                            possibleAddedSeconds.map((seconds, index) => (
                                <View key={index} style={[ addedSeconds == seconds && styles.buttonContainerActive ]} >
                                    <Button title={seconds + '\"'} onPress={() => setAddedSeconds(seconds)} />
                                </View>
                            ))
                        }
                    </View>
                </View>
                <View style={styles.footer}>
                    <Link href={{
                        pathname: '/clock',
                        params: { initialMinutes, addedSeconds }
                    }} asChild>
                        <Button title="Start" />
                    </Link>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        paddingTop: 40,
        fontSize: 32,
        textAlign: 'center',
    },
    mainMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subMenu: {
        flex: 1,
        alignItems: 'center',
    },
    largeText: {
        fontSize: 32,
    },
    buttonContainerActive: {
        backgroundColor: "#0002",
        borderRadius: 5,
    },
    footer: {
        paddingBottom: 40,
    },
})
