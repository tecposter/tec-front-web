import {View} from 'gap/View';
import {browser_router} from 'global';

const Event = {
    submit: 'submit'
};

export class LoginPage extends View {
    template() {
        return this.html`
        <div class="ctn">
        <div class="background-tint">
        <h1>:login</h1>
        <form action="javascript:;" on-submit=${() => this.triggerSubmit()} method="post">
            <label>
                <input
                    ref=${input => this.userIdInput = input}
                    type="text" name="userId" value="" placeholder="userId">
            </label>
            <div>
                <button class="btn primary-tint">login</button>
                <a href="javascript:;" on-click=${() => this.gotoReg()}>:reg</a> 
            </div>
        </form>
        </div>
        </div>
        `;
    }

    onSubmit(fun) {
        this.on(Event.submit, fun);
    }

    triggerSubmit() {
        this.trigger(Event.submit, this.userIdInput.value.trim());
    }

    gotoReg() {
        browser_router().navigate('user.reg');
    }
}
