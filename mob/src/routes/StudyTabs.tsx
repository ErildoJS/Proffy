import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'//navegation by tabs
import {Ionicons} from '@expo/vector-icons'

import TeacherList from '../pages/TeacherList'
import Favorites from '../pages/Favorites'

const {Navigator, Screen} = createBottomTabNavigator()

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{//opcoes da tabsbar
                style: {
                    elevation: 0,//box-shadow
                    shadowOpacity: 0,//sombra no ios
                    height: 0,
                },
                tabStyle: {//estilizacao de cada aba
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'

                },
                iconStyle: {
                    flex: 0,//tirando a capacidade de ocupar todo espaço
                    width: 20,
                    height: 20,
                },
                labelStyle: {//esltilizacao do texto
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,

                },
                inactiveBackgroundColor: '#fafafc',//a cor de fundo da aba quando nao esta activa
                activeBackgroundColor: '#ebebf5',//cor do fundo  quando estiver activa
                inactiveTintColor: '#c1bccc',//cor do texto  quando nao estiver selecionada
                activeTintColor: '#32264d',//cor do texto  quando estiver selecionada
            }}
        >
            <Screen 
            name="TeacherList"
             component={TeacherList}
             options={{
                 tabBarLabel: 'Proffys',//nome do texto na tab
                 tabBarIcon: ({color, size, focused}) => {
                     return (
                         <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5': color}/>
                     );
                 }
             }}
             />
            <Screen
             name="Favorites"
              component={Favorites}
              options={{
                tabBarLabel: 'Favoritos',//nome do texto na tab
                tabBarIcon: ({color, size, focused}) => {
                    return (
                        <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5': color}/>
                    );
                }
            }}
              />
        </Navigator>
    )
}

export default StudyTabs