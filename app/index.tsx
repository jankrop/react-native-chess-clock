import {Text, Button, View, FlatList, StyleSheet} from "react-native";
import {Link, Stack} from "expo-router";
import {useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

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
            <View style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}>
                <View style={{
                    paddingTop: 40,
                }}>
                    <Text style={{
                        fontSize: 32,
                        textAlign: 'center',
                    }}>
                        Ultimate Chess Clock
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',

                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        {
                            possibleInitialMinutes.map((minutes, index) => (
                                <View key={index} style={[ initialMinutes == minutes && styles.buttonContainerActive ]} >
                                    <Button title={minutes + ' min'} onPress={() => setInitialMinutes(minutes)} />
                                </View>
                            ))
                        }
                    </View>

                    <Text style={{
                        fontSize: 32,
                    }}>
                        +
                    </Text>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        {
                            possibleAddedSeconds.map((seconds, index) => (
                                <View key={index} style={[ addedSeconds == seconds && styles.buttonContainerActive ]} >
                                    <Button title={seconds + '\"'} onPress={() => setAddedSeconds(seconds)} />
                                </View>
                            ))
                        }
                    </View>
                </View>
                <View style={{
                    paddingBottom: 40,
                }}>
                    <Link href={{
                        pathname: '/clock',
                        params: { initialMinutes, addedSeconds }
                    }} asChild>
                        <Button title="Start" />
                    </Link>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttonContainerActive: {
        backgroundColor: "#0002",
        borderRadius: 5,
    }
})
