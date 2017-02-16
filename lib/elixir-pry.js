'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'elixir-pry:add_pry': () => this.add_pry(),
      'elixir-pry:remove_pry': () => this.remove_pry()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  add_pry() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      currentPosition = editor.getCursorBufferPosition().toArray()
      line_1 = "require IEx\n"
      line_2 = " ".repeat(currentPosition[1]) + "IEx.pry"
      editor.insertText(line_1 + line_2)
    }
  },

  remove_pry() {
    console.log("remove")
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      all_text = editor.getText().split('\n')
      new_text = []
      for (var i = 0, len = all_text.length; i < len; i++) {
        line = all_text[i]
        if (!(line.includes("require IEx") || line.includes("IEx.pry"))) {
          new_text = new_text.concat(line)
        }
      }

      editor.setText(new_text.join('\n'))
    }
  }
};
