import { Component, HostBinding, TemplateRef } from '@angular/core';
import { ModalService } from './services/modal.service';
import { ModalConfig } from './interfaces/modal-config.interface';
import { CommonModule } from '@angular/common';
import { fade } from '../../animations/fade.animation';
import { ModalRef } from './models/modal-ref.model';
import { FocusTrapDiractive } from '../../directives/focus-trap/focus-trap.directive';
import { FocusBackDirective } from '../../directives/focus-back/focus-back.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FocusTrapDiractive, FocusBackDirective],
  providers: [ModalService],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [fade]
})
export class ModalComponent {
  @HostBinding('@fade') public fade: boolean = true;
  public config!: ModalConfig;
  public modalRef!: ModalRef;
}
