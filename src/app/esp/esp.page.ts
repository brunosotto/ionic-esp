import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-esp',
  templateUrl: 'esp.page.html',
  styleUrls: ['esp.page.scss']
})
export class EspPage implements OnInit, OnDestroy {

  public form: FormGroup;
  private destroy = new Subject();
  private url = 'https://node.sotto.com.br/esp';
  private objeto: any;
  private old: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.initform();
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initform(): void {
    this.form = this.fb.group({
      cinco: null,
      seis: null,
      sete: null,
      oito: null,
    });

    this.listenForm();
  }

  private listenForm(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(change => {
        if (!this.old || (change.cinco !== this.old.cinco)) {
          this.send(5, change.cinco);
          return;
        }
        if (!this.old || (change.seis !== this.old.seis)) {
          this.send(6, change.seis);
          return;
        }
        if (!this.old || (change.sete !== this.old.sete)) {
          this.send(7, change.sete);
          return;
        }
        if (!this.old || (change.oito !== this.old.oito)) {
          this.send(8, change.oito);
          return;
        }
      });
  }

  private send(porta: number, st: boolean): void {
    this.http.post(this.url, {
      porta,
      status: st ? 1 : 0,
    })
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(resp => {
        this.refresh();
      });
  }

  public onSubmit(): void {
  }

  public refresh(): void {
    this.http.get(this.url)
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(resp => {
        this.objeto = resp;
        this.form.get('cinco').setValue(this.getStatus(5) === 1, { emitEvent: false });
        this.form.get('seis').setValue(this.getStatus(6) === 1, { emitEvent: false });
        this.form.get('sete').setValue(this.getStatus(7) === 1, { emitEvent: false });
        this.form.get('oito').setValue(this.getStatus(8) === 1, { emitEvent: false });
        this.old = this.form.value;
      });

  }

  private getPorta(porta: number): any {
    const re = this.objeto.find(r => r.porta === porta);
    return re;
  }

  private getStatus(porta: number): number {
    const re = this.getPorta(porta);
    return re.status;
  }

}
