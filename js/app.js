/* -------------------- APP INIT -------------------- */

(function initApp() {
    const saveBtnTop = document.getElementById("saveBtnTop");
    const saveAllBtnTop = document.getElementById("saveAllBtnTop");
    const resetBtnTop = document.getElementById("resetBtnTop");
    const note = document.getElementById("note");

    Storage.loadState();

    const saveFile = () => {
        if (!AppState.currentTab) return;
        AppState.files[AppState.currentTab] = note.value;
        const filename = `${AppState.currentTab}--${Storage.formattedDateTime()}.txt`;
        Storage.exportTxt(filename, AppState.files[AppState.currentTab]);
    };

    const saveAllTabs = () => {
        if (AppState.currentTab !== null) {
            AppState.files[AppState.currentTab] = note.value;
        }

        for (const name of AppState.tabOrder) {
            const content = AppState.files[name] || "";
            if (content.trim().length === 0) continue;
            const filename = `${name}--${Storage.formattedDateTime()}.txt`;
            Storage.exportTxt(filename, content);
        }
    };

    saveBtnTop.addEventListener("click", saveFile);
    saveAllBtnTop.addEventListener("click", saveAllTabs);
    resetBtnTop.addEventListener("click", Tabs.resetAllTabs);

    UI.init();
    Theme.init();
    Editor.init();
    Tabs.init();

    AppState.isRestoring = false;
})();