import StatusManager from '../../status/StatusManager.js';
import WsClientConnection from './WsClientConnection';
import MockServiceBase from '../MockServiceBase.js';
export default class Mocker extends MockServiceBase {
    /**
     * @constructor
     * @param {MdbMock} mock 
     */
    constructor(mock) {
        super(mock);
        /**
         * instance of serialport
         * @property {server}
         */
        this.server = null;
        /**
         * instance of http server
         * @property {Object}
         */
        this.httpsServer = null;
        /**
         * list of clients
         * @property {Object}
         */
        this.clients = {};
        /**
         * runtime status
         * @property {StatusManager}
         */
        this.status = new StatusManager();
        this.status.updateStatusList(this.options.status);
    }

    /**
     * start mock serviec
     * @returns {Promise<void>}
     */
    async start() {
        debugger
        let options = {};
        options.path = '/' + this.options.path;
        if ( 'wss' === this.options.protocol ) {
            options.server = await this.setupHttpsServer();
        } else {
            options.host = this.options.host;
            options.port = this.options.port;
        }
        this.server = new window.ws.WebSocketServer(options);
        this.server.on('connection', ws => this.wsServerHandleConnection(ws));
        this.serviceOnline();
    }

    /**
     * stop mock service
     * @returns {Promise<void>}
     */
    stop() {
        let $this = this;
        return new Promise(( resolve, reject ) => {
            for ( let key in this.clients ) {
                $this.clients[key].close();
            }
            $this.server.close(() => {
                if ( null !== $this.httpsServer ) {
                    $this.httpsServer.close();
                    $this.httpsServer = null;
                }
                $this.serviceOffline();
                resolve();
            });
        });
    }

    /**
     * event handler on new client connected.
     * @param {*} socket 
     */
    wsServerHandleConnection(socket) {
        let client = new WsClientConnection(this, socket);
        this.clients[client.key] = client;
        this.eventManager.trigger('new-client', client);
    }

    /**
     * setup https server
     * @returns <Promise>
     */
    setupHttpsServer() {
        let $this = this;
        return new Promise(( resolve ) => {
            let credentials = {};
            credentials.key = $this.options.sslKey;
            credentials.cert = $this.options.sslCert;
            $this.httpsServer = window.https.createServer(credentials);
            $this.httpsServer.listen({port:$this.options.port}, () => {
                resolve($this.httpsServer);
            });
        });
    }
}