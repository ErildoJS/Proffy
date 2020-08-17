import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native' //butao que perde opacodade ao clique
import {useNavigation} from '@react-navigation/native'//navegacao entre paginas
import {RectButton} from 'react-native-gesture-handler'//botao retangular 
import styles from './styles'

import landingImg from '../../assets/images/landing.png';
import studyImg from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import { useEffect } from 'react'
import api from '../../services/api'
import { useState } from 'react'

function Landing() {

    const {navigate} = useNavigation()
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('connections').then(response => {
            const {total} = response.data

            setTotalConnections(total)

        })
    }, [])

    function handleNavigateToGiveClassesPage() {
        navigate('giveClasses')//nome da rota que vou ir
    }

    function handleNavigateToStudyPages() {
        navigate('Study')
    }

    return ( <View style={styles.container}>
        <Image source={landingImg} style={styles.banner}/>

        <Text style={styles.title}>
            Seja bem-vindo {'\n'}
            <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
            <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                <Image source={studyImg}/>

                <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>

            <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecundary]}>
                <Image source={giveClassesIcon}/>

                <Text style={styles.buttonText}>Dar aulas</Text>
            </RectButton>
        </View>

        <Text style={styles.totalConnections}>
            Total de {totalConnections} conexoes ja realizadas {' '}
            <Image source={heartIcon}/>
        </Text>
    </View>
    )
}

export default Landing