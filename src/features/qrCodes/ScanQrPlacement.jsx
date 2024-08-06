import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNotification } from '../../utils/NotificationContext';

const ScanQrPlacement = ({ onScanSuccess, onScanFailure }) => {
    const { openNotification } = useNotification();
    const qrCodeRegionId = 'html5qr-code-full-region';

    useEffect(() => {
        const html5QrCode = new Html5Qrcode(qrCodeRegionId);
        const createConfig = {
            fps: 10,
            qrbox: 250,
        };

        html5QrCode?.start({ facingMode: 'environment' }, createConfig, onScanSuccess, onScanFailure).catch((err) => {
            console.error('Failed to start scanning:', err);
            if (err.name === 'NotAllowedError') {
                openNotification(
                    'info',
                    'Camera access is not allowed. Please enable camera permissions in your browser settings to the website.'
                );
            } else if (err.name === 'NotFoundError') {
                openNotification('info', 'No camera device found. Please ensure your device has a camera.');
            } else {
                openNotification(
                    'info',
                    'Camera access is not allowed. Please enable camera permissions in your browser settings to the website.'
                );
            }
        });

        return () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode
                    ?.stop()
                    ?.then(() => {
                        html5QrCode?.clear();
                    })
                    .catch((err) => {
                        console.error('Failed to stop scanning:', err);
                    });
            }
        };
    }, [onScanSuccess, onScanFailure]);

    return <div id={qrCodeRegionId} />;
};

export default ScanQrPlacement;
