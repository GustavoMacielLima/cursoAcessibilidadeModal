import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ModalService } from './shared/components/modal/services/modal.service';
import { ModalRef } from './shared/components/modal/models/modal-ref.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent, ReactiveFormsModule, CommonModule],
  providers: [ModalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'cursoAcessibilidadeModal';

  @ViewChild('modalForm') public modalTemplateRef!: TemplateRef<any>;

  public firstName: string = 'Gustavo';

  public modalRef!: ModalRef;

  public form: FormGroup = new FormGroup(null);

  constructor(private modalService: ModalService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['Gustavo', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  public show(): void{
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User details'
    });
  }

  public submit(): void{
    if(this.form.invalid) return;
    console.log(this.form.value);
    this.modalRef.close();
  }
}
