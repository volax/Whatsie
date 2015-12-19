import clipboard from 'clipboard';
import MenuItem from 'menu-item';
import Menu from 'menu';

function create(opt, browserWindow) {
  const webContents = browserWindow.webContents;
  const menu = new Menu();

  // TODO spellings

  if (opt.hasSelection) {
    // TODO: doesn't work, selection is inside webview
    // if (process.platform == 'darwin') {
    //   menu.append(new MenuItem({
    //     label: 'Look Up',
    //     click: () => browserWindow.showDefinitionForSelection()
    //   }));
    //
    //   menu.append(new MenuItem({
    //     type: 'separator'
    //   }));
    // }

    menu.append(new MenuItem({
      label: 'Cut',
      enabled: opt.targetIsEditable,
      click: () => webContents.send('call-webview-method', 'cut')
    }));

    menu.append(new MenuItem({
      label: 'Copy',
      click: () => webContents.send('call-webview-method', 'copy')
    }));

    menu.append(new MenuItem({
      type: 'separator'
    }));
  }

  if (opt.targetIsEditable) {
    menu.append(new MenuItem({
      label: 'Paste',
      click: () => webContents.send('call-webview-method', 'paste')
    }));

    menu.append(new MenuItem({
      label: 'Paste and Match Style',
      click: () => webContents.send('call-webview-method', 'pasteAndMatchStyle')
    }));

    menu.append(new MenuItem({
      label: 'Select All',
      click: () => webContents.send('call-webview-method', 'selectAll')
    }));

    menu.append(new MenuItem({
      type: 'separator'
    }));
  }

  if (opt.isTargetLink) {
    menu.append(new MenuItem({
      label: 'Copy Link Address',
      click: () => clipboard.writeText(opt.href)
    }));

    menu.append(new MenuItem({
      label: 'Copy Link Text',
      click: () => webContents.send('call-webview-method', 'copy')
    }));

    menu.append(new MenuItem({
      type: 'separator'
    }));
  }

  if (menu.items.length) {
    return menu;
  }
}

export default {
  create
};
