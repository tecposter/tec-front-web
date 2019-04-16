import {View} from 'gap/View';

export class HomePage extends View {
    template() {
        return this.html`
        <div class="home ctn">
            landing home
            <a href="javascript:;" on-click=${() => this.click()}>click</a>
        </div>
        `;
    }

    click() {
        console.log('click');
    }
}
