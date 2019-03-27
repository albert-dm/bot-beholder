import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import config from '../config';

const server = `${config.pretUrl}/beholder`;

export const hubConnection = new HubConnectionBuilder()
    .withUrl(server)
    .configureLogging(LogLevel.Information)
    .build();