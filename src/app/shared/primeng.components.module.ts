import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule as CardModulePrimeNg } from 'primeng/card';
import { TableModule } from 'primeng/table';
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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule as ToastModuloPrime } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MenubarModule } from 'primeng/menubar';



@NgModule({
  exports: [
    CommonModule,
    TabViewModule,
    TableModule,
    ToastModuloPrime,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    PickListModule,
    DropdownModule,
    FormsModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    CheckboxModule,
    DynamicDialogModule,
    CardModulePrimeNg,
    MenubarModule,
    SelectButtonModule
  ],
})
export class PrimengComponentsModule { }
