import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'create-purchase-order-dialog',
  templateUrl: './createPurchaseOrderDialog.component.html',
})
export class CreatePurchaseOrderDialog {
  constructor(
    public dialogRef: MatDialogRef<CreatePurchaseOrderDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
