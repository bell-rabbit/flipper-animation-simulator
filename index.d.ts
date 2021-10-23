interface snackbar{
    show(text: string, type?: "message" | "error", option?: { callback: Function, text: string }): void;
}

interface Vue {
    $snackbar: snackbar;
    updateMeta(): void;
}
