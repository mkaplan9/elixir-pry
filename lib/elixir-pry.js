'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'elixir-pry:add_pry': () => this.add_pry()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  add_pry() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      currentPosition = editor.getCursorBufferPosition().toArray()
      editor.insertText("IEx.pry")
      editor.setCursorBufferPosition([1,0])
      editor.insertText("  require IEx\n")
      editor.setCursorBufferPosition([currentPosition[0] + 2, currentPosition[1]], false)
    }
  }
};
