import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const ScanQrPlacement = ({ onScanSuccess, onScanFailure }) => {
    const qrCodeRegionId = 'html5qr-code-full-region';

    useEffect(() => {
        const html5QrCode = new Html5Qrcode(qrCodeRegionId);
        const createConfig = {
            fps: 10,
            qrbox: 250,
        };

        html5QrCode.start({ facingMode: 'environment' }, createConfig, onScanSuccess, onScanFailure).catch((err) => {
            console.error('Failed to start scanning:', err);
        });

        return () => {
            if (html5QrCode) {
                html5QrCode
                    .stop()
                    .then(() => {
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
