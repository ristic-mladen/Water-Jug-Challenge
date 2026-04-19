export class ToastrService {
  private root: HTMLElement | null = null;

  public error(message: string): void {
    this.show(message, 'alert-error');
  }

  public warning(message: string): void {
    this.show(message, 'alert-warning');
  }

  public success(message: string): void {
    this.show(message, 'alert-success');
  }

  public info(message: string): void {
    this.show(message, 'alert-info');
  }

  private ensureRoot(): HTMLElement {
    if (!this.root) {
      this.root = document.createElement('div');
      this.root.className = 'toast toast-top toast-end z-[9999] flex flex-col gap-2';
      document.body.appendChild(this.root);
    }
    return this.root;
  }
  
  private dismiss(el: HTMLElement): void {
    el.remove();
    
    if (this.root && this.root.childElementCount === 0) {
      this.root.remove();
      this.root = null;
    }
  }
  
  private show(message: string, alertClass: string): void {
    const root = this.ensureRoot();
    const el = document.createElement('div');
    
    el.className = `alert ${alertClass} max-w-sm shadow-lg cursor-pointer`;
    el.textContent = message;
  
    el.onclick = () => this.dismiss(el);
  
    root.appendChild(el);
  
    window.setTimeout(() => {
      if (el.parentElement) {
        this.dismiss(el);
      }
    }, 6000);
  }
}
