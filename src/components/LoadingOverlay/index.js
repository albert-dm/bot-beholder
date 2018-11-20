import React from 'react'
import './LoadingOverlay.scss'
import Icon from '../../static/img/logo.png';

const LoadingOverlay = () => {
    return (
        <div className='LoadingOverlay'>
            <div>
                <img src={Icon} width="80px" height="80px" alt="Carregando..." />
            </div>
        </div>
    )
}

export default LoadingOverlay