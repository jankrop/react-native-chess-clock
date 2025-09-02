import {router, Stack, useLocalSearchParams} from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation'
import {Pressable, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useTimer} from 'react-timer-hook';
import {useTimerResultType} from "react-timer-hook/dist/types/src/useTimer";

enum Player {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2,
}

export default function ClockPage() {
    const { seconds } = useLocalSearchParams();

    const time = new Date();
    time.setSeconds(time.getSeconds() + parseInt(seconds as string));

    const leftTimer = useTimer({ expiryTimestamp: time, autoStart: false, interval: 20 });
    const rightTimer = useTimer({ expiryTimestamp: time, autoStart: false, interval: 20 });

    const [player, setPlayer] = useState<Player>(Player.NONE);

    function getTimeString(timer: useTimerResultType) {
        return (
            String(timer.minutes).padStart(2, "0") + ':' +
            String(timer.seconds).padStart(2, "0")
        )
    }

    function setPlayerAndToggleTimers(p: Player) {
        setPlayer(p)
        if (p === Player.RIGHT) {
            leftTimer.pause()
            rightTimer.resume()
        } else {
            rightTimer.pause()
            leftTimer.resume()
        }
    }

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    })

    return (
        <>
            <Stack.Screen options={{
                headerShown: false,
            }}/>
            <View style={{
                flex: 1
            }}>
                <Pressable
                    onPress={() => setPlayerAndToggleTimers(Player.RIGHT)}
                    onLongPress={() => router.navigate('/')}
                    style={{
                        flex: 1,
                        backgroundColor: player === Player.LEFT ? '#008000' : '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ transform: [{'rotate': '90deg'}] }}>
                        <Text style={{
                            color: player === Player.LEFT ? '#ffffff' : '#008000',
                            transform: [{'rotate': '90deg'}],
                            fontSize: 96
                        }}>
                            { getTimeString(leftTimer) }
                        </Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => setPlayerAndToggleTimers(Player.LEFT)}
                    onLongPress={() => router.navigate('/')}
                    style={{
                        flex: 1,
                        backgroundColor: player === Player.RIGHT ? '#008000' : '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ transform: [{'rotate': '90deg'}] }}>
                        <Text style={{
                            color: player === Player.RIGHT ? '#ffffff' : '#008000',
                            transform: [{'rotate': '90deg'}],
                            fontSize: 96
                        }}>
                            { getTimeString(rightTimer) }
                        </Text>
                    </View>
                </Pressable>
            </View>
        </>
    )
}