import {Button, View} from "react-native";
import {Link, Stack} from "expo-router";

export default function Index() {
    return (
        <>
            <Stack.Screen options={{
                headerShown: false,
            }} />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Link href={{ pathname: '/clock', params: { seconds: 60 } }} asChild>
                    <Button title="1 min" />
                </Link>
                <Link href={{ pathname: '/clock', params: { seconds: 300 } }} asChild>
                    <Button title="5 min" />
                </Link>
                <Link href={{ pathname: '/clock', params: { seconds: 600 } }} asChild>
                    <Button title="10 min" />
                </Link>
                <Link href={{ pathname: '/clock', params: { seconds: 900 } }} asChild>
                    <Button title="15 min" />
                </Link>
            </View>
        </>
    );
}
