import {View} from 'gap/View';
import {Parser} from 'markdown/Parser';
import {oneElem} from 'gap/web';

export class ShowPage extends View {
    template() {
        return this.html`
        <div class="home ctn">
            <div watch="content" class="post-detail">${() => this.getContent()}</div>
        </div>
        `;
    }

    getContent() {
        setTimeout(() => this.renderMarkdown(), 1);
        return this.data.content;
    }

    renderMarkdown() {
        this.getParser().asRenderElem(oneElem('.post-detail'));
    }

    getPid() {
        return this.data.pid;
    }

    getCid() {
        return this.data.cid;
    }

    getParser() {
        if (!this._parser) {
            this._parser = new Parser();
        }
        return this._parser;
    }
}
