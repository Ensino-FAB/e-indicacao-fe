import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

@NgModule({
  exports: [
    CommonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    PickListModule,
    DropdownModule,
    FormsModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    CheckboxModule,
    DynamicDialogModule,
  ],
})
export class PrimengComponentsModule { }
