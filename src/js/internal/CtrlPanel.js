import {Mask} from 'gap/Mask';

import {CmdManager} from 'CmdManager';

import {Pop} from './component/Pop';
import {CmdView} from './component/CmdView';
import {TecBtn} from './component/TecBtn';

export class CtrlPanel {
    constructor() {
        this._mask = new Mask();

        this._cmdManager = this._createCmdManager();
        this._cmdView = this._createCmdView(this._cmdManager);
        this._cmdPop = this.createPop(this._cmdView);

        this._tecBtn = this._createTecBtn(this._cmdPop);
    }

    //
    // Api
    //
    appendTo(ctn) {
        this._tecBtn.appendTo(ctn);
    }

    createPop(view, opts) {
        const pop = new Pop(this._mask, opts);
        pop.appendView(view);
        return pop;
    }

    showCmdPop() {
        this._cmdPop.show();
    }

    register(cmd, fun) {
        this._cmdManager.register(assign(cmd, (...args) => {
            this.hide();
            fun(...args);
        }));
        return this;
    }

    hide() {
        this._mask.hideMask();
    }

    clear() {
        this._cmdManager.clear();
        return this;
    }


    //
    // Private methods
    //
    _createCmdManager() {
        const cmdManager = new CmdManager();
        return cmdManager;
    }

    _createCmdView(cmdManager) {
        return new CmdView({cmdManager});
    }

    _createCmdPop(mask, cmdManager) {
        const cmdView = new CmdView({cmdManager});
        const pop = new Pop(mask);
        pop.appendView(cmdView);
        return pop;
        //return new CmdPop({mask, cmdManager});
    }

    _createTecBtn(cmdPop) {
        const tecBtn = new TecBtn();
        tecBtn.onClick(() => {
            cmdPop.show();
        });
        return tecBtn;
    }
}

const assign = (obj, fun) => Object.assign(obj, {fun});
