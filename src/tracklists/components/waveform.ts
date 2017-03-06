import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { ApiService } from 'src/core';
import './waveform.scss';

@Component({
  selector: 'waveform',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:''
})
export class WaveformComponent implements OnInit {
  @Input() color: string = '#1d1e1f';
  @Input() src: string;
  @Output() ready: EventEmitter<any> = new EventEmitter<any>(false);

  constructor(public api: ApiService, public el: ElementRef) {}

  ngOnInit(): void {
    this.api.fetch(this.src)
      .subscribe(data => this.render(data))
  }

  render(data: { height: number, width: number, samples: number[] }): void {
    let canvas = document.createElement('canvas');
    canvas.height = data.height / 2; // 70px
    canvas.width = data.width / 2;   // 900px

    let context = canvas.getContext('2d');
    context.fillStyle = this.color;

    let samples = data.samples,
      l = samples.length,
      i = 0,
      x = 0,
      v: any;

    for (; i < l; i+=2, x++) {
      v = samples[i] / 4;
      context.fillRect(x, 0, 1, 35 - v);
      context.fillRect(x, 35 + v, 1, 70);
    }

    this.el.nativeElement.appendChild(canvas);
    this.ready.emit(true);
  }
}