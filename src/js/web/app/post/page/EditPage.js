import {View} from 'gap/View';
import {Editor} from 'markdown/Editor';

export class EditPage extends View {
    template() {
        return this.html`
        <div class="post-edit">
            ${this.getEditor().getCtnElem()}
        </div>
        `;
    }

    startup() {
    }

    async asGetCodeModel() {
        return await this.getEditor().asGetCodeModel();
    }

    getContent() {
        return this.getEditor().getContent();
    }

    saved() {
        const editor = this.getEditor();
        editor.saved();
        document.title = editor.getTitle();
    }

    setContent(content) {
        this._prevContent = content;
        const editor = this.getEditor();
        editor.setContent(content);
        // todo
        //setTimeout(() => editor.saved(), 100);
        //document.title = editor.getTitle();

        return this;
    }

    getPrevContent() {
        return this._prevContent;
    }

    getPid() {
        return this.data.pid;
    }

    setPid(pid) {
        this.data.pid = pid;
        return this;
    }

    getPrev() {
        return this.data.prev;
    }

    setPrev(prev) {
        this.data.prev = prev;
        return this;
    }

    /*
    getCid() {
        return this.data.cid;
    }

    setCid(cid) {
        this.data.cid = cid;
        return this;
    }
    */

    getEditor() {
        if (this._editor) {
            return this._editor;
        }
        this._editor = this.createEditor();
        return this._editor;
    }

    createEditor(content) {
        const editor = new Editor(content);

        window.on('beforeunload', evt => {
            if (!editor.isChanged()) {
                return;
            }

            evt.stop();
            evt.cancel();
            (evt || window.event).returnValue = null;
            return null;
        });

        editor.onChange(() => {
            document.title = '* ' + editor.getTitle();
        });

        return editor;
    }
}
