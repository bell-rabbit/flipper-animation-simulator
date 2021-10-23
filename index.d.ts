interface Vue {
    $snackbar: snackbar;
}

interface snackbar{
    show(text: string, type?: 'message' | 'error', option?: { callback: Function, text: string }): void;
}
