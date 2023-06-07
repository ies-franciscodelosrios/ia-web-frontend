import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appTextareaAutosize]"
})
export class TextareaAutosizeDirective {
  @Input() minRows = 2;
  @Input() maxRows = 4;

  private offsetHeight = 0;
  private readonly avgLineHeight = 20;

  @HostListener("input")
  onInput(): void {
    const element: HTMLTextAreaElement = this.element.nativeElement;
    if (this.offsetHeight <= 0) {
      this.offsetHeight = element.scrollHeight;
    }
    element.rows = this.minRows;
    const rows = Math.floor(
      (element.scrollHeight - this.offsetHeight) / this.avgLineHeight
    );
    const rowsCount = this.minRows + rows;
    element.rows = rowsCount > this.maxRows ? this.maxRows : rowsCount;
  }

  constructor(private element: ElementRef) {}
}
