interface Vue {
    $snackbar: snackbar;
}

interface snackbar{
    Show(text: string, type?: 'message' | 'error', option?: { callback: Function, text: string }): void;
}
