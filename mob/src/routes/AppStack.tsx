import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'
import StudyTabs from './StudyTabs'

const {Navigator, Screen} = createStackNavigator()

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>{/**desativa o nome da rota em cima */}
                <Screen name="Landing" component={Landing}/>
                <Screen name="giveClasses" component={GiveClasses}/>

                <Screen name="Study" component={StudyTabs}/>{/**arquivos com as rotas de tabs */}
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack