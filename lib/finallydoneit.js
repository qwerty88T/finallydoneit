'use babel';

import FinallydoneitView from './finallydoneit-view';
import { CompositeDisposable } from 'atom';

export default {

  finallydoneitView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.finallydoneitView = new FinallydoneitView(state.finallydoneitViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.finallydoneitView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'finallydoneit:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.finallydoneitView.destroy();
  },

  serialize() {
    return {
      finallydoneitViewState: this.finallydoneitView.serialize()
    };
  },

  toggle() {
    console.log('Finallydoneit was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
