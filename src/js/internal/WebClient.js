import {GapEvent} from 'gap/GapEvent';

export class WebClient {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.event = new GapEvent();

        this.socket = this.createWebSocket(this.apiUrl);
    }

    createWebSocket() {
        const socket = new WebSocket(this.apiUrl);
        socket.onmessage = (evt) => {
            this.handleMessage(evt);
        };
        return socket;
    }

    handleMessage(evt) {
        const res = JSON.parse(evt.data);
        this.event.trigger(res.cmd, res.data);
    }

    close() {
        this.socket.close();
    }

    receive(cmd, fun) {
        if (!cmd.name) {
            throw new Error('cmd format error');
        }
        this.event.on(cmd.name, fun);
        return this;
    }

    send(cmd, data) {
        if (!cmd.name) {
            throw new Error('cmd format error');
        }

        const json = JSON.stringify({cmd: cmd.name, data});
        if (this.socket.readyState === WebSocket.CLOSING || this.socket.readyState === WebSocket.CLOSED) {
            this.socket = this.createWebSocket();
        }

        if (this.socket.readyState === WebSocket.CONNECTING) {
            this.socket.onopen = () => {
                this.socket.send(json);
            };
        } else if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(json);
        }
    }
}
