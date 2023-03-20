import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import BEMHelper from 'react-bem-helper';
import './FlashMessages.style.scss';

const bem = new BEMHelper('flash-message');

export default function FlashMessages() {
    const { flash, flash: { error, info, success } } = usePage().props;
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
        }

        if (info) {
            setInfoMessage(info);
        }

        if (success) {
            setSuccessMessage(success);
        }

        setTimeout(() => {
            setErrorMessage('');
            setInfoMessage('');
            setSuccessMessage('');
        }, 5000);
    }, [flash])

    return (
        <div { ...bem('', [ !!errorMessage && 'error', !!infoMessage && 'info', !!successMessage && 'success' ]) }>
            { errorMessage && <span { ...bem('error') }>{ errorMessage }</span> }
            { infoMessage && <span { ...bem('info') }>{ infoMessage }</span> }
            { successMessage && <span { ...bem('success') }>{ successMessage }</span> }
        </div>
    );
}
