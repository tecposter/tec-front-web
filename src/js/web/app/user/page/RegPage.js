import {View} from 'gap/View';

export class RegPage extends View {
    template() {
        return this.html`
        <div class="ctn">
        <div class="background-tint">
        <form action="javascript:;" on-submit=${() => this.submit()} method="post">
            <label>
                <select ref=${select => this.select = select} name="select" bind-value="selected">
                    <option value="1">hello</option>
                    <option value="2">world</option>
                </select>

                <input ref=${input => this.input = input} type="text" bind-value="filled"> 

            </label>
            <div>
                <button class="btn primary-tint">update</button>
            </div>
        </form>

        <div class="display">
            You selected <strong watch="selected">${(val) => this.getSelectText(val)}</strong><br>
            You filled <strong>$${'filled'}</strong>
        </div>

        </div>
        </div>
        `;
    }

    getSelectText(val) {
        return this.select.oneElem(`option[value="${val}"]`).innerHTML;
    }

    submit() {
        this.update({
            selected: this.select.value,
            filled: this.input.value
        });
    }
}
