import { TonConnectUI } from '@tonconnect/ui';

export const ton = new TonConnectUI({
    manifestUrl: 'https://apiclicker.akzystudio.com/manifest',
    actionsConfiguration:{
        modals : ['before', 'success', 'error'],
        notifications: ['before', 'success', 'error']
    }
});
