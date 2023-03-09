import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRefreshTable]'
})
export class RefreshTableDirective {

  @Input() appRefreshTable!: number;

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    this.viewContainerRef.createEmbeddedView(templateRef);
  }

  ngOnChanges(changes: SimpleChanges):void {
    if (changes['appRefreshTable'] && changes['appRefreshTable'].previousValue != undefined) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
