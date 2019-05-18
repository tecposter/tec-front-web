import {View} from 'gap/View';

const Event = {
    edit: 'edit'
};

export class ListDraftPage extends View {
    template() {
        return this.html`
        <div class="home ctn">
            <div
                class="list article-list"
                arr="list"
                item-as="draft"
                item-key=${draft => draft.pid}
            >
                ${(key) => this.html`
                    <div class="item">
                        <div class="article-title">
                            <a
                                on-click=${() => this.gotoEdit(this.data.list.get(key))}
                                watch="draft.content"
                                href="javascript:;">
                                ${() => this.extractTitle(this.data.list.get(key))}           
                            </a>
                        </div>
                    </div>
                `}
            </div>
        </div>
        `;
    }

    onEdit(fun) {
        this.on(Event.edit, fun);
    }

    gotoEdit(draft) {
        this.trigger(Event.edit, draft.pid);
    }

    extractTitle(draft) {
        return draft.content.substr(0, 100);
    }
}
