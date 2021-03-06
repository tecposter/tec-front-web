import {View} from 'gap/View';

const Event = {
    postShow: 'postShow'
};

export class HomePage extends View {
    template() {
        return this.html`
        <div class="home ctn">
            <div
                class="list article-list"
                arr="list"
                item-as="post"
                item-key=${post => post.pid}
            >
                ${(key) => this.html`
                    <div class="item">
                        <div class="article-title">
                            <a
                                on-click=${() => this.postShow(this.data.list.get(key))}
                                watch="post.content"
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

    onPostShow(fun) {
        this.on(Event.postShow, fun);
    }

    postShow(post) {
        this.trigger(Event.postShow, post.cid);
    }

    extractTitle(post) {
        return post.title || post.content.substr(0, 100);
        //return post.content.substr(0, 100);
    }
}
