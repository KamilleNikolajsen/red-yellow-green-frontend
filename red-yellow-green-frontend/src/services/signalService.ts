import * as signalR from '@microsoft/signalr';

const HUB_URL = 'http://localhost:5000/hubs/states';

class SignalService {

    private connection: signalR.HubConnection | null = null;

    async start(onStageChanged: (data: any)=> void): Promise<void> {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(HUB_URL, { withCredentials: true })
            .withAutomaticReconnect()
            .build();

        this.connection.on('EquipmentStateChanged', onStageChanged);

        try{
            await this.connection.start();
            console.log('SignalR Connected.');
        }
        catch(e){
            console.error('SignalR Connection Error: ', e);
            setTimeout(() => this.start(onStageChanged), 5000);
        }
    }

    async stop(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            console.log('SignalR Disconnected');
        }
    }
}

export const signalService = new SignalService();