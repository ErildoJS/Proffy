import React, { ReactNode } from  'react'
import {Link} from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

interface PageHeaderProps {
    title: string,
    description?: string
    headerRight?: ReactNode;//posso receber um component como propriedade
}

const pageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt="voltar"/>
                    </Link>
                    <img src={logoImg} alt="proffy"/>
                </div>

                <div className="header-content">
                    <strong>{props.title}</strong>
                    {props.description && <p>{props.description}</p>}

                    {props.headerRight}
                     
                    {props.children}
                </div>
            </header>
    )
}

export default pageHeader