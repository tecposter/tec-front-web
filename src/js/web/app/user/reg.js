import {ctrl_panel_init} from 'global';
import {RegPage} from './page/RegPage';

const regPage = new RegPage();

export default async () => {
    ctrl_panel_init();

    return regPage;
};
