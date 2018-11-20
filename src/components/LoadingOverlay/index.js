import React from 'react'
import './LoadingOverlay.scss'
import Icon from '../../static/img/logo.svg';

const LoadingOverlay = () => {
    return (
        <div className='LoadingOverlay'>
            <div>
                <img src={Icon} width="200px" height="200px" alt="Carregando..." />
            </div>
        </div>
    )
}

export default LoadingOverlay