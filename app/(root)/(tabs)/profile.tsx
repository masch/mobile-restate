import { Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/globalProvider';

interface SettingsProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SetttingItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsProps) => {
    return (
        <TouchableOpacity
            className='flex flex-row items-center justify-between py-3'
            onPress={onPress}
        >
            <View className='flex-row items-center gap-3'>
                <Image
                    source={icon}
                    className='size-6'
                />
                <Text
                    className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
                    {title}
                </Text>
                {showArrow && (
                    <Image
                        source={icons.rightArrow}
                        className='size-5'
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

export function Profile() {
    const { user, refetch } = useGlobalContext()

    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            Alert.alert('Success', 'You have been logged out');
            refetch();
        } else {
            Alert.alert('Error', 'Something went wrong');
        }
    }

    console.log({ a: JSON.stringify(user?.avatar, null, 4) })

    return (
        <SafeAreaView
            className='h-full bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'
            >
                <View
                    className='flex-row items-center justify-between mt-5'>
                    <Text className='text-xl font-rubik-bold'>Profile</Text>
                    <Image
                        source={icons.bell}
                        className='size-5'
                    />
                </View>
                <View className='flex-row justify-center flex mt-5'>
                    <View className='flex flex-col items-center relative mt-5'>
                        <Image className='size-44 relative rounded-full' source={{ uri: user?.avatar }} />
                        <TouchableOpacity
                            onPress={handleLogout}
                            className='absolute bottom-11 right-2'>
                            <Image className='size-9' source={icons.edit} />
                        </TouchableOpacity>
                        <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
                    </View>

                </View>
                <View className='flex flex-col mt-10'>
                    <SetttingItem
                        icon={icons.calendar}
                        title='My Bookings'
                        showArrow
                        onPress={() => { }}
                    />
                    <SetttingItem
                        icon={icons.wallet}
                        title='Payments'
                        onPress={() => { }}
                    />
                    <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
                        {settings.slice(2).map((item, index) => (
                            <SetttingItem
                                key={index}
                                {...item}
                            />
                        ))}
                    </View>
                    <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
                        <SetttingItem
                            textStyle='text-danger'
                            icon={icons.logout}
                            title='Logout'
                            showArrow={false}
                            onPress={handleLogout}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;