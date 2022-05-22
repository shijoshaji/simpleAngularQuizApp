import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input()
  isCorrect: Boolean = false;

  constructor(private eleRef: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() {
    if (this.isCorrect) {
      // green
      this.render.setStyle(this.eleRef.nativeElement, 'background', 'green');
      this.render.setStyle(this.eleRef.nativeElement, 'color', 'white');
      this.render.setStyle(this.eleRef.nativeElement, 'border', '2px solid grey');
    } else {
      // red
      this.render.setStyle(this.eleRef.nativeElement, 'background', 'red');
      this.render.setStyle(this.eleRef.nativeElement, 'color', 'white');
      this.render.setStyle(this.eleRef.nativeElement, 'border', '2px solid grey');
    }
  }
}
