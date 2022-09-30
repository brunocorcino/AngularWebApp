import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'footer-buttons',
  templateUrl: './footer-buttons.component.html',
  styleUrls: ['./footer-buttons.component.scss']
})
export class FooterButtonsComponent implements OnInit {
  @Input() esconderBotaoExcluir = false;
  @Input() esconderBotaoCancelar = false;
  @Input() esconderBotaoSalvar = false;
  @Input() esconderBotaoSalvarFechar = false;

  @Output() cancelar = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();
  @Output() salvar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  btnCancelarClick() {
    this.cancelar.emit();
  }

  btnExcluirClick() {
    this.excluir.emit();
  }

  btnSalvarClick() {
    this.salvar.emit();
  }
}
