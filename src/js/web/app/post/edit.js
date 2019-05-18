import {EditPage} from './page/EditPage';
import {DiffView} from './view/DiffView';
import {asMonaco} from 'monaco/asMonaco';
//import {CommitForm} from './form/CommitForm';
import {browser_router, web_client, ctrl_panel_init, ctrl_panel, web_cache, setting} from 'global';

const editPage = new EditPage();
//const commitForm = new CommitForm();
//const commitPop = ctrl_panel().createPop(commitForm);


const cmd = setting().cmd;
const webClient = web_client();
webClient
    .receive(cmd.post.commit, (data) => {
        browser_router().navigate(
            'post.show',
            {cid: data.cid}
        );
    })
    .receive(cmd.post.fetchDraft, (data) => {
        editPage
            .setPid(data.pid)
            .setContent(data.content)
            .setPrev(data.prev);
    })
    .receive(cmd.post.saveDraft, (data) => {
        if (data.pid == editPage.getPid()) {
            editPage.saved();
        }
    })
    .receive(cmd.post.removeDraft, () =>  {
        listDraft();
    });

const triggerCommit = () => {
    webClient.send(cmd.post.commit, {
        //userId: web_cache().get('userId'),
        type: 'markdown',
        content: editPage.getContent(),
        pid: editPage.getPid(),
        prev: editPage.getPrev()
    });
};

const triggerPrev = () => {
    const prev = editPage.getPrev();

    if (prev) {
        browser_router().navigate(
            'post.show',
            {cid: editPage.getPrev()}
        );
    }
};

/*
commitForm.onSubmit(async () => {
});
*/

const listDraft = () => {
    browser_router().navigate(
        'post.listDraft'
    );
};

const saveDraft = () => {
    webClient.send(cmd.post.saveDraft, {
        userId: web_cache().get('userId'),
        content: editPage.getContent(),
        pid: editPage.getPid(),
        prev: editPage.getPrev()
    });
};

const removeDraft = () => {
    webClient.send(cmd.post.removeDraft, {
        pid: editPage.getPid(),
    });
};

export default async (route) => {
    ctrl_panel_init()
        .register(cmd.post.listDraft, () => listDraft())
        .register(cmd.post.saveDraft, () => saveDraft())
        .register(cmd.post.removeDraft, () => removeDraft())
        .register(cmd.post.diff, () => triggerDiff())
        .register(cmd.post.prev, () => triggerPrev())
        .register(cmd.post.commit, () => triggerCommit());

    const pid = route.params.pid;
    editPage
        .setPid(pid)
        .setContent('');

    webClient.send(cmd.post.fetchDraft, {pid});

    return editPage;
};


//
// diffview
//

const triggerDiff = async () => {
    const diffView = await asGetDiffView();
    const diffPop = await asGetDiffPop();
    diffPop.show();
    diffView.showDiff();
};

let _diffView;
const asGetDiffView = async () => {
    if (!_diffView) {
        const codeModel = await editPage.asGetCodeModel();
        const monaco = await asMonaco();
        _diffView = new DiffView(monaco, codeModel);
    }
    return _diffView;
};

let _diffPop;
const asGetDiffPop = async () => {
    if (!_diffPop) {
        const diffView = await asGetDiffView();
        _diffPop = ctrl_panel().createPop(diffView, {type: 'broad'});
    }
    return _diffPop;
};

(async () => {
    const diffView = await asGetDiffView();

    diffView.onChange(async key => {
        if (key === 'remote-draft') {
            diffView.diff(editPage.getPrevContent());
        } else if (key === 'released-article') {
            //diffView.diff(await asGetReleasedContent());
        }
    });
})();

/*
 * const codeModel = await editor.asGetCodeModel();
    const monaco = await asMonaco();
    const diffView = new DiffView(monaco, codeModel);
    const diffPop = ctrlPanel.createPop(diffView, {type: 'broad'});
    ctrlPanel.register(
        cmd.diff,
        () => {
            diffPop.show();
            diffView.showDiff();
            //diffView.diff(localOri);
        }
    );
    diffView.onChange(async key => {
        if (key === 'remote-draft') {
            diffView.diff(localOri);
        } else if (key === 'released-article') {
            diffView.diff(await asGetReleasedContent());
        }
    });<Paste>
 */
