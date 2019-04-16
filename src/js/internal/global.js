import {deepMerge} from 'obj/deepMerge';
import {WebCore} from './WebCore';
import {WebClient} from './WebClient';
import {CtrlPanel} from './CtrlPanel';
import {BrowserRouter} from './BrowserRouter';
import {SessionStorage} from 'storage/SessionStorage';

const _browserRouter = new BrowserRouter();
let _ctrlPanel;
let _web_client;
let _web_core;
//const _core = new WebCore();


const _setting = {};
export const setting = () => {
    return _setting;
};

export const bootstrap = (...args) => {
    Object.assign(_setting, deepMerge(...args));
    //_core.init(_setting);
};

export const web_core = () => {
    if (_web_core) {
        return _web_core;
    }
    _web_core = new WebCore();
    return _web_core;
};

export const web_client = () => {
    if (_web_client) {
        return _web_client;
    }
    _web_client = new WebClient(setting().apiUrl, web_cache());
    return _web_client;
};

export const ctrl_panel = () => {
    if (!_ctrlPanel) {
        _ctrlPanel = new CtrlPanel();
    }

    return _ctrlPanel;
};

export const ctrl_panel_init = () => {
    const cmd = setting().cmd;
    const panel = ctrl_panel()
        .clear()
        .register(cmd.home, () => browser_router().navigate('home'))
        .register(cmd.esc, () => _ctrlPanel.hide())
        .register(cmd.cmd, () => _ctrlPanel.showCmdPop());

    if (is_logined()) {
        panel.register(cmd.user.logout, () => browser_router().navigate('user.logout'));
    } else {
        panel.register(cmd.user.login, () => browser_router().navigate('user.login'));
    }

    return panel;
};

export const browser_router = () => {
    return _browserRouter;
};

let _web_cache;
export const web_cache = () => {
    if (_web_cache) {
        return _web_cache;
    }

    _web_cache = new SessionStorage();
    return _web_cache;
};

export const is_logined = () => {
    if (web_cache().get('userId')) {
        return true;
    } else {
        return false;
    }
};
