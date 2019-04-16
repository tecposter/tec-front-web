import {View} from 'gap/View';
import {Editor} from 'markdown/Editor';

export class CommitPage extends View {
    template() {
        return this.html`
        <div class="save-commit">
            ${this.getEditor().getCtnElem()}
        </div>
        `;
    }

    startup() {
    }

    getContent() {
        return this.getEditor().getContent();
    }

    setContent(content) {
        this.getEditor().setContent(content);
        return this;
    }

    getArticleId() {
        return this.data.articleId;
    }

    setArticleId(articleId) {
        this.data.articleId = articleId;
        return this;
    }

    getCommitId() {
        return this.data.commitId;
    }

    setCommitId(commitId) {
        this.data.commitId = commitId;
        return this;
    }

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
